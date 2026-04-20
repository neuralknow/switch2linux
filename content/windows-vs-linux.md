# Windows vs Linux

Switching to a new operating system can feel like moving to a new city. The basics are the same — roads, shops, restaurants — but the layout is a little different. This section maps out the key differences so nothing catches you off guard. 🗺️

---

## The Desktop

| Feature      | Windows                  | Linux (Ubuntu/Pop!_OS)          |
| ------------ | ------------------------ | ------------------------------- |
| Start Menu   | Yes (bottom left)        | App Grid / Activities button    |
| Taskbar      | Bottom                   | Bottom (Ubuntu) / Top (Pop!_OS) |
| System Tray  | Bottom right             | Top right                       |
| File Manager | File Explorer            | Nautilus (Files)                |
| Settings     | Control Panel / Settings | GNOME Settings                  |
| Task Manager | Ctrl+Shift+Esc           | System Monitor                  |
> 💡 On Ubuntu, press the **Windows key** (called "Super" key on Linux) to open the Activities overview — this is your hub for launching apps and switching windows.

---

## Software & Apps

One of the biggest questions when switching: *"Can I still use my favourite apps?"*

### Apps That Work on Both ✅
These popular apps have native Linux versions:
- **Firefox** — pre-installed
- **Chrome / Chromium** — available
- **Spotify** — available
- **Discord** — available
- **Zoom** — available
- **VS Code** — available
- **VLC** — available
- **GIMP** (like Photoshop) — pre-installed on some distros
- **Steam** — available (with excellent Windows game compatibility via Proton)

### Windows App Alternatives on Linux

| Windows App          | Linux Alternative               | Notes                                   |
| -------------------- | ------------------------------- | --------------------------------------- |
| Microsoft Office     | **LibreOffice**                 | Free, compatible with .docx/.xlsx files |
| Microsoft Office     | **OnlyOffice**                  | Even more MS-compatible look            |
| Photoshop            | **GIMP**                        | Powerful but different workflow         |
| Notepad++            | **Kate** or **gedit**           | Both are excellent                      |
| Windows Media Player | **VLC**                         | Actually better!                        |
| Paint                | **Pinta**                       | Very similar                            |
| Outlook              | **Thunderbird**                 | Full-featured email client              |
| iTunes               | **Rhythmbox** or **Clementine** | Great music managers                    |
| 7-Zip                | **File Roller**                 | Built in to GNOME                       |
---

## The File System

This is one of the biggest differences! Windows and Linux organise files very differently.

### Windows File System
```
C:\
├── Users\
│   └── YourName\
│       ├── Documents\
│       ├── Downloads\
│       └── Desktop\
├── Program Files\
└── Windows\
```

### Linux File System
```
/
├── home/
│   └── yourname/
│       ├── Documents/
│       ├── Downloads/
│       └── Desktop/
├── usr/  (programs live here)
└── etc/  (settings live here)
```

**Key differences:**
- Linux uses **forward slashes** (`/`) not backslashes (`\`)
- There is **no C: drive** — everything is under `/` (called "root")
- Your personal files are in `/home/yourname/` — just like `C:\Users\YourName\`
- External drives appear under `/media/` or `/mnt/`

> 💡 In practice, you'll rarely need to think about this! File manager apps work just like Windows Explorer.

---

## Updates & Software Installation

### On Windows:
- Windows Update runs automatically in the background
- Software downloaded from websites as `.exe` installers
- Some apps have their own update systems (Chrome, Spotify, etc.)

### On Linux:
- One **unified update system** handles everything — the OS AND your apps
- Software installed from a central **App Store / Software Centre**
- Or using the terminal: `sudo apt install app-name`
- No more hunting for `.exe` files on random websites!

> 💡 This is actually a **big advantage** of Linux — one place to update everything, and software comes from trusted repositories (not random websites).

---

## Keyboard Shortcuts

Most shortcuts work the same! Here are the key differences:

| Action            | Windows        | Linux                  |
| ----------------- | -------------- | ---------------------- |
| Copy              | Ctrl+C         | Ctrl+C                 |
| Paste             | Ctrl+V         | Ctrl+V                 |
| Undo              | Ctrl+Z         | Ctrl+Z                 |
| Open app launcher | Windows key    | Super key              |
| Switch windows    | Alt+Tab        | Alt+Tab                |
| Take screenshot   | Windows+PrtScn | PrtScn or Shift+PrtScn |
| Open file manager | Windows+E      | Super+E (Ubuntu)       |
| Lock screen       | Windows+L      | Super+L                |
---

## Gaming on Linux

Linux gaming has improved dramatically in recent years, thanks largely to **Steam's Proton** compatibility layer.

- Over **80% of Steam games** work on Linux via Proton
- Check any game's Linux compatibility at [ProtonDB](https://www.protondb.com)
- Pop!_OS in particular has excellent gaming support with NVIDIA drivers

---

## Privacy & Telemetry

|                            | Windows           | Linux                |
| -------------------------- | ----------------- | -------------------- |
| Data collection            | Yes (significant) | Minimal or none      |
| Built-in ads               | Yes               | No                   |
| Forced updates             | Yes               | No — you choose when |
| Microsoft account required | Increasingly yes  | Never                |
| Open source                | No                | Yes                  |
