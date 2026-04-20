# Installation Guide

Installing Linux is easier than you might think! This guide walks you through every step. Don't worry — you won't lose your Windows installation unless you choose to. 🙌

> ⚠️ **Before you start:** Back up any important files to an external drive or cloud storage. This is good practice before any major system change.

---

## What You'll Need

- 💾 A USB drive (at least **8 GB**)
- 💻 The computer you want to install Linux on
- 🌐 An internet connection to download the ISO file
- ⏱️ About **1–2 hours** of your time

---

## Step 1 — Download the ISO

An ISO file is like a digital DVD of the operating system.

1. Choose your distro:
   - **Ubuntu:** [ubuntu.com/download/desktop](https://ubuntu.com/download/desktop) — click the big green download button
   - **Pop!_OS:** [pop.system76.com](https://pop.system76.com) — choose NVIDIA or Intel/AMD based on your graphics card
2. Save the `.iso` file somewhere easy to find (like your Desktop)

> 💡 The download will be around 2–4 GB, so it may take a while depending on your internet speed.

---

## Step 2 — Create a Bootable USB

We'll use a free tool called **Balena Etcher** to put the ISO onto your USB drive.

1. Download Etcher from [balena.io/etcher](https://etcher.balena.io) and install it
2. Plug in your USB drive
3. Open Etcher
4. Click **"Flash from file"** and select your downloaded ISO
5. Click **"Select target"** and choose your USB drive
6. Click **"Flash!"** and wait for it to finish (5–10 minutes)

> ⚠️ **Warning:** This will erase everything on the USB drive. Make sure there's nothing important on it first!

---

## Step 3 — Boot from the USB

Now we need to tell your computer to start from the USB drive instead of Windows.

1. **Shut down** your computer completely
2. Plug in your USB drive
3. Turn your computer back on and **immediately press** the boot key:

| Computer Brand | Boot Key     |
| -------------- | ------------ |
| Dell           | F12          |
| HP             | F9 or Esc    |
| Lenovo         | F12 or Enter |
| ASUS           | F8 or Esc    |
| Acer           | F12          |
| Generic PC     | F11 or Del   |
4. A menu will appear — select your USB drive from the list
5. Your computer will boot into the **Linux live environment** 🎉

> 💡 **Live environment:** This lets you try Linux without installing it. Nothing on your computer is changed until you click "Install".

---

## Step 4 — Try Before You Install (Optional but Recommended)

Once you've booted from the USB, you'll see an option to **"Try Ubuntu"** or **"Try Pop!_OS"**. We strongly recommend doing this first!

- Check that your Wi-Fi, keyboard, trackpad, and sound work
- Browse the desktop and get a feel for the interface
- Make sure everything looks good before committing to the install

---

## Step 5 — Install Linux

When you're ready to install:

1. Double-click the **"Install"** icon on the desktop
2. Follow the on-screen wizard:
   - Choose your language
   - Connect to Wi-Fi (recommended)
   - Choose your keyboard layout
3. When asked about installation type, choose one of:

### Option A: Install alongside Windows (Dual Boot) ✅ Recommended for beginners
Linux and Windows will both be installed. Every time you start your computer, you'll choose which one to boot into. This is the safest option.

### Option B: Erase disk and install Linux
This removes Windows completely. Only do this if you're sure you want to fully switch.

4. Create your username and password
5. Click **Install** and wait (usually 10–20 minutes)
6. When done, click **Restart** and remove the USB drive when prompted

---

## Step 6 — First Boot 🚀

Welcome to Linux! On your first boot:

- Run the **welcome screen** setup wizard
- Connect to Wi-Fi if you haven't already
- Run system updates: open a terminal and type:
  ```
  sudo apt update && sudo apt upgrade
  ```
- Restart your computer after updates

> 💡 Don't be scared of the terminal! `sudo apt update` just means "check for updates" and `sudo apt upgrade` means "install them". You'll only need this occasionally.

---

## Something Went Wrong?

Check the [Troubleshooting](#troubleshooting) section, or head to the community links in the footer — the Linux community is extremely helpful!
