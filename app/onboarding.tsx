import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { JudiciaLogo } from '@/components/common/JudiciaLogo';
import { JudiciaColors } from '@/constants/theme';
import { Check, MessageSquare, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
    id: string;
    tag: string;
    title: string;
    description: string;
    buttonText: string;
}

const SLIDES: OnboardingSlide[] = [
    {
        id: 'attorney',
        tag: 'FOR ATTORNEYS-AT-LAW',
        title: 'Your practice,\nalways in hand.',
        description:
            'Stay ahead of hearings, deadlines, client requests and case activity—wherever your work takes you.',
        buttonText: 'Continue',
    },
    {
        id: 'client',
        tag: 'FOR CLIENTS',
        title: 'Clarity at every\nstep of your matter.',
        description:
            'Understand what happens next, share requested documents and stay connected with your lawyer.',
        buttonText: 'Get started',
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        if (activeIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: activeIndex + 1,
                animated: true,
            });
            setActiveIndex(activeIndex + 1);
        } else {
            // Finished onboarding -> Hand off to auth flow
            router.push('/(auth)' as any);
        }
    };

    const handleSkip = () => {
        router.push('/(auth)' as any);
    };

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollX / width);
        if (index !== activeIndex && index >= 0 && index < SLIDES.length) {
            setActiveIndex(index);
        }
    };

    // Render Slide 1 Card: Upcoming Hearing for Attorneys
    const renderAttorneyCard = () => (
        <View style={styles.cardContainer}>
            <View style={styles.darkGreenCard}>
                <View style={styles.hearingRow}>
                    {/* Gold Date Box */}
                    <View style={styles.dateBadge}>
                        <Text style={styles.dateMonth}>AUG</Text>
                        <Text style={styles.dateDay}>18</Text>
                    </View>
                    {/* Hearing Details */}
                    <View style={styles.hearingInfo}>
                        <Text style={styles.hearingSubtitle}>UPCOMING HEARING</Text>
                        <Text style={styles.hearingTitle}>Estate Dispute & Inheritance</Text>
                        <Text style={styles.hearingCourt}>District Court of Colombo • 9:30 AM</Text>
                    </View>
                </View>

                {/* Floating Checkmark Badge */}
                <View style={styles.checkBadge}>
                    <Check size={16} color="#FFFFFF" strokeWidth={3} />
                </View>
            </View>
        </View>
    );

    // Render Slide 2 Card: Case Progress for Clients
    const renderClientCard = () => (
        <View style={styles.cardContainer}>
            <View style={styles.darkGreenCard}>
                <Text style={styles.progressLabel}>YOUR CASE PROGRESS</Text>
                {/* Progress Step Bar */}
                <View style={styles.progressBarRow}>
                    <View style={[styles.progressSegment, styles.progressSegmentFilled]} />
                    <View style={[styles.progressSegment, styles.progressSegmentFilled]} />
                    <View style={[styles.progressSegment, styles.progressSegmentActive]} />
                    <View style={styles.progressSegment} />
                </View>
                <Text style={styles.caseStageTitle}>Evidence & documents</Text>
                <Text style={styles.caseStageDesc}>Your lawyer is preparing the next step.</Text>

                {/* Floating White Chat Notification Pill */}
                <View style={styles.notificationPill}>
                    <View style={styles.chatIconWrapper}>
                        <MessageSquare size={14} color="#14291F" />
                    </View>
                    <View style={styles.notificationTextCol}>
                        <Text style={styles.notifSender}>John Perera</Text>
                        <Text style={styles.notifMsg}>Your hearing is confirmed.</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Top Header: Judicia Logo + Skip */}
            <View style={styles.header}>
                <JudiciaLogo variant="header" />
                <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Center Carousel */}
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => (
                    <View style={styles.slide}>
                        {/* Visual Illustrated Card */}
                        {index === 0 ? renderAttorneyCard() : renderClientCard()}

                        {/* Typography Content */}
                        <View style={styles.textSection}>
                            <Text style={styles.tagText}>{item.tag}</Text>
                            <Text style={styles.titleText}>{item.title}</Text>
                            <Text style={styles.descText}>{item.description}</Text>
                        </View>
                    </View>
                )}
            />

            {/* Bottom Controls: Indicators + Action Button */}
            <View style={styles.bottomBar}>
                {/* Pagination Dots */}
                <View style={styles.paginationRow}>
                    {SLIDES.map((_, idx) => (
                        <View
                            key={idx}
                            style={[
                                styles.indicator,
                                activeIndex === idx ? styles.indicatorActive : styles.indicatorInactive,
                            ]}
                        />
                    ))}
                </View>

                {/* Action Button: "Continue →" or "Get started →" */}
                <TouchableOpacity
                    style={styles.actionButton}
                    activeOpacity={0.85}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>{SLIDES[activeIndex].buttonText}</Text>
                    <ArrowRight size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: JudiciaColors.creamBg,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 8,
    },
    skipText: {
        fontSize: 14,
        color: JudiciaColors.textMuted,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    slide: {
        width: width,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        height: 230,
    },
    darkGreenCard: {
        width: '100%',
        backgroundColor: JudiciaColors.forestGreen,
        borderRadius: 16,
        padding: 22,
        shadowColor: JudiciaColors.forestGreenDark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 18,
        elevation: 8,
        position: 'relative',
        transform: [{ rotate: '-2deg' }],
    },
    hearingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    dateBadge: {
        backgroundColor: JudiciaColors.goldBadgeBg,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateMonth: {
        fontSize: 10,
        fontWeight: '700',
        color: '#3B290A',
        letterSpacing: 1,
    },
    dateDay: {
        fontSize: 22,
        fontWeight: '800',
        color: '#241904',
    },
    hearingInfo: {
        flex: 1,
    },
    hearingSubtitle: {
        fontSize: 10,
        letterSpacing: 1.5,
        color: JudiciaColors.goldPrimary,
        fontWeight: '700',
        marginBottom: 4,
    },
    hearingTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    hearingCourt: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    checkBadge: {
        position: 'absolute',
        right: -10,
        bottom: -10,
        backgroundColor: JudiciaColors.goldBadgeBg,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: JudiciaColors.creamBg,
        elevation: 4,
    },
    progressLabel: {
        fontSize: 10,
        letterSpacing: 1.5,
        fontWeight: '700',
        color: JudiciaColors.goldPrimary,
        marginBottom: 8,
    },
    progressBarRow: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 12,
    },
    progressSegment: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    progressSegmentFilled: {
        backgroundColor: JudiciaColors.goldPrimary,
    },
    progressSegmentActive: {
        backgroundColor: JudiciaColors.goldLight,
    },
    caseStageTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    caseStageDesc: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    notificationPill: {
        position: 'absolute',
        left: 20,
        bottom: -22,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    chatIconWrapper: {
        backgroundColor: '#F0ECE1',
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationTextCol: {
        justifyContent: 'center',
    },
    notifSender: {
        fontSize: 12,
        fontWeight: '700',
        color: JudiciaColors.textDark,
    },
    notifMsg: {
        fontSize: 11,
        color: JudiciaColors.textMuted,
    },
    textSection: {
        marginTop: 20,
    },
    tagText: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 2,
        color: JudiciaColors.goldMuted,
        marginBottom: 10,
    },
    titleText: {
        fontSize: 32,
        lineHeight: 38,
        fontWeight: '700',
        color: JudiciaColors.textDark,
        marginBottom: 12,
    },
    descText: {
        fontSize: 14,
        lineHeight: 22,
        color: JudiciaColors.textMuted,
    },
    bottomBar: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        gap: 20,
    },
    paginationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    indicator: {
        height: 6,
        borderRadius: 3,
    },
    indicatorActive: {
        width: 24,
        backgroundColor: JudiciaColors.goldPrimary,
    },
    indicatorInactive: {
        width: 6,
        backgroundColor: JudiciaColors.indicatorInactive,
    },
    actionButton: {
        backgroundColor: JudiciaColors.buttonDark,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 18,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});