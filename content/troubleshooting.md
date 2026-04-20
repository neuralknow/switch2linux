# Troubleshooting

Ran into a snag? Don't worry — almost every problem you'll encounter has been solved by someone in the Linux community. Here's how to find help fast! 🔧

---

## The Golden Rule: Search First!

Before anything else, **copy your error message** and paste it into Google (or DuckDuckGo). Add "Ubuntu" or "Pop!_OS" to your search. You'll almost always find a forum post with the answer.

Example search: `"No sound after Ubuntu 24.04 install NVIDIA"`

---

## Common Problems & Fixes

### 🔇 No Sound
1. Click the sound icon in the top bar → make sure volume isn't muted
2. Go to **Settings → Sound** and check the output device is correct
3. In a terminal, run: `sudo apt install --reinstall alsa-base pulseaudio`
4. Restart your computer

### 📶 Wi-Fi Not Working
1. Make sure Wi-Fi is enabled: **Settings → Wi-Fi** → toggle on
2. Try: `sudo service network-manager restart`
3. If your Wi-Fi adapter isn't recognised, you may need to install drivers — search for your adapter model + "Ubuntu driver"

### 🖥️ Screen Resolution Wrong
1. Go to **Settings → Displays**
2. Select your monitor and choose the correct resolution
3. Click **Apply**

If your resolution isn't listed:
```bash
xrandr --newmode "1920x1080_60.00" ...
```
(Search for your exact resolution + "xrandr Ubuntu" for the full command)

### 💾 App Won't Install
Try updating your package list first:
```bash
sudo apt update
sudo apt install [app-name]
```
If still failing, search the exact error message online.

### 🖨️ Printer Not Working
1. Go to **Settings → Printers → Add Printer**
2. If not found, search `[Printer Brand Model] Ubuntu driver`
3. Most HP printers: `sudo apt install hplip hplip-gui`
4. Most Canon/Epson: visit manufacturer's website for a Linux driver package

### 🐌 System Running Slowly
1. Open **System Monitor** (search in app launcher)
2. Check the **CPU** and **Memory** tabs for processes using too many resources
3. If a process seems stuck, right-click it → **Kill Process**
4. Consider installing `htop` for a better terminal-based monitor: `sudo apt install htop`

### 🔒 Forgot Sudo Password
Your "sudo" password is the same as your login password. If you've forgotten your login password, you'll need to reset it from the recovery mode — search "Ubuntu reset password recovery mode" for a step-by-step guide.

### 📺 Screen Goes Black on Boot
This is often a graphics driver issue. Try:
1. Boot into recovery mode (hold Shift during startup, select recovery)
2. Choose "root" access
3. Run: `sudo ubuntu-drivers autoinstall`
4. Reboot

---

## How to Get Help

If you can't fix it yourself, the Linux community is incredibly welcoming! Here are the best places to ask:

### Reddit
- **r/linux4noobs** — perfect for beginners, very patient community
- **r/Ubuntu** — Ubuntu-specific help
- **r/pop_os** — Pop!_OS specific help

### Forums
- **Ask Ubuntu** — [askubuntu.com](https://askubuntu.com) — Stack Overflow-style Q&A
- **Ubuntu Forums** — [ubuntuforums.org](https://ubuntuforums.org)
- **System76 Community** — [community.system76.com](https://community.system76.com) (for Pop!_OS)

### When Asking for Help, Include:
1. What you were trying to do
2. What happened (exact error message)
3. Your distro and version (run `lsb_release -a` in terminal)
4. What you've already tried

> 💡 The Linux community is one of the friendliest tech communities online. Don't be afraid to ask — everyone was a beginner once!

---

## Reading Error Messages

Error messages can look scary but they usually tell you exactly what's wrong. Key things to look for:

- **"Permission denied"** → You need to add `sudo` before your command
- **"Package not found"** → Run `sudo apt update` first, or the package has a different name
- **"No such file or directory"** → Check your spelling and that the file exists
- **"Command not found"** → The program isn't installed, install it with `sudo apt install [name]`

---

## Terminal Cheat Sheet

| Command                   | What it does                 |
| ------------------------- | ---------------------------- |
| `sudo apt update`         | Refresh package list         |
| `sudo apt upgrade`        | Install available updates    |
| `sudo apt install [name]` | Install a package            |
| `sudo apt remove [name]`  | Remove a package             |
| `ls`                      | List files in current folder |
| `cd [folder]`             | Change directory             |
| `pwd`                     | Show current directory       |
| `df -h`                   | Show disk space              |
| `free -h`                 | Show memory usage            |
| `reboot`                  | Restart the computer         |
