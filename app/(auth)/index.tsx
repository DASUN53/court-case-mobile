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
import { Briefcase, User as UserIcon, Moon, ArrowRight } from 'lucide-react-native';

export default function WelcomePortalScreen() {
    const router = useRouter();
    const { selectedPortalRole, setSelectedPortalRole } = useAuth();

    const handleContinue = () => {
        router.push({
            pathname: '/(auth)/login' as any,
            params: { role: selectedPortalRole },
        });
    };

    const isLawyer = selectedPortalRole === 'lawyer';

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Top Header: Judicia Logo + Theme Toggle */}
            <View style={styles.header}>
                <JudiciaLogo variant="header" />
                <TouchableOpacity style={styles.themeToggle} activeOpacity={0.7}>
                    <Moon size={16} color={JudiciaColors.textDark} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={styles.tagline}>LEGAL PRACTICE, CLEARLY MANAGED</Text>
                    <Text style={styles.headline}>
                        Justice moves forward,{'\n'}one matter at a time.
                    </Text>
                    <Text style={styles.subheadline}>
                        A calm, connected space for Sri Lankan legal professionals and their clients.
                    </Text>
                </View>

                {/* Selection Card Container */}
                <View style={styles.selectionCard}>
                    <Text style={styles.cardHeading}>Welcome to Judicia</Text>
                    <Text style={styles.cardSubheading}>Choose how you'll use the app.</Text>

                    {/* Side-by-side Role Options */}
                    <View style={styles.rolesRow}>
                        {/* Lawyer Option */}
                        <TouchableOpacity
                            style={[
                                styles.roleOption,
                                isLawyer && styles.roleOptionSelected,
                            ]}
                            activeOpacity={0.8}
                            onPress={() => setSelectedPortalRole('lawyer')}
                        >
                            <View style={[styles.iconCircle, isLawyer && styles.iconCircleSelected]}>
                                <Briefcase size={18} color={isLawyer ? '#785923' : '#6B726C'} />
                            </View>
                            <Text style={styles.roleTitle}>I'm a Lawyer</Text>
                            <Text style={styles.roleDesc}>Manage cases, clients and hearings</Text>
                        </TouchableOpacity>

                        {/* Client Option */}
                        <TouchableOpacity
                            style={[
                                styles.roleOption,
                                !isLawyer && styles.roleOptionSelected,
                            ]}
                            activeOpacity={0.8}
                            onPress={() => setSelectedPortalRole('client')}
                        >
                            <View style={[styles.iconCircle, !isLawyer && styles.iconCircleSelected]}>
                                <UserIcon size={18} color={!isLawyer ? '#785923' : '#6B726C'} />
                            </View>
                            <Text style={styles.roleTitle}>I'm a Client</Text>
                            <Text style={styles.roleDesc}>Follow my case and contact counsel</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Dynamic Action Button */}
                    <TouchableOpacity
                        style={styles.continueButton}
                        activeOpacity={0.85}
                        onPress={handleContinue}
                    >
                        <Text style={styles.continueButtonText}>
                            Continue as {isLawyer ? 'Lawyer' : 'Client'}
                        </Text>
                        <ArrowRight size={18} color="#FFFFFF" />
                    </TouchableOpacity>

                    {/* Footer Note inside card */}
                    <Text style={styles.cardFooterNote}>
                        New to Judicia? You can create your account on the next screen.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Legal Disclaimer */}
            <View style={styles.footer}>
                <Text style={styles.footerNote}>
                    Attorneys-at-Law registered with the BASL are verified before access is approved.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: JudiciaColors.creamBg,
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
        backgroundColor: '#F2EFEB',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E6E1D8',
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
        color: JudiciaColors.goldMuted,
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    headline: {
        fontSize: 30,
        lineHeight: 36,
        fontWeight: '700',
        color: JudiciaColors.textDark,
        marginBottom: 10,
    },
    subheadline: {
        fontSize: 14,
        lineHeight: 20,
        color: JudiciaColors.textMuted,
    },
    selectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 22,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#EFECE6',
    },
    cardHeading: {
        fontSize: 20,
        fontWeight: '700',
        color: JudiciaColors.textDark,
        marginBottom: 4,
    },
    cardSubheading: {
        fontSize: 13,
        color: JudiciaColors.textMuted,
        marginBottom: 18,
    },
    rolesRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    roleOption: {
        flex: 1,
        backgroundColor: '#FAF9F6',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1.5,
        borderColor: '#E8E4DC',
    },
    roleOptionSelected: {
        borderColor: JudiciaColors.goldPrimary,
        backgroundColor: '#FDFBF7',
    },
    iconCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#EBE7DE',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    iconCircleSelected: {
        backgroundColor: '#F3E5C8',
    },
    roleTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: JudiciaColors.textDark,
        marginBottom: 4,
    },
    roleDesc: {
        fontSize: 11,
        lineHeight: 15,
        color: JudiciaColors.textMuted,
    },
    continueButton: {
        backgroundColor: JudiciaColors.buttonDark,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 12,
    },
    continueButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    cardFooterNote: {
        marginTop: 14,
        fontSize: 11,
        textAlign: 'center',
        color: JudiciaColors.textMuted,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        alignItems: 'center',
    },
    footerNote: {
        fontSize: 11,
        textAlign: 'center',
        color: '#8A918A',
        lineHeight: 16,
    },
});