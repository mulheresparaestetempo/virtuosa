# UI Specifications

Visual design system and component specifications for Abba Virtuosa.

## Design System Overview

Complete design token system defined in `packages/design_system/`:

### Colors

**Primary Palette:**
- Bordo (Burgundy) - `#8B3A3A` - Primary actions and emphasis
- Dourado (Gold) - `#C4A87A` - Secondary actions and accents
- Rosé (Rose) - `#D89BB7` - Tertiary and highlights

**Semantic Colors:**
- Success - `#4CAF50`
- Warning - `#FF9800`
- Error - `#F44336`
- Info - `#2196F3`
- Neutral - `#9E9E9E`

### Typography

**Font Families:**
1. **Playfair Display** (Serif)
   - Use: Headers, titles, elegant text
   - Weights: Regular (400), Bold (700)

2. **Cormorant Garamond** (Serif)
   - Use: Display text, quotes
   - Weights: Regular (400), Bold (700)

3. **Poppins** (Sans-serif)
   - Use: Body text, UI elements
   - Weights: Regular (400), SemiBold (600), Bold (700)

4. **Inter** (Sans-serif)
   - Use: System text, code
   - Weights: Regular (400), SemiBold (600), Bold (700)

**Type Hierarchy:**
- Display - 40px (Playfair Display)
- Heading 1 - 28px (Playfair Display)
- Heading 2 - 24px (Cormorant Garamond)
- Body Large - 18px (Poppins)
- Body Regular - 16px (Poppins)
- Body Small - 14px (Inter)
- Label - 12px (Poppins)

### Spacing

**Scale (8px base):**
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

### Shadows (Material Design)

**Elevation System:**
- Elevation 1: 0 1px 3px rgba(0,0,0,0.12)
- Elevation 2: 0 3px 6px rgba(0,0,0,0.16)
- Elevation 3: 0 10px 20px rgba(0,0,0,0.19)
- Elevation 4: 0 15px 25px rgba(0,0,0,0.25)

### Border Radius

Default: 12px (App-wide)
Variants:
- sm: 4px
- md: 8px
- lg: 16px
- Full: 9999px

## Component Specifications

See `components/` for:
- Button specifications
- Card patterns
- Form inputs
- Navigation components
- Modal dialogs
- Lists and grids

## Spacing Rules

See `spacing/` for:
- Padding guidelines
- Margin patterns
- Gap specifications
- Alignment rules

## Color Usage

See `colors/` for:
- Color contrast ratios
- Semantic usage
- Accessibility compliance
- Dark mode variants

## State Variants

All components support:
- Default state
- Hover state
- Active/pressed state
- Disabled state
- Error state
- Loading state

## Responsive Design

**Breakpoints:**
- Mobile: 0 - 479px
- Tablet: 480 - 1023px
- Desktop: 1024px+

**Strategy:**
- Mobile-first design
- Flexible layouts
- Touch-friendly targets (48x48px minimum)
- Landscape support

## Animation Guidelines

**Durations:**
- Quick: 150ms (micro-interactions)
- Standard: 300ms (state changes)
- Slow: 500ms (major transitions)

**Easing:**
- In: cubic-bezier(0.4, 0, 1, 1)
- Out: cubic-bezier(0, 0, 0.2, 1)
- InOut: cubic-bezier(0.4, 0, 0.2, 1)

## Dark Mode

Light and dark themes available:
- Automatically follows system preference
- Manual override in settings
- All components support both themes

---

For implementation, see `packages/design_system/` and `packages/ui_components/`.
For component library, see `packages/ui_components/lib/src/`.
