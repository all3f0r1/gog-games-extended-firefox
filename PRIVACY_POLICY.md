# Privacy Policy for GOG Games Extended

**Last Updated: November 8, 2025**

## Overview

GOG Games Extended ("the Extension") is committed to protecting your privacy. This privacy policy explains how the Extension handles data.

## Data Collection

**The Extension does NOT collect, store, or transmit any personal data.**

Specifically:
- No user browsing history is collected
- No personal information is collected
- No analytics or tracking is performed
- No cookies are set by the Extension
- No data is sent to third-party servers (except as described below)

## Data Transmission

The Extension makes requests to the following external services:

### 1. GOG Database (gogdb.org)
- **Purpose**: To retrieve publicly available game information (screenshots, videos, metadata)
- **Data Sent**: Game Product ID (extracted from the page URL)
- **Data Received**: JSON data containing game media information
- **Privacy**: No personal data is sent. Only publicly available game IDs are transmitted.

### 2. GOG Static Images (images.gog-statics.com)
- **Purpose**: To load game screenshots
- **Data Sent**: HTTP requests for image files
- **Data Received**: Image files
- **Privacy**: Standard HTTP requests, no personal data transmitted

## Permissions

The Extension requires the following permissions:

### Host Permissions
- `*://gog-games.to/*` - To inject media galleries into game pages
- `https://www.gogdb.org/*` - To fetch game data from GOG Database API
- `https://images.gog-statics.com/*` - To load game screenshots

These permissions are used solely for the functionality described above and do not enable any data collection.

## Local Storage

The Extension does not use any form of local storage, including:
- localStorage
- IndexedDB
- Cookies
- Cache API

## Third-Party Services

The Extension interacts with the following third-party services:

1. **GOG Database (gogdb.org)** - A community-maintained database of GOG games
   - Privacy Policy: https://www.gogdb.org (if available)
   - Data shared: Game Product IDs only

2. **GOG CDN (images.gog-statics.com)** - GOG's content delivery network for images
   - Privacy Policy: https://www.gog.com/privacy
   - Data shared: Standard HTTP requests

## Changes to Game Pages

The Extension modifies the visual appearance of gog-games.to pages by injecting HTML and CSS. This modification happens locally in your browser and does not involve any data transmission to external servers beyond what is described above.

## Children's Privacy

The Extension does not knowingly collect any information from children under the age of 13. The Extension is designed to enhance browsing on a gaming website and does not target children specifically.

## Changes to This Privacy Policy

We may update this privacy policy from time to time. Any changes will be reflected in the "Last Updated" date at the top of this policy. Continued use of the Extension after changes constitutes acceptance of the updated policy.

## Open Source

The Extension is open source. You can review the complete source code at:
https://github.com/all3f0r1/gog-games-extended-firefox

## Contact

If you have questions or concerns about this privacy policy, please open an issue on GitHub:
https://github.com/all3f0r1/gog-games-extended-firefox/issues

## Summary

**In short**: This Extension does not collect, store, or transmit any personal data. It only fetches publicly available game information from GOG Database to enhance your browsing experience on gog-games.to.
