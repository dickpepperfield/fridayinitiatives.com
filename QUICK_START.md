# Quick Start Guide - Friday Initiatives Website

## **The 5-Minute Overview**

### **What You're Getting**
- ✅ Complete website matching your design
- ✅ All pages (Home, About, Services, News, Contact, etc.)
- ✅ HubSpot integration ready
- ✅ Email gating for resources
- ✅ Portal login bridge
- ✅ Mobile responsive design

### **What You Need to Do**

**1. Create Digital Ocean Account** (2 minutes)
- Go to digitalocean.com
- Sign up with email
- Add payment method

**2. Deploy Website** (5 minutes)
- In Digital Ocean, click "Apps" → "Create App"
- Upload the website files
- Click "Deploy"
- Wait for green checkmark

**3. Connect Domain** (5 minutes)
- Get your Digital Ocean app URL
- Go to your domain registrar
- Update CNAME record to point to Digital Ocean
- Wait 24-48 hours for DNS

**4. Integrate HubSpot** (10 minutes)
- Get your HubSpot Portal ID
- Create a form in HubSpot
- Get the Form ID
- Update `assets/js/main.js` with your IDs
- Deploy again

**5. Test Everything** (5 minutes)
- Visit www.fridayinitiatives.com
- Test contact form
- Test newsletter signup
- Test email gating

---

## **File Structure**

```
friday-website/
├── index.html                    ← Home page
├── pages/
│   ├── about.html               ← About Us page
│   ├── services.html            ← Services overview
│   ├── services-foundations.html ← Service subpage
│   ├── services-value.html      ← Service subpage
│   ├── services-operations.html ← Service subpage
│   ├── news.html                ← News & Resources
│   ├── contact.html             ← Contact page
│   └── privacy.html             ← Privacy policy
├── assets/
│   ├── css/
│   │   └── main.css             ← All styling
│   └── js/
│       └── main.js              ← HubSpot, forms, email gating
└── DEPLOYMENT_GUIDE.md          ← Full instructions
```

---

## **Key Configuration Points**

### **HubSpot Integration**
File: `assets/js/main.js` (lines 6-9)
```javascript
const HUBSPOT_CONFIG = {
  portalId: 'YOUR_PORTAL_ID',      ← Replace with your ID
  formId: 'YOUR_FORM_ID'           ← Replace with your ID
};
```

### **Portal Login URL**
File: `assets/js/main.js` (line 198)
```javascript
const portalUrl = 'https://portal.fridayinitiatives.com/login';  ← Update this
```

### **Email Gating**
File: `pages/news.html`
Add to any download button:
```html
data-email-gate="true" data-resource-url="https://your-pdf-url.com/guide.pdf"
```

---

## **Color Palette**

- **Purple (Header/Footer):** #513E61
- **Light Lilac (Accents):** #BECAF5
- **Green (Highlights):** #A8D870
- **Dark Background:** #2a2a2a
- **White:** #ffffff

---

## **Support Resources**

- **Digital Ocean Docs:** docs.digitalocean.com
- **HubSpot Help:** help.hubspot.com
- **Full Guide:** See DEPLOYMENT_GUIDE.md

---

**Ready to deploy? Follow DEPLOYMENT_GUIDE.md for step-by-step instructions!**
