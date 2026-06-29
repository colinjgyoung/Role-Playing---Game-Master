# Role Playing — Game Master (Language RPG)

A single-purpose, browser-based facilitation tool for **workplace English training through role-play**. The trainer runs as Game Master; a six-sided die drives what happens in the story; the trainer drives the language coaching. Built for live Microsoft Teams sessions — no login, no install.

**The principle:** the die decides the *fiction* (how the world reacts), the trainer decides the *language* (the upgrade). A bad roll changes the story — it never ends it.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The GM Console — page structure |
| `style.css` | All styling |
| `script.js` | Scenarios, phrase banks, GM prep kit, dice, timer, Player View |

Open `index.html` in any modern browser, or publish via GitHub Pages (below).

## What it does

- **Pick one target function per game** (delegating without authority, handling pushback, justifying, softening a hard message, escalating, clarifying).
- **B1 / C1 toggle** — swaps phrase support between scaffolded (B1) and judgement-focused (C1).
- **Realistic / Fantasy toggle** — same skill, reskinned. Fantasy lowers anxiety; realistic transfers straight to work.
- **Graded d6** — 1 = total fail → 6 = total success, with a "how to scale it" prompt for each result.
- **GM prep drawer** — your private improv kit: who you play (with yes/no triggers), a complication bank, upgrade triggers, fallbacks and a landing cue.
- **Player View** — a separate clean window you screen-share (scene text + image + optional phrases). Your console stays private.
- **Capture box** — copies best lines + transfer notes for OneNote.
- **Countdown timer** — forces a clean close.

## Privacy

- **Participant names are session-only** — typed into the "Players this session" field, never saved, cleared on reload, and excluded from the Capture export.
- Keep real participant names out of any committed files.

## Running it live (Teams)

Share the **Player View window only** — never the console (it holds the GM prep and dice). Microsoft Teams lets you share a single window, so your cockpit stays invisible to participants.

## Publishing with GitHub Pages

1. Push this repo to GitHub.
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Branch: **main**, folder: **/ (root)**. Save.
5. Wait ~1 minute; your site appears at `https://<your-username>.github.io/<repo-name>/`.

Because the files sit in the repo root and the entry point is `index.html`, it serves with no extra configuration.
