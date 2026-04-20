# 🐧 Linux for Windows Users

A friendly, step-by-step guide to help Windows users transition to Linux. Designed for all ages and skill levels, hosted on GitHub Pages.

**Live site:** `https://YOUR-USERNAME.github.io/linux-for-windows-users/`

---

## Features

- 📖 Slide-by-slide reading experience
- 📺 YouTube-style chapter progress bar
- ✅ Per-section checklists with progress tracking
- 🔍 Full-text search across all content
- 🌙 Dark / light mode
- 🎨 3 colour themes (Ubuntu, Pop!_OS, Forest)
- 🖨️ Print individual sections or the whole guide
- 📱 Mobile-friendly with hamburger menu
- ♿ Accessibility-friendly (keyboard navigation, ARIA labels, skip links)

---

## Project Structure

```
linux-for-windows-users/
├── index.html              # Main page shell
├── css/
│   └── styles.css          # All styles
├── js/
│   └── app.js              # All app logic
├── data/
│   └── sections.json       # Section metadata (title, icon, file, isNew, checklist)
├── content/
│   ├── why-switch.md
│   ├── choosing-distro.md
│   ├── installation.md
│   ├── windows-vs-linux.md
│   ├── common-tasks.md
│   ├── gaming.md
│   ├── recommended-apps.md
│   ├── troubleshooting.md
│   ├── glossary.md
│   └── community.md
└── README.md
```

---

## How to Edit Content

All content is written in **Markdown** — plain text files that are easy to edit directly on GitHub.

### Edit an existing section

1. Open the relevant file in `content/` (e.g. `content/installation.md`)
2. Click the ✏️ pencil icon on GitHub to edit
3. Make your changes using standard Markdown formatting
4. Click **"Commit changes"** — the site updates automatically

### Add a new section

**Step 1 — Create the content file**

Create a new file in `content/`, e.g. `content/my-new-section.md`:

```markdown
# My New Section Title

Your content here. Use standard Markdown formatting.

## Sub-heading

- Bullet point one
- Bullet point two

| Column A | Column B |
| -------- | -------- |
| Row 1    | Data     |
```

**Step 2 — Register it in `data/sections.json`**

Add an entry to the array in `data/sections.json`:

```json
{
  "id": "my-new-section",
  "title": "My New Section",
  "icon": "🆕",
  "file": "content/my-new-section.md",
  "isNew": true,
  "newLabel": "Just added — check it out!",
  "checklistItems": [
    "I've read this section",
    "I've completed the tasks"
  ]
}
```

| Field            | Required              | Description                                    |
| ---------------- | --------------------- | ---------------------------------------------- |
| `id`             | ✅                     | Unique slug (no spaces, use hyphens)           |
| `title`          | ✅                     | Display name shown in nav and chapter bar      |
| `icon`           | ✅                     | Emoji icon shown in chapter bar                |
| `file`           | ✅                     | Path to the markdown file                      |
| `isNew`          | ✅                     | `true` shows a "NEW" callout banner            |
| `newLabel`       | Only if `isNew: true` | Text for the NEW banner                        |
| `checklistItems` | ✅                     | Array of checklist strings (can be empty `[]`) |
**Step 3 — Done!** The new section automatically appears in the chapter bar and navigation.

### Remove a section

1. Delete the entry from `data/sections.json`
2. Optionally delete the `.md` file from `content/`
3. The section disappears from the site automatically

### Reorder sections

Change the order of entries in `data/sections.json` — the site follows that order.

---

## Markdown Formatting Guide

### Headings
```markdown
# Section title (h1 — used once at top)
## Major heading (h2)
### Sub-heading (h3)
```

### Callout boxes (blockquotes)
```markdown
> 💡 **Tip:** This renders as a highlighted callout box.
> ⚠️ **Warning:** Use for important warnings.
```

### Tables
```markdown
| Column 1 | Column 2  | Column 3  |
| -------- | --------- | --------- |
| Row data | More data | Even more |
```

### Code (inline)
```markdown
Run `sudo apt update` to refresh the package list.
```

### Code blocks (terminal commands)
````markdown
```bash
sudo apt update
sudo apt upgrade
```
````

### Links
```markdown
[Link text](https://example.com)
```

---

## Marking Content as "New"

To show the orange "NEW" callout banner on a section:

```json
"isNew": true,
"newLabel": "Updated April 2025 — new screenshots added"
```

To remove the banner:
```json
"isNew": false,
"newLabel": ""
```

---

## Local Development

To preview the site locally (required because the site fetches `.md` files via `fetch()`):

```bash
# Python (usually pre-installed on Linux/Mac)
python3 -m http.server 8000

# Node.js
npx serve .

# VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then open `http://localhost:8000` in your browser.

> ⚠️ **Important:** Opening `index.html` directly as a file (`file://`) won't work because browsers block `fetch()` requests for local files. Always use a local server.

---

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `linux-for-windows-users`)
2. Push this project to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/linux-for-windows-users.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your repository
4. Under **Source**, select **"Deploy from a branch"**
5. Select **`main`** branch and **`/ (root)`** folder
6. Click **Save**
7. Your site will be live at `https://YOUR-USERNAME.github.io/linux-for-windows-users/` within a few minutes

### Custom domain (optional)

Add a `CNAME` file to the project root with your domain:
```
www.mylinuxguide.com
```

Then configure your DNS to point to GitHub Pages.

---

## SEO Setup

Before deploying, replace `YOUR-USERNAME` with your real GitHub username in these files:

| File | What to update |
|------|---------------|
| `index.html` | `<link rel="canonical">`, all `og:` and `twitter:` meta tag URLs, JSON-LD `@id` and `url` fields |
| `sitemap.xml` | All `<loc>` URLs |
| `robots.txt` | The `Sitemap:` URL |

### After deploying

1. **Submit your sitemap to Google Search Console:**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add your GitHub Pages URL as a property
   - Go to **Sitemaps** and submit: `https://YOUR-USERNAME.github.io/linux-for-windows-users/sitemap.xml`

2. **Submit to Bing Webmaster Tools:**
   - Go to [bing.com/webmasters](https://www.bing.com/webmasters)
   - Add your site and submit the same sitemap

3. **Request indexing** for your main URL in Google Search Console → URL Inspection → Request Indexing

### What's already included

- ✅ Rich `<title>` and `<meta description>` with target keywords
- ✅ Open Graph tags (Facebook, LinkedIn, Discord link previews)
- ✅ Twitter Card tags
- ✅ JSON-LD structured data: `WebSite`, `HowTo` (installation steps), `FAQPage` (6 common questions)
- ✅ `sitemap.xml` listing all sections
- ✅ `robots.txt` allowing all crawlers
- ✅ `<noscript>` fallback content for crawlers that don't run JavaScript
- ✅ `<link rel="preconnect">` for faster font loading
- ✅ Semantic HTML with proper heading hierarchy and ARIA landmarks

---

## Editing SEO Keywords and Phrases

As search trends change, you'll want to update the keywords and phrases the site targets. All SEO content lives in the `<head>` of **`index.html`** — you don't need to touch any other file.

### 1. Page title (`<title>`)

The most important SEO element. This is what shows in the Google search result and browser tab.

```html
<title>Linux for Windows Users — Free Beginner's Guide to Switching to Linux</title>
```

**Tips:**
- Keep it under **60 characters** (longer titles get truncated in search results)
- Put the most important keyword **first**
- Include a "hook" — free, beginner's, 2026, guide, tutorial
- Use your brand name after a `—` or `|` separator

### 2. Meta description

The paragraph that appears under your title in search results.

```html
<meta name="description" content="A friendly, step-by-step guide to switching from Windows to Linux…">
```

**Tips:**
- Keep it between **150 and 160 characters**
- Include 2–3 target keywords naturally
- Make it compelling — it's your "ad copy" in search results
- Mention what makes it unique (free, beginner-friendly, covers Ubuntu + Pop!_OS)

### 3. Keywords meta tag

A comma-separated list of search terms.

```html
<meta name="keywords" content="switch to linux, linux for beginners, linux tutorial, …">
```

**Tips:**
- Include both **short-tail** ("linux tutorial") and **long-tail** ("how to install ubuntu alongside windows") keywords
- Think about what a real user would type — e.g. "is linux easy?", "can i run photoshop on linux?"
- Aim for 10–15 phrases
- Update quarterly based on what Google Search Console shows you

### 4. Open Graph & Twitter Card tags

These control how your site looks when shared on Facebook, LinkedIn, Discord, Slack, Twitter, etc. Update `og:title`, `og:description`, `twitter:title`, `twitter:description` whenever you change the main title or description — keep them in sync.

```html
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta name="twitter:title" content="…">
<meta name="twitter:description" content="…">
```

### 5. JSON-LD FAQPage (search "rich snippets")

Google may show your FAQ answers directly in search results. To add, remove, or edit a question, find the `"FAQPage"` block in `index.html` and edit the `mainEntity` array:

```html
<script type="application/ld+json">
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Your question here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your clear, concise answer here."
      }
    },
    …add more questions here…
  ]
}
</script>
```

**Tips:**
- Questions should be **exactly what users type** into Google
- Answers should be **50–150 words**, clear and standalone
- Cover high-intent questions like "is Linux safe?", "how much RAM does Linux need?"

### 6. JSON-LD HowTo (step-by-step rich result)

The installation steps can appear as a numbered list in Google. Edit the `"HowTo"` block's `"step"` array to match your current installation flow.

### 7. NoScript fallback content

The `<noscript>` block in `index.html` is what search crawlers that don't run JavaScript see. Keep the keywords you care about most here — this is your "safety net" for SEO.

### 8. Adding new sections = more keywords

When you add a section to `data/sections.json`, also update:

1. **`sitemap.xml`** — add a new `<url>` block with the section's hash URL
2. **`index.html` `<meta keywords>`** — add any new keywords the section targets
3. **`index.html` `<noscript>` block** — add a brief summary paragraph for the new topic
4. **Consider adding an FAQ entry** for the section's main question

### Measuring what works

After deploying, use **Google Search Console** (free) to see:
- What search queries bring visitors to your site
- Which pages get clicks vs. just impressions
- What your average ranking position is

Use this data to **rewrite your title, description, and keywords** based on what real users are searching for. Update them every 1–3 months.

### Quick SEO checklist when editing

- [ ] Title under 60 characters with main keyword first
- [ ] Description between 150–160 characters
- [ ] Keywords mix short-tail and long-tail phrases
- [ ] Open Graph / Twitter tags match the title + description
- [ ] All `YOUR-USERNAME` placeholders replaced with real GitHub username
- [ ] `sitemap.xml` updated if you added/removed sections
- [ ] Resubmit sitemap to Search Console after big changes

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b add-new-section`
3. Make your changes
4. Open a Pull Request with a description of what you added/changed

Please keep the friendly, encouraging tone consistent with the rest of the guide — this site is for all ages and skill levels.

---

## License

Content is licensed under [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
Code is licensed under the [MIT License](LICENSE).

---

*Made with 🐧 for the Linux community.*
