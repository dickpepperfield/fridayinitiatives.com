# Friday Initiatives Website - Complete Deployment Guide

## **For Non-Technical Users: Step-by-Step Instructions**

This guide will walk you through EVERYTHING you need to do to:
1. Migrate from Wix
2. Deploy to Digital Ocean
3. Connect your domain
4. Integrate HubSpot
5. Set up email gating
6. Create portal login

---

## **PART 1: PREPARATION (Before You Start)**

### **What You'll Need:**
- [ ] Your domain: www.fridayinitiatives.com (you already have this)
- [ ] HubSpot account (free or paid)
- [ ] Digital Ocean account (create one if you don't have it)
- [ ] Access to your domain registrar (where you manage DNS)
- [ ] About 1-2 hours of your time

### **Step 1: Create a Digital Ocean Account**

1. Go to **www.digitalocean.com**
2. Click **"Sign Up"** in the top right
3. Create an account with your email
4. Verify your email
5. Add a payment method (Digital Ocean charges ~$5-15/month)
6. **You're done!** Keep this tab open

---

## **PART 2: DEPLOY WEBSITE TO DIGITAL OCEAN**

### **Step 2: Create a New App on Digital Ocean**

1. In Digital Ocean, click **"Apps"** in the left menu
2. Click **"Create App"**
3. Select **"GitHub"** (or **"Upload Code"** if you prefer)
4. If using GitHub:
   - Connect your GitHub account
   - Select the repository with the website files
   - Click **"Next"**

5. **Configure the App:**
   - Name: `friday-initiatives-website`
   - Source: Select the `main` branch
   - Build command: Leave blank
   - Run command: Leave blank

6. Click **"Next"** → **"Create Resources"** → **"Deploy"**

**Wait 2-5 minutes for deployment to complete.** You'll see a green checkmark when it's done.

---

## **PART 3: CONNECT YOUR DOMAIN**

### **Step 3: Get Your Digital Ocean App URL**

1. After deployment completes, you'll see a URL like:
   ```
   https://friday-initiatives-website-xxxxx.ondigitalocean.app
   ```
2. **Copy this URL** and save it somewhere

### **Step 4: Update Your Domain DNS**

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find **"DNS Settings"** or **"DNS Management"**
3. Look for **CNAME Records**
4. Create a new CNAME record:
   - **Name:** `www`
   - **Value:** `friday-initiatives-website-xxxxx.ondigitalocean.app`
   - Click **"Save"**

5. Also create an A record pointing to Digital Ocean:
   - **Name:** `@` (or leave blank)
   - **Value:** Ask Digital Ocean support for the IP address
   - Click **"Save"**

6. **Wait 24-48 hours** for DNS to propagate (sometimes faster)

7. **Test it:** Go to `www.fridayinitiatives.com` in your browser
   - If it works, you'll see your website! 🎉
   - If not, wait a few more hours and try again

---

## **PART 4: MIGRATE FROM WIX**

### **Step 5: Backup Your Wix Content**

1. Log into your Wix account
2. Go to **Settings** → **Export Data**
3. Download your content as a backup
4. **Keep this file safe** (you may need it later)

### **Step 6: Delete Wix Site (Optional)**

1. In Wix, go to **Settings** → **Delete Site**
2. Follow the prompts
3. **Note:** You can keep Wix if you want, but we recommend deleting it to avoid confusion

### **Step 7: Update Your Domain**

1. In Wix, go to **Settings** → **Domains**
2. Click **"Disconnect"** next to www.fridayinitiatives.com
3. Confirm the disconnection
4. **Wait 24 hours** for the domain to fully disconnect

---

## **PART 5: INTEGRATE HUBSPOT**

### **Step 8: Get Your HubSpot Portal ID**

1. Log into **HubSpot** (hubspot.com)
2. Click your **profile icon** (top right)
3. Click **"Account Settings"**
4. In the left menu, click **"Account Details"**
5. Find **"Portal ID"** (it's a number like `12345678`)
6. **Copy this number** and save it

### **Step 9: Create a HubSpot Form**

1. In HubSpot, go to **Marketing** → **Forms**
2. Click **"Create Form"**
3. Choose **"Blank Form"** or **"Contact Form"**
4. Add these fields:
   - Email (required)
   - Name (optional)
   - Company (optional)
   - Message (optional)

5. Click **"Publish"**
6. You'll see a **Form ID** (looks like `abc123def456`)
7. **Copy this Form ID** and save it

### **Step 10: Add HubSpot to Your Website**

1. Open the file: `assets/js/main.js`
2. Find this section at the top:
   ```javascript
   const HUBSPOT_CONFIG = {
     portalId: 'YOUR_PORTAL_ID',
     formId: 'YOUR_FORM_ID'
   };
   ```

3. Replace:
   - `YOUR_PORTAL_ID` with your actual Portal ID
   - `YOUR_FORM_ID` with your actual Form ID

4. **Save the file**

5. Upload the updated file to Digital Ocean:
   - Go to your Digital Ocean app
   - Click **"Settings"** → **"Upload Code"**
   - Select the updated `main.js` file
   - Click **"Deploy"**

**HubSpot is now integrated!** 🎉

---

## **PART 6: SET UP EMAIL GATING**

### **Step 11: Create a Resource Download Form**

1. In HubSpot, create a new form (same as Step 9)
2. Name it: **"Resource Download"**
3. Add these fields:
   - Email (required)
   - First Name (optional)
   - Company (optional)

4. **Publish** the form
5. **Copy the Form ID**

### **Step 12: Add Email Gating to Your Website**

1. Open `pages/news.html`
2. Find any download buttons or resource links
3. Add this attribute to the button:
   ```html
   data-email-gate="true" data-resource-url="https://your-pdf-url.com/guide.pdf"
   ```

4. **Save the file**
5. Upload to Digital Ocean (same as Step 10)

**Email gating is now active!** When users click a resource link, they'll be prompted to enter their email before downloading.

---

## **PART 7: CREATE PORTAL LOGIN**

### **Step 13: Set Up Portal Login Link**

1. In your website files, find any **"Login"** or **"Portal"** buttons
2. Add this attribute:
   ```html
   data-portal-login="true"
   ```

3. Open `assets/js/main.js`
4. Find this line:
   ```javascript
   const portalUrl = 'https://portal.fridayinitiatives.com/login';
   ```

5. Replace with your actual portal URL (on Digital Ocean)
6. **Save the file**
7. Upload to Digital Ocean

**Portal login is now configured!** Users can click the login button to go to your platform.

---

## **PART 8: FINAL SETUP & TESTING**

### **Step 14: Test Everything**

Go to **www.fridayinitiatives.com** and test:

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Contact form submits (check HubSpot for the submission)
- [ ] Newsletter signup works
- [ ] Download buttons trigger email gate
- [ ] Login button redirects to portal
- [ ] Mobile view looks good (test on phone)

### **Step 15: Set Up Email Notifications**

1. In HubSpot, go to **Settings** → **Email**
2. Set up email notifications for form submissions
3. Make sure **emma@fridayinitiatives.com** receives alerts

### **Step 16: Monitor Performance**

1. In Digital Ocean, go to **Monitoring**
2. Check that your app is running smoothly
3. Monitor bandwidth and CPU usage

---

## **TROUBLESHOOTING**

### **"Website shows error page"**
- Wait 5-10 minutes for deployment to complete
- Check Digital Ocean app status (should be green)
- Check browser cache (clear it and refresh)

### **"Domain not working"**
- DNS changes take 24-48 hours
- Check that CNAME record is correct
- Try accessing via Digital Ocean URL first

### **"HubSpot form not showing"**
- Check that Portal ID and Form ID are correct
- Make sure you saved and deployed the changes
- Check browser console for errors (F12 → Console)

### **"Email gating not working"**
- Make sure you added `data-email-gate="true"` to the button
- Check that HubSpot form ID is correct
- Test in a private browser window

### **"Contact form not sending"**
- Check HubSpot form is published
- Verify Portal ID and Form ID
- Check spam folder for test emails

---

## **SUPPORT**

If you get stuck:

1. **Check the troubleshooting section above**
2. **Contact Digital Ocean support:** support.digitalocean.com
3. **Contact HubSpot support:** help.hubspot.com
4. **Email us:** emma@fridayinitiatives.com

---

## **SUMMARY: What You've Done**

✅ Created Digital Ocean account  
✅ Deployed website to Digital Ocean  
✅ Connected domain (www.fridayinitiatives.com)  
✅ Migrated from Wix  
✅ Integrated HubSpot forms  
✅ Set up email gating for resources  
✅ Created portal login  
✅ Tested everything  

**Your website is now live and fully functional!** 🚀

---

## **NEXT STEPS**

1. **Update content:** Replace placeholder text with your actual content
2. **Add images:** Upload your team photos and case study images
3. **Customize colors:** If needed, edit `assets/css/main.css`
4. **Monitor analytics:** Set up Google Analytics (optional)
5. **Regular backups:** Digital Ocean handles this automatically

---

**Congratulations! Your Friday Initiatives website is now live on Digital Ocean!** 🎉
