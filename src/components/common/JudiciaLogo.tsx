import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, G, Path } from 'react-native-svg';
import { JudiciaColors } from '@/constants/theme';

interface JudiciaLogoProps {
    variant?: 'splash' | 'header' | 'icon-only';
    size?: number;
    showTagline?: boolean;
    textColor?: string;
}

export const JudiciaLogo: React.FC<JudiciaLogoProps> = ({
    variant = 'splash',
    size = 140,
    showTagline = true,
    textColor,
}) => {
    if (variant === 'header') {
        // Compact logo for top bar of Onboarding screens
        return (
            <View style={styles.headerContainer}>
                <Svg width={30} height={30} viewBox="0 0 40 40">
                    <Circle
                        cx="20"
                        cy="20"
                        r="18"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="1.5"
                        fill="none"
                    />
                    {/* Serif "J" */}
                    <Path
                        d="M 23 13 L 23 23 C 23 26 21 28 18 28 C 15.5 28 14 26.5 14 24.5 M 20 13 L 26 13"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </Svg>
                <Text style={styles.headerText}>JUDICIA</Text>
            </View>
        );
    }

    // Full Luxury Diamond Emblem for Splash Screen
    return (
        <View style={styles.splashContainer}>
            <Svg width={size} height={size} viewBox="0 0 160 160">
                <G transform="translate(80, 80)">
                    {/* Outer Rotated Diamond */}
                    <Rect
                        x="-54"
                        y="-54"
                        width="108"
                        height="108"
                        transform="rotate(45)"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="1.2"
                        strokeOpacity={0.6}
                        fill="none"
                    />

                    {/* Inner Rotated Diamond */}
                    <Rect
                        x="-44"
                        y="-44"
                        width="88"
                        height="88"
                        transform="rotate(45)"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="1.6"
                        fill="none"
                    />

                    {/* Center Circle */}
                    <Circle
                        cx="0"
                        cy="0"
                        r="28"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="1.8"
                        fill="none"
                    />

                    {/* Center Elegant Serif "J" */}
                    <Path
                        d="M 4 -12 L 4 6 C 4 11 1 14 -4 14 C -8 14 -11 11.5 -11 8 M -1 -12 L 9 -12"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </G>
            </Svg>

            {variant === 'splash' && (
                <View style={styles.textBlock}>
                    <Text style={styles.splashTitle}>JUDICIA</Text>
                    {showTagline && (
                        <Text style={styles.splashSubtitle}>LEGAL PRACTICE, CLEARLY MANAGED</Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlock: {
        alignItems: 'center',
        marginTop: 24,
    },
    splashTitle: {
        fontSize: 26,
        fontWeight: '700',
        letterSpacing: 8,
        color: JudiciaColors.textWhite,
    },
    splashSubtitle: {
        marginTop: 10,
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 3,
        color: JudiciaColors.goldPrimary,
        textTransform: 'uppercase',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 4,
        color: JudiciaColors.textDark,
    },
});