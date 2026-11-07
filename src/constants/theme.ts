/**
 * Judicia Brand Theme Tokens
 * Matches Sri Lanka Legal Platform styling:
 * - Forest Green & Imperial Gold for Splash Screen
 * - Warm Cream/Ivory & Dark Charcoal for Onboarding screens
 */

export const JudiciaColors = {
    // Primary Luxury Brand Colors
    forestGreen: '#14291F',      // Deep green splash & card background
    forestGreenDark: '#0E1F17',  // Deep shadow green
    forestCard: '#1B3628',       // Slightly lighter green for illustration cards
    cardBorder: 'rgba(255, 255, 255, 0.12)',

    // Gold Accents
    goldPrimary: '#C9A15A',      // Pure Judicia emblem & accent gold
    goldLight: '#E2CA92',        // Date badge gold
    goldMuted: '#9B8148',        // Category tags
    goldBadgeBg: '#D1AC68',      // Floating checkmark badge

    // Onboarding Backgrounds & Surfaces
    creamBg: '#FAF7F2',          // Warm ivory onboarding background
    surfaceWhite: '#FFFFFF',     // Floating notification card
    cardShadow: 'rgba(20, 41, 31, 0.18)',

    // Typography Colors
    textDark: '#171A18',         // Headlines & Primary text
    textMuted: '#6B726C',        // Subtitles & descriptions
    textGold: '#C9A15A',         // Tags & accents
    textWhite: '#FFFFFF',        // Splash text & dark card text
    textLightMuted: '#A3B4AB',   // Muted card details

    // Controls & Navigation
    buttonDark: '#161917',       // "Continue →" & "Get started →" buttons
    buttonDarkPressed: '#2A2E2C',
    indicatorActive: '#C9A15A',  // Active pagination pill
    indicatorInactive: '#DCD8D0',// Inactive pagination dot
};

export const JudiciaTypography = {
    titleSerif: {
        fontSize: 32,
        lineHeight: 38,
        fontWeight: '700' as const,
        color: JudiciaColors.textDark,
    },
    bodyRegular: {
        fontSize: 15,
        lineHeight: 22,
        color: JudiciaColors.textMuted,
    },
    tagUpper: {
        fontSize: 11,
        letterSpacing: 2,
        fontWeight: '700' as const,
        textTransform: 'uppercase' as const,
        color: JudiciaColors.textGold,
    },
};