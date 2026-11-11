import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { JudiciaLogo } from '@/components/common/JudiciaLogo';
import { JudiciaColors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { LogOut, ShieldCheck } from 'lucide-react-native';

export default function ClientDashboardPlaceholder() {
    const { user, logout } = useAuth();
    const { isDark } = useTheme();

    const bgColor = isDark ? '#101110' : JudiciaColors.creamBg;
    const cardBg = isDark ? '#191B19' : '#FFFFFF';
    const textPrimary = isDark ? '#FFFFFF' : JudiciaColors.textDark;
    const textSecondary = isDark ? '#9A9E9A' : JudiciaColors.textMuted;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            {/* Header */}
            <View style={styles.header}>
                <JudiciaLogo variant="header" textColor={textPrimary} />
                <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.7}>
                    <LogOut size={18} color="#DC2626" />
                </TouchableOpacity>
            </View>

            {/* Welcome Card */}
            <View style={styles.content}>
                <View style={[styles.card, { backgroundColor: cardBg }]}>
                    <View style={styles.badgeRow}>
                        <ShieldCheck size={14} color={JudiciaColors.goldPrimary} />
                        <Text style={styles.badge}>SECURE CLIENT PORTAL</Text>
                    </View>
                    <Text style={[styles.welcomeTitle, { color: textPrimary }]}>
                        Welcome, {user?.full_name || 'Client'}!
                    </Text>
                    <Text style={[styles.emailText, { color: textSecondary }]}>
                        Signed in as: {user?.email}
                    </Text>
                    <Text style={[styles.roleText, { color: JudiciaColors.goldPrimary }]}>
                        Account Type: {user?.user_type} (Verified with Database)
                    </Text>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            ✅ Successfully authenticated with PostgreSQL Database!
                        </Text>
                        <Text style={styles.infoSubtext}>
                            Ready for Member 3 to connect Case Tracking & Lawyer Directory.
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 8,
    },
    logoutBtn: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    card: {
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    badge: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        color: JudiciaColors.goldPrimary,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 6,
    },
    emailText: {
        fontSize: 14,
        marginBottom: 4,
    },
    roleText: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
    },
    infoBox: {
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(22, 163, 74, 0.3)',
    },
    infoText: {
        fontSize: 13,
        color: '#16A34A',
        fontWeight: '700',
        lineHeight: 18,
        marginBottom: 4,
    },
    infoSubtext: {
        fontSize: 12,
        color: '#15803D',
        lineHeight: 16,
    },
});