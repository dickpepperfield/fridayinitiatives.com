// Friday Initiatives - Main JavaScript

// HubSpot Integration
// Replace YOUR_PORTAL_ID and YOUR_FORM_ID with actual values
const HUBSPOT_CONFIG = {
  portalId: 'YOUR_PORTAL_ID',
  formId: 'YOUR_FORM_ID'
};

// Load HubSpot forms script
function loadHubSpotForms() {
  const script = document.createElement('script');
  script.src = 'https://js.hsforms.net/forms/shell.js';
  document.body.appendChild(script);
}

// Initialize HubSpot form
function initHubSpotForm(containerId) {
  if (window.hbspt) {
    window.hbspt.forms.create({
      region: 'na1',
      portalId: HUBSPOT_CONFIG.portalId,
      formId: HUBSPOT_CONFIG.formId,
      target: '#' + containerId,
      onFormReady: function() {
        console.log('HubSpot form loaded');
      }
    });
  }
}

// Email Gating Modal
class EmailGateModal {
  constructor() {
    this.modal = null;
    this.init();
  }

  init() {
    this.createModal();
    this.attachEventListeners();
  }

  createModal() {
    const modalHTML = `
      <div id="email-gate-modal" class="modal" style="display: none;">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Download Resource</h2>
          <p>Enter your email to download this resource</p>
          <form id="email-gate-form">
            <input type="email" placeholder="Your email address" required>
            <button type="submit" class="btn">Download</button>
          </form>
          <p class="muted" style="font-size: 12px; margin-top: 12px;">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('email-gate-modal');
  }

  attachEventListeners() {
    // Close button
    document.querySelector('.close').addEventListener('click', () => this.close());

    // Close on outside click
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Form submission
    document.getElementById('email-gate-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Attach to download buttons
    document.querySelectorAll('[data-email-gate]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(btn.getAttribute('data-resource-url'));
      });
    });
  }

  open(resourceUrl) {
    this.modal.style.display = 'block';
    this.modal.dataset.resourceUrl = resourceUrl;
  }

  close() {
    this.modal.style.display = 'none';
  }

  handleSubmit() {
    const email = document.querySelector('#email-gate-form input[type="email"]').value;
    const resourceUrl = this.modal.dataset.resourceUrl;

    // Send to HubSpot or your backend
    this.sendToHubSpot(email, resourceUrl);

    // Trigger download
    this.triggerDownload(resourceUrl);

    // Close modal
    this.close();
  }

  sendToHubSpot(email, resourceUrl) {
    // This will be configured with your HubSpot portal ID
    const data = {
      email: email,
      resource: resourceUrl,
      timestamp: new Date().toISOString()
    };

    // Send to your backend endpoint
    fetch('/api/email-gate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.log('Email gate submission:', err));
  }

  triggerDownload(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    a.click();
  }
}

// Portal Login Bridge
class PortalLoginBridge {
  constructor() {
    this.init();
  }

  init() {
    this.attachLoginButtons();
  }

  attachLoginButtons() {
    document.querySelectorAll('[data-portal-login]').forEach(btn => {
      btn.addEventListener('click', () => this.redirectToPortal());
    });
  }

  redirectToPortal() {
    // Replace with your actual portal URL
    const portalUrl = 'https://portal.fridayinitiatives.com/login';
    window.location.href = portalUrl;
  }
}

// Newsletter Signup
class NewsletterSignup {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-newsletter-signup]').forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Send to HubSpot
    this.sendToHubSpot(email);
    
    // Show confirmation
    alert('Thank you for subscribing!');
    e.target.reset();
  }

  sendToHubSpot(email) {
    const data = {
      email: email,
      source: 'newsletter_signup',
      timestamp: new Date().toISOString()
    };

    fetch('/api/newsletter-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.log('Newsletter signup:', err));
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Load HubSpot forms
  loadHubSpotForms();

  // Initialize email gating
  new EmailGateModal();

  // Initialize portal login
  new PortalLoginBridge();

  // Initialize newsletter signup
  new NewsletterSignup();

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Utility: Add email gate to resource links
function addEmailGate(linkSelector) {
  document.querySelectorAll(linkSelector).forEach(link => {
    link.setAttribute('data-email-gate', 'true');
    link.setAttribute('data-resource-url', link.href);
    link.href = '#';
  });
}

// Export for use in other scripts
window.FridayInitiatives = {
  EmailGateModal,
  PortalLoginBridge,
  NewsletterSignup,
  addEmailGate
};
