# Sober Sidekick Subdomain Skeleton

A GitHub template for creating new subdomain applications that share the Sober Sidekick design system.

## Quick Start

### Option 1: Use GitHub Template (Recommended)

1. Click **"Use this template"** on GitHub
2. Name your repo (e.g., `admin.sobersidekick.com`)
3. Clone and install:

```bash
git clone https://github.com/your-org/your-new-repo
cd your-new-repo
npm install
npm start
```

### Option 2: Via Claude Code MCP

When starting a new project, Claude will ask:

> "Would you like to use the Sober Sidekick subdomain skeleton?"

Select **Yes** to scaffold a new app with the shared design system.

### Option 3: Manual Clone

```bash
npx degit sidekick2020/subdomain-skeleton my-new-app
cd my-new-app
npm install
npm start
```

---

## What's Included

```
subdomain-skeleton/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages auto-deployment
├── public/
│   ├── index.html          # HTML template (with SPA redirect handler)
│   ├── 404.html            # GitHub Pages SPA routing
│   ├── _redirects          # SPA routing for Render/Netlify
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # Shared components
│   │   ├── Sidebar.js      # Sidebar nav with theme toggle (default)
│   │   └── Header.js       # Alternative header layout
│   ├── contexts/           # React context providers
│   │   ├── ThemeContext.js     # Light/dark theme (light default)
│   │   ├── AuthContext.js      # Google Sign-In
│   │   ├── AnalyticsContext.js # Amplitude tracking
│   │   ├── DataCacheContext.js # Client-side caching
│   │   └── index.js            # Barrel export
│   ├── pages/              # Page components
│   │   ├── HomePage.js
│   │   ├── AboutPage.js
│   │   └── NotFound.js
│   ├── styles/             # Design system CSS
│   │   ├── tokens.css      # Design tokens (color guidelines!)
│   │   ├── base.css        # Reset & base styles
│   │   ├── components.css  # Component styles
│   │   ├── layout.css      # Layout patterns
│   │   ├── utilities.css   # Utility classes
│   │   └── index.css       # Main entry
│   ├── App.js              # Main app component (sidebar layout)
│   └── index.js            # Entry point
├── .env.example            # Environment variables template
├── package.json
├── render.yaml             # Render.com deployment config
└── README.md
```

---

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required for Google Sign-In
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id

# Required for Analytics (production)
REACT_APP_AMPLITUDE_API_KEY=your-amplitude-api-key

# Optional: API backend URL
REACT_APP_API_URL=https://api.sobersidekick.com
```

### Allowed Auth Domains

Edit `src/contexts/AuthContext.js` to configure allowed email domains:

```javascript
const ALLOWED_DOMAINS = ['sobersidekick.com', 'empathyhealthtech.com'];
```

---

## Customization

### 1. Update App Name & Branding

- `public/index.html` - Update `<title>`
- `public/manifest.json` - Update `name` and `short_name`
- `src/App.js` - Update Sidebar `logo` and `appName` props

```jsx
<Sidebar
  logo="🔷"           // Your logo (emoji, image, or React component)
  appName="My App"    // Your app name
  navItems={navItems}
/>
```

### 2. Configure Navigation

Edit the `navItems` array in `src/App.js`:

```jsx
const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
  // Icons are optional - can be emojis, images, or React components
];
```

### 3. Add Routes

Edit `src/App.js`:

```javascript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  {/* Add your routes here */}
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 3. Add Analytics Events

Edit `src/contexts/AnalyticsContext.js` to add custom events:

```javascript
export const ANALYTICS_EVENTS = {
  // ... existing events
  MY_CUSTOM_EVENT: 'my_custom_event',
};
```

---

## Design System

### Color Guidelines

**IMPORTANT:** Follow these guidelines to maintain consistency across all Sober Sidekick apps.

#### Light Mode (Default)

Light mode is the **default theme** for all Sober Sidekick apps. Do not auto-detect system preferences.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#f8fafc` | Main page background |
| `--bg-secondary` | `#f1f5f9` | Cards, panels, elevated surfaces |
| `--bg-tertiary` | `#e2e8f0` | Inputs, secondary panels |
| `--text-primary` | `#111827` | Headings, important text |
| `--text-secondary` | `#374151` | Body text |
| `--text-muted` | `#4b5563` | Labels, captions |
| `--accent-primary` | `#2f5dff` | Primary buttons, links |

#### Dark Mode

Dark mode uses **neutral grays only** - never use tinted backgrounds (no purple, blue, or other colored backgrounds).

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#1a1a1a` | Main page background (neutral dark gray) |
| `--bg-secondary` | `#141414` | Sunken/recessed areas |
| `--bg-tertiary` | `#242424` | Cards, elevated surfaces |
| `--text-primary` | `#f5f5f5` | Headings, important text |
| `--text-secondary` | `#d4d4d4` | Body text |
| `--text-muted` | `#a3a3a3` | Labels, captions |

#### What NOT to Do

```css
/* BAD - Using tinted dark backgrounds */
--bg-primary: #1a1a2e;  /* Purple tint - DON'T DO THIS */
--bg-primary: #0d1b2a;  /* Blue tint - DON'T DO THIS */

/* GOOD - Neutral grays only */
--bg-primary: #1a1a1a;  /* Pure dark gray */
--bg-primary: #121212;  /* Slightly darker */
```

### Theme Toggle Location

The theme toggle belongs in the **sidebar footer**, not in the header. This provides:
- Clear user control without cluttering the main navigation
- Persistent access across all pages
- Room for a descriptive label ("Light Mode" / "Dark Mode")

```jsx
// In App.js - Sidebar handles theme toggle automatically
<Sidebar
  logo="🔷"
  appName="My App"
  navItems={navItems}
/>
```

### Using Design Tokens

Always use CSS variables instead of hardcoded values:

```css
/* Good */
.my-component {
  background: var(--bg-primary);
  color: var(--text-secondary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}

/* Bad - hardcoded colors break theming */
.my-component {
  background: #f8fafc;
  color: #374151;
}
```

### Theme Hook

Access theme state in components:

```jsx
const { theme, toggleTheme, isDark, isLight } = useTheme();

// Use for conditional rendering
{isDark ? <DarkIcon /> : <LightIcon />}
```

### Component Classes

```jsx
// Buttons
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>

// Cards
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Title</h3>
  </div>
  <div className="card-body">Content</div>
</div>

// Badges
<span className="badge badge-success">Active</span>
```

---

## Deployment

### GitHub Pages (Recommended for demos)

Deployment is automatic via GitHub Actions. Just push to `main`:

1. Go to your repo **Settings → Pages**
2. Under "Build and deployment", select **GitHub Actions**
3. Push to `main` branch - the workflow will build and deploy automatically

Your app will be available at: `https://your-org.github.io/your-repo-name/`

**Note:** The skeleton includes SPA routing support for GitHub Pages via 404.html redirect.

### Render.com (Recommended for production)

1. Connect your GitHub repo to Render
2. The `render.yaml` is pre-configured for static site deployment
3. Add environment variables in Render dashboard

### Netlify

1. Connect your GitHub repo
2. Build command: `npm run build`
3. Publish directory: `build`
4. The `_redirects` file handles SPA routing

### Vercel

1. Import your GitHub repo
2. Framework preset: Create React App
3. Build automatically detected

---

## Subdomain Consistency

All Sober Sidekick subdomains share:

| Feature | Shared |
|---------|--------|
| Design tokens (colors, spacing) | ✅ |
| Component styles | ✅ |
| Theme (light/dark) | ✅ |
| Authentication domains | ✅ |
| Analytics events | ✅ |

---

## License

MIT - Sober Sidekick / Empathy Health Tech
