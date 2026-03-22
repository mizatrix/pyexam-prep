# PyExam Prep Design System

## 1. Brand Identity
- **Name**: PyExam Prep
- **Purpose**: Interactive Python exam preparation for BIS students
- **Tone**: Professional, educational, encouraging

## 2. Color Palette
| Role | Name | Hex |
|------|------|-----|
| Background | Deep Navy | `#0a0f1e` |
| Surface | Dark Charcoal | `#111827` |
| Surface Light | Slate | `#1a2235` |
| Primary | Electric Cyan | `#00d2ff` |
| Primary Dim | Ocean Blue | `#0099cc` |
| Secondary | Royal Blue | `#3b82f6` |
| Accent | Purple | `#8b5cf6` |
| Success | Emerald | `#10b981` |
| Danger | Red | `#ef4444` |
| Warning | Amber | `#f59e0b` |
| Text | Snow White | `#ebedfb` |
| Text Dim | Grey | `#9ca3af` |
| Border | Cyan Glass | `rgba(114, 220, 255, 0.15)` |

## 3. Typography
- **Headline**: Inter (Black, Bold)
- **Body**: Inter (Regular, Light)
- **Code**: JetBrains Mono

## 4. Component Styles
- **Cards**: Glassmorphism — `background: rgba(17, 24, 39, 0.7)`, `backdrop-filter: blur(20px)`, subtle cyan border
- **Buttons**: Gradient primary (cyan→blue), glow shadow on hover
- **Roundness**: `border-radius: 0.75rem` (cards), `1rem` (large), `0.5rem` (small)
- **Shadows**: `0 0 20px rgba(0, 210, 255, 0.3)` for glow effects

## 5. Animations
- Fade-in on scroll (0.6s ease-out)
- Slide-up entrance (0.5s)
- Pulse glow on CTAs (2s infinite)
- Float effect on decorative elements (6s infinite)

## 6. Design System Notes for Stitch Generation

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first (responsive)
- Palette: Deep Navy (#0a0f1e background), Electric Cyan (#00d2ff primary), Royal Blue (#3b82f6 secondary), Emerald (#10b981 success), Red (#ef4444 danger)
- Typography: Inter for all text, JetBrains Mono for code
- Styles: 0.75rem border-radius, glassmorphism cards with blur(20px), subtle cyan borders, glow shadows
- Atmosphere: Dark, premium, tech-forward, educational
