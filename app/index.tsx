import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Animated,
    Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Circle } from 'react-native-svg';
import { JudiciaLogo } from '@/components/common/JudiciaLogo';
import { JudiciaColors } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
    const router = useRouter();

    // Subtle entrance fade-in animation
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.96)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, scaleAnim]);

    const handlePressOrContinue = () => {
        // When onboarding screens are ready in next step, this navigates to /onboarding
        router.push('/onboarding' as any);
    };

    return (
        <Pressable style={styles.container} onPress={handlePressOrContinue}>
            <StatusBar style="light" />

            {/* 1. Top-Right Gold Orbital Contour Lines */}
            <View style={styles.topRightContours} pointerEvents="none">
                <Svg width={260} height={260} viewBox="0 0 260 260">
                    <Circle
                        cx="240"
                        cy="20"
                        r="160"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="0.8"
                        strokeOpacity={0.25}
                        fill="none"
                    />
                    <Circle
                        cx="240"
                        cy="20"
                        r="210"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="0.6"
                        strokeOpacity={0.15}
                        fill="none"
                    />
                </Svg>
            </View>

            {/* 2. Bottom-Left Gold Orbital Contour Lines */}
            <View style={styles.bottomLeftContours} pointerEvents="none">
                <Svg width={260} height={260} viewBox="0 0 260 260">
                    <Circle
                        cx="20"
                        cy="240"
                        r="160"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="0.8"
                        strokeOpacity={0.25}
                        fill="none"
                    />
                    <Circle
                        cx="20"
                        cy="240"
                        r="210"
                        stroke={JudiciaColors.goldPrimary}
                        strokeWidth="0.6"
                        strokeOpacity={0.15}
                        fill="none"
                    />
                </Svg>
            </View>

            {/* 3. Center Luxury Judicia Emblem & Typography */}
            <Animated.View
                style={[
                    styles.centerContent,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <JudiciaLogo variant="splash" size={160} />
            </Animated.View>

            {/* 4. Bottom Tagline */}
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                    Built for Sri Lanka's legal community
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: JudiciaColors.forestGreen,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 50,
    },
    topRightContours: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    bottomLeftContours: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerContainer: {
        alignItems: 'center',
        paddingBottom: 24,
    },
    footerText: {
        fontSize: 12,
        letterSpacing: 1.2,
        color: 'rgba(255, 255, 255, 0.65)',
        fontWeight: '400',
    },
});