import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { JudiciaLogo } from '@/components/common/JudiciaLogo';
import { JudiciaColors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Briefcase, User as UserIcon, Moon, Sun, ArrowRight } from 'lucide-react-native';

export default function WelcomePortalScreen() {
    const router = useRouter();
    const { selectedPortalRole, setSelectedPortalRole } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    const handleContinue = () => {
        router.push({
            pathname: '/(auth)/login' as any,
            params: { role: selectedPortalRole },
        });
    };

    const isLawyer = selectedPortalRole === 'lawyer';

    // Dynamic Theme Colors
    const bgColor = isDark ? '#101110' : JudiciaColors.creamBg;
    const cardBg = isDark ? '#191B19' : '#FFFFFF';
    const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : '#EFECE6';
    const textPrimary = isDark ? '#FFFFFF' : JudiciaColors.textDark;
    const textSecondary = isDark ? '#9A9E9A' : JudiciaColors.textMuted;
    const buttonBg = isDark ? JudiciaColors.goldPrimary : JudiciaColors.buttonDark;
    const buttonTextColor = isDark ? '#111211' : '#FFFFFF';
    const toggleBtnBg = isDark ? '#1F211F' : '#F2EFEB';
    const toggleBtnBorder = isDark ? 'rgba(255, 255, 255, 0.15)' : '#E6E1D8';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            {/* Top Header: Judicia Logo + Theme Toggle */}
            <View style={styles.header}>
                <JudiciaLogo variant="header" textColor={textPrimary} />
                <TouchableOpacity
                    style={[styles.themeToggle, { backgroundColor: toggleBtnBg, borderColor: toggleBtnBorder }]}
                    activeOpacity={0.7}
                    onPress={toggleTheme}
                >
                    {isDark ? (
                        <Sun size={16} color={JudiciaColors.goldPrimary} />
                    ) : (
                        <Moon size={16} color={JudiciaColors.textDark} />
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={styles.tagline}>LEGAL PRACTICE, CLEARLY MANAGED</Text>
                    <Text style={[styles.headline, { color: textPrimary }]}>
                        Justice moves forward,{'\n'}one matter at a time.
                    </Text>
                    <Text style={[styles.subheadline, { color: textSecondary }]}>
                        A calm, connected space for Sri Lankan legal professionals and their clients.
                    </Text>
                </View>

                {/* Selection Card Container */}
                <View style={[styles.selectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
                    <Text style={[styles.cardHeading, { color: textPrimary }]}>Welcome to Judicia</Text>
                    <Text style={[styles.cardSubheading, { color: textSecondary }]}>Choose how you'll use the app.</Text>

                    {/* Side-by-side Role Options */}
                    <View style={styles.rolesRow}>
                        {/* Lawyer Option */}
                        <TouchableOpacity
                            style={[
                                styles.roleOption,
                                isDark ? styles.roleOptionDark : styles.roleOptionLight,
                                isLawyer && (isDark ? styles.roleOptionSelectedDark : styles.roleOptionSelectedLight),
                            ]}
                            activeOpacity={0.8}
                            onPress={() => setSelectedPortalRole('lawyer')}
                        >
                            <View style={[
                                styles.iconCircle,
                                isDark ? styles.iconCircleDark : styles.iconCircleLight,
                                isLawyer && (isDark ? styles.iconCircleSelectedDark : styles.iconCircleSelectedLight),
                            ]}>
                                <Briefcase size={18} color={isLawyer ? (isDark ? JudiciaColors.goldPrimary : '#785923') : '#8A908A'} />
                            </View>
                            <Text style={[styles.roleTitle, { color: textPrimary }]}>I'm a Lawyer</Text>
                            <Text style={[styles.roleDesc, { color: textSecondary }]}>Manage cases, clients and hearings</Text>
                        </TouchableOpacity>

                        {/* Client Option */}
                        <TouchableOpacity
                            style={[
                                styles.roleOption,
                                isDark ? styles.roleOptionDark : styles.roleOptionLight,
                                !isLawyer && (isDark ? styles.roleOptionSelectedDark : styles.roleOptionSelectedLight),
                            ]}
                            activeOpacity={0.8}
                            onPress={() => setSelectedPortalRole('client')}
                        >
                            <View style={[
                                styles.iconCircle,
                                isDark ? styles.iconCircleDark : styles.iconCircleLight,
                                !isLawyer && (isDark ? styles.iconCircleSelectedDark : styles.iconCircleSelectedLight),
                            ]}>
                                <UserIcon size={18} color={!isLawyer ? (isDark ? JudiciaColors.goldPrimary : '#785923') : '#8A908A'} />
                            </View>
                            <Text style={[styles.roleTitle, { color: textPrimary }]}>I'm a Client</Text>
                            <Text style={[styles.roleDesc, { color: textSecondary }]}>Follow my case and contact counsel</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Dynamic Action Button */}
                    <TouchableOpacity
                        style={[styles.continueButton, { backgroundColor: buttonBg }]}
                        activeOpacity={0.85}
                        onPress={handleContinue}
                    >
                        <Text style={[styles.continueButtonText, { color: buttonTextColor }]}>
                            Continue as {isLawyer ? 'Lawyer' : 'Client'}
                        </Text>
                        <ArrowRight size={18} color={buttonTextColor} />
                    </TouchableOpacity>

                    {/* Footer Note inside card */}
                    <Text style={[styles.cardFooterNote, { color: textSecondary }]}>
                        New to Judicia? You can create your account on the next screen.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Legal Disclaimer */}
            <View style={styles.footer}>
                <Text style={[styles.footerNote, { color: isDark ? '#6E736E' : '#8A918A' }]}>
                    Attorneys-at-Law registered with the BASL are verified before access is approved.
                </Text>
            </View>
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
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 8,
    },
    themeToggle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    heroSection: {
        marginTop: 20,
        marginBottom: 24,
    },
    tagline: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        color: JudiciaColors.goldPrimary,
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    headline: {
        fontSize: 30,
        lineHeight: 36,
        fontWeight: '700',
        marginBottom: 10,
    },
    subheadline: {
        fontSize: 14,
        lineHeight: 20,
    },
    selectionCard: {
        borderRadius: 16,
        padding: 22,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 4,
        borderWidth: 1,
    },
    cardHeading: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    cardSubheading: {
        fontSize: 13,
        marginBottom: 18,
    },
    rolesRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    roleOption: {
        flex: 1,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1.5,
    },
    roleOptionLight: {
        backgroundColor: '#FAF9F6',
        borderColor: '#E8E4DC',
    },
    roleOptionDark: {
        backgroundColor: '#141514',
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    roleOptionSelectedLight: {
        borderColor: JudiciaColors.goldPrimary,
        backgroundColor: '#FDFBF7',
    },
    roleOptionSelectedDark: {
        borderColor: JudiciaColors.goldPrimary,
        backgroundColor: '#201E17',
    },
    iconCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    iconCircleLight: {
        backgroundColor: '#EBE7DE',
    },
    iconCircleDark: {
        backgroundColor: '#232523',
    },
    iconCircleSelectedLight: {
        backgroundColor: '#F3E5C8',
    },
    iconCircleSelectedDark: {
        backgroundColor: '#352E1D',
    },
    roleTitle: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 4,
    },
    roleDesc: {
        fontSize: 11,
        lineHeight: 15,
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 12,
    },
    continueButtonText: {
        fontSize: 15,
        fontWeight: '700',
    },
    cardFooterNote: {
        marginTop: 14,
        fontSize: 11,
        textAlign: 'center',
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        alignItems: 'center',
    },
    footerNote: {
        fontSize: 11,
        textAlign: 'center',
        lineHeight: 16,
    },
});