# 🎮 GOG Games Extended

A Firefox extension that enriches [gog-games.to](https://gog-games.to) pages with media (screenshots and videos) from [GOG Database](https://www.gogdb.org).

![Version](https://img.shields.io/badge/version-1.3.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Firefox](https://img.shields.io/badge/Firefox-Compatible-orange.svg)

## 📸 Screenshots

### Before & After

<table>
<tr>
<td width="50%">
<img src="screenshots/before.png" alt="Before - Without extension" />
<p align="center"><em>Before: Standard gog-games.to page</em></p>
</td>
<td width="50%">
<img src="screenshots/after.png" alt="After - With extension" />
<p align="center"><em>After: Enhanced with GOG Database media</em></p>
</td>
</tr>
</table>

## ✨ Features

This extension enhances your browsing experience on gog-games.to by automatically adding:

- **📸 Screenshot Gallery**: Displays all screenshots available on GOG Database
- **🎬 Video Gallery**: Embeds trailers and promotional videos
- **🎨 Clean Interface**: Design matching gog-games.to visual style
- **⚡ Fast Loading**: Optimized media loading with lazy loading
- **📱 Responsive**: Perfectly adapts to mobile and desktop screens
- **⚠️ Error Handling**: Clear messages when API fails or no media is found
- **🔒 Privacy-Focused**: No data collection, no tracking, no analytics

## 🚀 Installation

### From Firefox Add-ons (Recommended - Coming Soon)

The extension will soon be available on the official Firefox Add-ons store.

### Manual Installation (Development)

1. Download or clone this repository:
   ```bash
   git clone https://github.com/all3f0r1/gog-games-extended-firefox.git
   ```

2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`

3. Click **"Load Temporary Add-on..."**

4. Select the `manifest.json` file in the extension folder

5. The extension is now active! Visit a game page on gog-games.to to see the media.

## 📖 Usage

1. Navigate to any game page on [gog-games.to](https://gog-games.to)
   - For example: https://gog-games.to/game/frostpunk_2

2. Wait for the page to load completely

3. **Click the "More" button** to reveal the links (GOGDB link must be visible)

4. A "🎮 GOG Database Media" section appears automatically with:
   - Videos (trailers, gameplay, etc.)
   - High-quality screenshots

5. Click on a screenshot to open it in full resolution in a new tab

6. Click on a video to play it directly on the page

## 🔧 Technical Details

The extension uses the following technologies:

### Architecture

- **Manifest V3**: Modern standard for Firefox extensions
- **Background Script**: Handles API requests to bypass CORS
- **Content Script**: Injects content into gog-games.to pages
- **Message Passing**: Communication between background and content scripts
- **Host Permissions**: Permissions to bypass CORS restrictions

### Workflow

1. Content script detects the game page on gog-games.to
2. A **MutationObserver** monitors dynamic content loading (SPA)
3. Extracts the GOG Database link present on the page
4. Retrieves the Product ID from the GOGDB URL
5. Content script sends a message to the background script with the Product ID
6. The **background script** performs the request to the GOGDB JSON API (CORS bypass)
7. Background script returns the data to the content script
8. Parses the data (screenshots, videos)
9. Builds and injects an HTML/CSS gallery into the page
10. Optimized image loading (thumbnails then full resolution)

### Why a Background Script?

**Content scripts** run in the page context and are subject to CORS restrictions, even with permissions declared in the manifest. Only **background scripts** can make cross-origin requests using `host_permissions`.

### Required Permissions

The extension requests the following permissions:

- `*://gog-games.to/*`: To inject content on game pages
- `https://www.gogdb.org/*`: To retrieve data from the GOGDB API
- `https://images.gog-statics.com/*`: To load images hosted by GOG

These permissions allow the background script to bypass CORS restrictions.

## 📁 Project Structure

```
gog-games-extended-firefox/
├── manifest.json              # Extension configuration
├── icons/                     # Extension icons
│   ├── icon-48.png           # 48x48 icon
│   └── icon-96.png           # 96x96 icon
├── src/                       # Source code
│   ├── background.js         # Background script (API handling)
│   ├── content-script.js     # Content script (UI injection)
│   └── styles.css            # Styles for galleries
├── screenshots/               # Before/After screenshots
│   ├── before.png            # Before extension
│   └── after.png             # After extension
├── submission/                # AMO submission package
│   ├── gog-games-extended-1.3.1.zip
│   ├── AMO_LISTING.md
│   ├── PRIVACY_POLICY.md
│   └── SUBMISSION_GUIDE.md
├── CHANGELOG.md               # Version history
├── PRIVACY_POLICY.md          # Privacy policy
├── LICENSE                    # MIT License
└── README.md                  # Documentation
```

## 🛠️ Development

### Prerequisites

- Firefox Developer Edition (recommended) or Firefox stable
- Code editor (VS Code, Sublime Text, etc.)

### Making Changes

To modify the extension:

1. Edit files in the `src/` folder
2. Reload the extension in `about:debugging`
3. Refresh the gog-games.to page to see changes

### Debugging

- Open the browser console (F12) on a gog-games.to page
- Content script logs are prefixed with `[GOG Games Extended]`
- To see background script logs, go to `about:debugging` > "Inspect" the extension
- Inspect injected elements with the DOM inspector

### Building for Distribution

To create a distribution package:

```bash
cd /path/to/gog-games-extended-firefox
zip -r dist/gog-games-extended-1.3.1.zip manifest.json icons/ src/
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for complete version history.

### Current Version: 1.3.1 (2025-11-08)

**🐛 Critical Bug Fix**
- Extension now works when navigating from homepage to game page
- Content script injected on all gog-games.to pages (not just /game/*)
- Improved URL change detection with better state reset
- Added popstate event listener for browser back/forward navigation

## 🔒 Privacy

This extension does not collect, store, or transmit any personal data. It only fetches publicly available game information from GOG Database to enhance your browsing experience.

See [PRIVACY_POLICY.md](PRIVACY_POLICY.md) for details.

## 📦 AMO Submission

Ready to submit to Firefox Add-ons? Check the `submission/` folder for:
- Extension package (ZIP)
- Screenshots
- Listing information
- Privacy policy
- Step-by-step submission guide

See [submission/SUBMISSION_GUIDE.md](submission/SUBMISSION_GUIDE.md) for detailed instructions.

## ⚠️ Disclaimer

This extension is an independent project and is not affiliated with GOG, CD Projekt, or gog-games.to. It uses publicly accessible data from GOG Database to enhance the user experience.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GOG Database](https://www.gogdb.org) for the API and data
- [gog-games.to](https://gog-games.to) for the platform
- The Firefox community for extension development tools

## 📧 Contact

For questions, suggestions, or bug reports, please open an issue on GitHub:
https://github.com/all3f0r1/gog-games-extended-firefox/issues

---

**Developed with ❤️ by Manus AI**
