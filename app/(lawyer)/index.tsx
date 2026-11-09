import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { JudiciaLogo } from '@/components/common/JudiciaLogo';
import { JudiciaColors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { LogOut, ShieldCheck, UserCheck, Code } from 'lucide-react-native';

/**
 * ============================================================================
 * LAWYER HOME PAGE (BLANK CANVAS FOR TEAM MEMBERS)
 * ============================================================================
 * This screen is the landing destination after successful Lawyer authentication.
 * Other team members can replace the placeholder container below with the full
 * Lawyer Dashboard, bottom navigation tabs, or custom feature widgets.
 */
export default function LawyerHomeScreen() {
    const { user, logout } = useAuth();
    const { isDark } = useTheme();

    const bgColor = isDark ? '#101110' : JudiciaColors.creamBg;
    const cardBg = isDark ? '#191B19' : '#FFFFFF';
    const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : '#EFECE6';
    const textPrimary = isDark ? '#FFFFFF' : JudiciaColors.textDark;
    const textSecondary = isDark ? '#9A9E9A' : JudiciaColors.textMuted;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            {/* Top Navigation Bar: Brand Logo & Working Logout */}
            <View style={styles.header}>
                <JudiciaLogo variant="header" textColor={textPrimary} />
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={logout}
                    activeOpacity={0.7}
                    accessibilityLabel="Log out of Lawyer Portal"
                >
                    <LogOut size={16} color="#DC2626" />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. Verified Auth Status Card */}
                <View style={[styles.authCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
                    <View style={styles.statusBadgeRow}>
                        <View style={styles.verifiedPill}>
                            <ShieldCheck size={13} color="#16A34A" />
                            <Text style={styles.verifiedText}>AUTHENTICATED LAWYER SESSION</Text>
                        </View>
                    </View>

                    <Text style={[styles.welcomeTitle, { color: textPrimary }]}>
                        Welcome, {user?.full_name || 'Counsel'}!
                    </Text>

                    <View style={styles.metaRow}>
                        <UserCheck size={14} color={JudiciaColors.goldPrimary} />
                        <Text style={[styles.metaText, { color: textSecondary }]}>
                            {user?.email}
                        </Text>
                    </View>

                    <View style={styles.roleRow}>
                        <Text style={styles.roleLabel}>Verified Role:</Text>
                        <Text style={styles.roleValue}>{user?.user_type || 'LAWYER'}</Text>
                    </View>
                </View>

                {/* 2. Team Member Canvas / Placeholder Area */}
                <View style={[styles.blankCanvasCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
                    <View style={styles.canvasIconRow}>
                        <Code size={22} color={JudiciaColors.goldPrimary} />
                        <Text style={styles.canvasHeader}>TEAM WORKSPACE CANVAS</Text>
                    </View>

                    <Text style={[styles.canvasTitle, { color: textPrimary }]}>
                        Lawyer Home (Ready for UI Development)
                    </Text>

                    <Text style={[styles.canvasDescription, { color: textSecondary }]}>
                        Lawyer authentication is fully verified and connected to the Next.js API & PostgreSQL database.
                        Team members can now implement the full lawyer dashboard, tabs, or case docket views in this workspace.
                    </Text>

                    <View style={styles.dashedBox}>
                        <Text style={styles.dashedBoxTitle}>Developer Note for Team:</Text>
                        <Text style={styles.dashedBoxText}>
                            File location: app/(lawyer)/index.tsx{'\n'}
                            Available context: useAuth() provides user, token, logout
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 10,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
    },
    logoutText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#DC2626',
    },
    scrollContent: {
        padding: 20,
        gap: 18,
    },
    authCard: {
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statusBadgeRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    verifiedPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'rgba(22, 163, 74, 0.12)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    verifiedText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        color: '#16A34A',
    },
    welcomeTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    metaText: {
        fontSize: 13,
    },
    roleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    roleLabel: {
        fontSize: 12,
        color: '#8A918B',
        fontWeight: '500',
    },
    roleValue: {
        fontSize: 12,
        fontWeight: '700',
        color: JudiciaColors.goldPrimary,
        letterSpacing: 0.5,
    },
    blankCanvasCard: {
        borderRadius: 16,
        padding: 22,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    canvasIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    canvasHeader: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        color: JudiciaColors.goldPrimary,
    },
    canvasTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    canvasDescription: {
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 18,
    },
    dashedBox: {
        borderWidth: 1,
        borderColor: 'rgba(201, 161, 90, 0.35)',
        borderStyle: 'dashed',
        borderRadius: 10,
        padding: 14,
        backgroundColor: 'rgba(201, 161, 90, 0.05)',
    },
    dashedBoxTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: JudiciaColors.goldPrimary,
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    dashedBoxText: {
        fontSize: 12,
        lineHeight: 18,
        color: '#8A918B',
        fontFamily: 'SpaceMono',
    },
});

