# AMO Listing Information

## Basic Information

### Name
GOG Games Extended

### Add-on URL (slug)
gog-games-extended

### Summary (250 characters max)
Enriches gog-games.to pages with screenshots and videos from GOG Database. Automatically displays media galleries for better game discovery and information.

### Description (Full)

**GOG Games Extended** enhances your browsing experience on gog-games.to by automatically adding rich media content from GOG Database.

When you visit a game page on gog-games.to, this extension seamlessly integrates:

🎬 **Video Galleries** - Watch trailers, gameplay videos, and promotional content directly on the page

📸 **Screenshot Galleries** - Browse high-quality screenshots in an elegant, responsive gallery

🎨 **Clean Design** - Carefully designed to match the visual style of gog-games.to

⚡ **Fast & Lightweight** - Optimized loading with lazy loading and efficient API calls

🔒 **Privacy-Focused** - No data collection, no tracking, no external analytics

**How it works:**

1. Navigate to any game page on gog-games.to
2. The extension automatically detects the game
3. Fetches media from GOG Database API
4. Displays videos and screenshots in beautiful galleries
5. Click screenshots to view in full resolution
6. Click videos to play them inline

**Features:**

- Automatic media detection and loading
- Responsive design for desktop and mobile
- Error handling with clear user messages
- Support for single-page application navigation
- No configuration needed - works out of the box

**Technical Details:**

This extension uses the public GOG Database API to retrieve media information. It requires permissions to access gog-games.to (to inject content), gogdb.org (to fetch data), and images.gog-statics.com (to load images). No user data is collected or transmitted.

**Open Source:**

This extension is open source and available on GitHub. Contributions and feedback are welcome!

## Categories

### Firefox Desktop
1. **Shopping** (or **Other** if Shopping not available)
2. **Web Development** (or **Other**)

### Firefox for Android
1. **Shopping** (or **Other**)
2. **Web Development** (or **Other**)

## Support

### Support Email
(User's email or create a dedicated support email)

### Support Website
https://github.com/all3f0r1/gog-games-extended-firefox/issues

## License
MIT License

## Flags

- [ ] This add-on is experimental
- [ ] This add-on requires payment, non-free services or software, or additional hardware

## Tags/Keywords
gog, games, database, media, screenshots, videos, gallery, gaming, enhancement

## Notes for Reviewers

**Extension Overview:**
This extension enhances gog-games.to pages by adding media galleries from GOG Database.

**How to Test:**
1. Install the extension
2. Visit https://gog-games.to/game/frostpunk_2
3. Wait for the page to load completely
4. Click the "More" button to reveal additional links
5. The extension will automatically inject a "GOG Database Media" section with videos and screenshots

**Permissions Explanation:**
- `*://gog-games.to/*` - Required to inject content into game pages
- `https://www.gogdb.org/*` - Required to fetch game data from GOG Database API
- `https://images.gog-statics.com/*` - Required to load game screenshots

**Background Script:**
The extension uses a background script to bypass CORS restrictions when fetching data from the GOG Database API. Content scripts cannot make cross-origin requests even with host_permissions.

**No Data Collection:**
This extension does not collect, store, or transmit any user data. It only fetches publicly available game information from GOG Database.

**Source Code:**
The complete source code is available on GitHub: https://github.com/all3f0r1/gog-games-extended-firefox

No minification or obfuscation is used. All code is readable and well-commented.
