# Common Tasks

Here's how to do the everyday things you're used to on Windows. You'll be surprised how similar most of it is! 😊

---

## 🌐 Browsing the Web

**Firefox** comes pre-installed on Ubuntu and Pop!_OS. It works exactly the same as on Windows.

Want Chrome? Open the App Center / Software Shop and search for "Chromium" (the open-source version of Chrome), or download Chrome directly from [google.com/chrome](https://google.com/chrome).

**Bookmarks, passwords, history** all sync the same way through your Google or Firefox account.

---

## 📁 Managing Files

Open the **Files** app (Nautilus) — it works very similarly to Windows Explorer.

| Task              | How to do it                                            |
| ----------------- | ------------------------------------------------------- |
| Copy a file       | Right-click → Copy, then right-click → Paste            |
| Move a file       | Drag and drop, or Cut + Paste                           |
| Rename a file     | Click once to select, press F2, or right-click → Rename |
| Delete a file     | Press Delete key (goes to Trash)                        |
| Empty Trash       | Right-click Trash in sidebar → Empty Trash              |
| Show hidden files | Press Ctrl+H (files starting with `.` are hidden)       |
| New folder        | Right-click empty space → New Folder                    |
| Search files      | Press Ctrl+F or use the search icon                     |
> 💡 **Hidden files** in Linux start with a dot (`.`). Things like `.bashrc` or `.config` are hidden system files — usually you won't need to touch them.

---

## 📦 Installing Apps

### Using the App Centre (easiest)
1. Open **Ubuntu Software** (Ubuntu) or **Pop!_Shop** (Pop!_OS)
2. Search for the app you want
3. Click Install
4. Done! The app appears in your app launcher

### Using the Terminal
For many apps, you can install with one command:
```bash
sudo apt install vlc
sudo apt install gimp
sudo apt install thunderbird
```

### Using Flatpak / Snap
Some apps are available as **Flatpak** or **Snap** packages — these are universal Linux packages that work on any distro. The App Centre handles these automatically.

---

## 🔌 Connecting to Wi-Fi

1. Click the **network icon** in the top-right corner (system tray)
2. Click on your Wi-Fi network name
3. Enter your password
4. Click Connect ✅

Your connection is saved for next time — just like Windows.

---

## 🖨️ Printing

1. Open **Settings → Printers**
2. Click **Add Printer**
3. Linux will search for nearby printers automatically
4. Most modern printers are detected instantly via **CUPS** (the built-in print system)

> 💡 If your printer isn't detected, visit your printer manufacturer's website and look for Linux / CUPS drivers, or search "[Your Printer Model] Linux driver".

---

## 📧 Email

**Thunderbird** is the recommended email client — it's free, powerful, and works with Gmail, Outlook, Yahoo, and any other email provider.

1. Install Thunderbird from the App Centre
2. Open it and enter your email address and password
3. Thunderbird will automatically configure the settings for most providers

Or just use **webmail** in your browser — Gmail, Outlook.com, etc. all work perfectly.

---

## 📸 Photos & Screenshots

### Viewing Photos
The **Photos** app (or Image Viewer) opens photos just like Windows Photos. You can also view photos directly in the Files app by clicking them.

### Taking Screenshots
| Action                 | Shortcut                            |
| ---------------------- | ----------------------------------- |
| Full screen screenshot | PrtScn                              |
| Select area            | Shift + PrtScn                      |
| Current window         | Alt + PrtScn                        |
| Screenshot tool        | Search "Screenshot" in app launcher |
Screenshots save automatically to your **Pictures** folder.

---

## 🎵 Music & Video

- **VLC** — plays virtually any video or audio file. Install from App Centre.
- **Rhythmbox** — music library manager (pre-installed on Ubuntu)
- **Spotify** — install from App Centre or [spotify.com/download/linux](https://www.spotify.com/download/linux)
- **YouTube** — works perfectly in any web browser

---

## ⚙️ Changing System Settings

Open **Settings** (gear icon in system menu, or search "Settings" in app launcher):

| Task                        | Where to find it       |
| --------------------------- | ---------------------- |
| Change wallpaper            | Settings → Appearance  |
| Adjust display / resolution | Settings → Displays    |
| Sound volume & devices      | Settings → Sound       |
| Keyboard shortcuts          | Settings → Keyboard    |
| User accounts               | Settings → Users       |
| Date & time                 | Settings → Date & Time |
| Power / sleep settings      | Settings → Power       |
---

## 🔄 Updating Your System

Keeping Linux updated is easy and you control when it happens:

**GUI method:**
Open **Software Updater** (Ubuntu) and click "Install Updates"

**Terminal method:**
```bash
sudo apt update && sudo apt upgrade
```

> 💡 Unlike Windows, Linux updates **never** restart your computer without asking, and they rarely require a restart at all.
