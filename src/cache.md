# Maze OS — Cache & Storage Documentation

## Overview
Maze uses a simple JSON file (`macos-storage`) to persist user preferences and state.

## Storage Keys

| Key | Type | Description |
|-----|------|-------------|
| `setupComplete` | boolean | Whether first-time setup has been completed |
| `user.fullName` | string | User's full name |
| `user.username` | string | User's short username |
| `user.theme` | string | `'light'` or `'dark'` |
| `user.wallpaper` | string | Wallpaper ID (e.g. `'aurora'`, `'sonoma'`) |
| `user.country` | string | Selected country/region |
| `accentColor` | string | CSS color string for accent |
| `bootCount` | number | Number of times Maze has been booted |
| `createdAt` | string | ISO timestamp of initial setup |

## Wallpaper Options
- `aurora` — Dark blue/purple gradient
- `sonoma` — Warm orange/brown gradient  
- `sequoia` — Forest green gradient
- `ventura` — Ocean blue gradient
- `monterey` — Deep purple radial
- `bigsur` — Sunset orange/pink
- `midnight` — Near-black dark
- `cotton` — Light peachy gradient

## Cache Invalidation
The storage file is at `src/macos-storage`.  
Delete this file to reset Maze to first-boot state (setup wizard will run again).