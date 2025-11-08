# Firefox Add-ons (AMO) Submission Guide

## Pre-Submission Checklist

- [x] Extension tested and working correctly
- [x] Version number updated (1.3.1)
- [x] ZIP package created
- [x] Screenshots prepared (before/after)
- [x] Privacy policy written
- [x] Listing information prepared
- [x] Support channels established (GitHub Issues)
- [x] Source code publicly available on GitHub

## Files Prepared

### 1. Extension Package
- **File**: `dist/gog-games-extended-1.3.1.zip`
- **Size**: ~1 MB
- **Contents**: manifest.json, icons/, src/
- **Status**: ✅ Ready

### 2. Screenshots
- **Before**: `screenshots/before.png` (525 KB)
- **After**: `screenshots/after.png` (794 KB)
- **Status**: ✅ Ready

### 3. Documentation
- **Privacy Policy**: `PRIVACY_POLICY.md`
- **Listing Info**: `AMO_LISTING.md`
- **README**: `README.md`
- **Status**: ✅ Ready

## Step-by-Step Submission Process

### Step 1: Create Mozilla Account
1. Go to https://addons.mozilla.org
2. Click "Log in" or "Register"
3. Create/use Mozilla Account
4. Verify email address

### Step 2: Access Developer Hub
1. Navigate to https://addons.mozilla.org/developers/
2. Click "Submit Your First Add-on" or "Submit a New Add-on"

### Step 3: Choose Distribution Method
1. Select **"On this site"** (listed on AMO)
2. Click "Continue"

### Step 4: Upload Extension
1. Click "Select a file"
2. Upload `dist/gog-games-extended-1.3.1.zip`
3. Wait for validation to complete
4. Address any errors or warnings
5. Select compatible platforms: **Firefox for Desktop** and **Firefox for Android**
6. Click "Continue"

### Step 5: Source Code (if needed)
1. Select **"No"** - our code is not minified/obfuscated
2. Click "Continue"

### Step 6: Describe Add-on

Fill in the following information (copy from `AMO_LISTING.md`):

#### Basic Information
- **Name**: GOG Games Extended
- **Add-on URL**: gog-games-extended (or auto-generated)
- **Summary**: 
  ```
  Enriches gog-games.to pages with screenshots and videos from GOG Database. Automatically displays media galleries for better game discovery and information.
  ```

#### Description
Copy the full description from `AMO_LISTING.md`

#### Flags
- [ ] This add-on is experimental
- [ ] This add-on requires payment

#### Categories
- **Firefox Desktop**: Shopping, Web Development (or Other)
- **Firefox for Android**: Shopping, Web Development (or Other)

#### Support
- **Support Email**: (your email)
- **Support Website**: https://github.com/all3f0r1/gog-games-extended-firefox/issues

#### License
- Select: **MIT License**

#### Privacy Policy
- [x] This add-on has a privacy policy
- Paste content from `PRIVACY_POLICY.md`

#### Notes for Reviewers
Copy from `AMO_LISTING.md` - "Notes for Reviewers" section

### Step 7: Submit
1. Review all information
2. Click "Submit Version"
3. Wait for confirmation email

### Step 8: Upload Screenshots (After Initial Submission)
1. Go to your add-on's page on AMO
2. Click "Edit Product Page"
3. Upload screenshots:
   - `screenshots/before.png` - Caption: "Before: Standard gog-games.to page"
   - `screenshots/after.png` - Caption: "After: Enhanced with GOG Database media"
4. Save changes

## Post-Submission

### What to Expect
- **Automated validation**: Immediate
- **Manual review**: 24-48 hours (typically)
- **Email notification**: When review is complete
- **Possible outcomes**:
  - ✅ Approved and published
  - ⚠️ Approved with recommendations
  - ❌ Rejected with feedback (can resubmit after fixes)

### If Rejected
1. Read reviewer feedback carefully
2. Make necessary changes
3. Update version number
4. Create new ZIP package
5. Resubmit

### After Approval
1. Extension will be live on AMO
2. Users can install it from the store
3. Monitor reviews and feedback
4. Respond to user issues on GitHub

## Updating the Extension

When releasing a new version:

1. Update version in `manifest.json`
2. Update `CHANGELOG.md`
3. Create new ZIP package
4. Go to your add-on's page on AMO
5. Click "Upload New Version"
6. Follow same process as initial submission

## Important Links

- **AMO Developer Hub**: https://addons.mozilla.org/developers/
- **Submit New Add-on**: https://addons.mozilla.org/developers/addon/submit/
- **Extension Workshop**: https://extensionworkshop.com/
- **Add-on Policies**: https://extensionworkshop.com/documentation/publish/add-on-policies/
- **Developer Agreement**: https://extensionworkshop.com/documentation/publish/firefox-add-on-distribution-agreement/

## Contact for Help

- **AMO Support**: https://extensionworkshop.com/documentation/publish/get-help/
- **Developer Forums**: https://discourse.mozilla.org/c/add-ons/35
- **GitHub Issues**: https://github.com/all3f0r1/gog-games-extended-firefox/issues

## Notes

- Keep the GitHub repository public and up-to-date
- Respond to reviewer questions promptly
- Monitor user reviews and feedback
- Keep privacy policy and documentation current
- Test thoroughly before each submission
