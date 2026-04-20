# Gaming on Linux

Linux gaming has never been better. Thanks to tools like **Steam Proton**, **Lutris**, and the incredible work of the open-source community, you can play thousands of Windows games on Linux without any fuss. 🎮

> 💡 **Fun fact:** The Steam Deck — Valve's hugely popular handheld gaming PC — runs Linux! This means game developers are increasingly ensuring their games work on Linux.

---

## Steam & Proton

**Steam** is the most popular gaming platform on Linux. Valve created **Proton**, a compatibility layer that lets Windows games run on Linux — and it works surprisingly well.

### Getting Started with Steam on Linux

1. Open your App Centre and search for **Steam**, or install via terminal:
   ```
   sudo apt install steam
   ```
2. Log into your Steam account
3. Enable Proton for all games:
   - Open Steam → **Settings** → **Compatibility**
   - Toggle on **"Enable Steam Play for all other titles"**
   - Select the latest **Proton** version from the dropdown
4. Install and play your games as normal!

### Checking Game Compatibility

Before buying or installing a game, check **ProtonDB** to see how well it runs on Linux:

> 🔗 [protondb.com](https://www.protondb.com) — search any game and see community ratings

| Rating       | What it means                     |
| ------------ | --------------------------------- |
| **Platinum** | Runs perfectly out of the box     |
| **Gold**     | Runs with minor tweaks            |
| **Silver**   | Runs with some issues             |
| **Bronze**   | Runs but has significant problems |
| **Borked**   | Does not run                      |
Most popular games are **Gold** or **Platinum** — including titles like Cyberpunk 2077, Elden Ring, GTA V, and thousands more.

---

## NVIDIA vs AMD on Linux

Your graphics card choice matters for Linux gaming:

### AMD (Recommended for Linux)
- Open-source drivers built directly into the Linux kernel
- **No extra drivers needed** — just install and play
- Excellent Vulkan support for modern games

### NVIDIA
- Requires installing proprietary drivers
- **Pop!_OS** handles this automatically with its special NVIDIA ISO
- On Ubuntu: `sudo ubuntu-drivers autoinstall`
- Performance is excellent once set up

---

## Non-Steam Games: Lutris

**Lutris** is a game manager for Linux that helps you install and run games from:
- GOG
- Epic Games Store
- Battle.net (World of Warcraft, Overwatch)
- Origin / EA App
- Itch.io
- And many more!

Install Lutris:
```
sudo apt install lutris
```

Then visit [lutris.net](https://lutris.net), search for your game, and click the one-click install button.

---

## Heroic Games Launcher

For **Epic Games** and **GOG** libraries, **Heroic** is the best native Linux client:

1. Download from [heroicgameslauncher.com](https://heroicgameslauncher.com)
2. Log in with your Epic or GOG account
3. Install and play your library with Proton

---

## Gaming Performance Tips

- **Keep your GPU drivers updated** — new driver versions often improve game performance
- **Use the latest Proton version** — or try **Proton-GE** (community version) for broader compatibility
- **Enable GameMode**: `sudo apt install gamemode` — boosts CPU performance during gaming
- **Use Vulkan** over OpenGL when games offer the choice — better Linux performance
- **Check for native Linux versions** — many games have them and perform better than Proton

---

## Popular Games That Work Great on Linux

| Game             | Rating   | Notes                       |
| ---------------- | -------- | --------------------------- |
| Counter-Strike 2 | Native   | Official Linux support      |
| Dota 2           | Native   | Official Linux support      |
| Cyberpunk 2077   | Platinum | Runs excellently via Proton |
| Elden Ring       | Gold     | Minor tweaks needed         |
| Stardew Valley   | Native   | Perfect on Linux            |
| Minecraft (Java) | Native   | Runs natively               |
| GTA V            | Gold     | Works well via Proton       |
| Hollow Knight    | Native   | Official Linux support      |
| Hades            | Native   | Official Linux support      |
| The Witcher 3    | Platinum | Excellent via Proton        |
---

## What Doesn't Work

Some games won't run on Linux — mainly those with aggressive **anti-cheat software** that requires deep Windows integration:

- **Valorant** (Vanguard anti-cheat — kernel level, Windows only)
- **PUBG** (limited support)
- Some older games with old DRM systems

Always check ProtonDB before purchasing a game you plan to play on Linux.
