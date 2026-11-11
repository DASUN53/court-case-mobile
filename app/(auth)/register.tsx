import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { JudiciaLogo } from '@/components/common/JudiciaLogo';
import { JudiciaColors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Sun, Moon, AlertCircle } from 'lucide-react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ role?: string }>();
    const { register, selectedPortalRole } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    const isClient = (params.role || selectedPortalRole) === 'client';

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firmName, setFirmName] = useState('');
    const [barNumber, setBarNumber] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRegister = async () => {
        if (!fullName.trim()) {
            setErrorMessage('Please enter your full name.');
            return;
        }
        if (!email.trim() || !email.includes('@')) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long with uppercase, lowercase, and numbers.');
            return;
        }

        setErrorMessage(null);
        setIsLoading(true);

        try {
            // Connects to Next.js POST /api/auth/register and inserts into PostgreSQL
            await register({
                role: isClient ? 'client' : 'lawyer',
                fullName: fullName.trim(),
                email: email.trim(),
                password,
                phone: phone.trim() || undefined,
                firmName: isClient ? undefined : (firmName.trim() || 'Independent Practice'),
                barNumber: isClient ? undefined : barNumber.trim(),
                referralCode: isClient ? referralCode.trim() : undefined,
            });
            // On success, AuthContext automatically routes:
            // - CLIENT -> /(client)
            // - LAWYER -> /(lawyer)
        } catch (error: any) {
            setErrorMessage(error.message || 'Registration failed. Please check your details.');
        } finally {
            setIsLoading(false);
        }
    };

    // Theme-aware tokens
    const bgColor = isDark ? '#101110' : JudiciaColors.creamBg;
    const cardBorder = isDark ? 'rgba(255, 255, 255, 0.1)' : '#E8E4DC';
    const inputBg = isDark ? '#191B19' : '#FFFFFF';
    const textPrimary = isDark ? '#FFFFFF' : JudiciaColors.textDark;
    const textSecondary = isDark ? '#9A9E9A' : JudiciaColors.textMuted;
    const buttonBg = isDark ? JudiciaColors.goldPrimary : JudiciaColors.buttonDark;
    const buttonTextColor = isDark ? '#111211' : '#FFFFFF';
    const headerBtnBg = isDark ? '#1F211F' : '#F2EFEB';
    const headerBtnBorder = isDark ? 'rgba(255, 255, 255, 0.15)' : '#E6E1D8';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            {/* Top Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.headerCircleBtn, { backgroundColor: headerBtnBg, borderColor: headerBtnBorder }]}
                    activeOpacity={0.7}
                    onPress={() => router.back()}
                >
                    <ArrowLeft size={18} color={textPrimary} />
                </TouchableOpacity>

                <JudiciaLogo variant="header" textColor={textPrimary} />

                <TouchableOpacity
                    style={[styles.headerCircleBtn, { backgroundColor: headerBtnBg, borderColor: headerBtnBorder }]}
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

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Headline */}
                    <View style={styles.titleSection}>
                        <Text style={styles.tagline}>
                            {isClient ? 'CLIENT REGISTRATION' : 'LAWYER REGISTRATION'}
                        </Text>
                        <Text style={[styles.heading, { color: textPrimary }]}>Create account</Text>
                        <Text style={[styles.subheading, { color: textSecondary }]}>
                            {isClient
                                ? 'Create an account to track your ongoing court matters.'
                                : "Join Sri Lanka's digital legal community."}
                        </Text>
                    </View>

                    {/* Error Box */}
                    {errorMessage && (
                        <View style={styles.errorBox}>
                            <AlertCircle size={16} color="#DC2626" style={{ marginTop: 2, marginRight: 8 }} />
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    )}

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Full Name */}
                        <View style={styles.fieldGroup}>
                            <Text style={[styles.label, { color: textPrimary }]}>Full Name</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary }]}
                                placeholder={isClient ? 'Nimali Jayawardena' : 'Adv. Kamal Perera'}
                                placeholderTextColor={isDark ? '#6E736E' : '#A3A8A3'}
                                value={fullName}
                                onChangeText={setFullName}
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.fieldGroup}>
                            <Text style={[styles.label, { color: textPrimary }]}>Email address</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary }]}
                                placeholder={isClient ? 'nimali@example.com' : 'counsel@example.com'}
                                placeholderTextColor={isDark ? '#6E736E' : '#A3A8A3'}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        {/* Phone */}
                        <View style={styles.fieldGroup}>
                            <Text style={[styles.label, { color: textPrimary }]}>Phone Number (Optional)</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary }]}
                                placeholder="077 123 4567"
                                placeholderTextColor={isDark ? '#6E736E' : '#A3A8A3'}
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>

                        {/* Client-specific: Case Number or Referral */}
                        {isClient && (
                            <View style={styles.fieldGroup}>
                                <Text style={[styles.label, { color: textPrimary }]}>Case Number or Law Firm (Optional)</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary }]}
                                    placeholder="e.g. DSP/0142/24 or Perera Chambers"
                                    placeholderTextColor={isDark ? '#6E736E' : '#A3A8A3'}
                                    value={referralCode}
                                    onChangeText={setReferralCode}
                                />
                            </View>
                        )}

                        {/* Lawyer-specific fields */}
                        {!isClient && (
                            <>
                                <View style={styles.fieldGroup}>
                                    <Text style={[styles.label, { color: textPrimary }]}>Chambers / Firm Name (Optional)</Text>
                                    <TextInput
                                        style={[styles.input, { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary }]}
                                        placeholder="e.g. Perera & Associates Law Chambers"
                                        placeholderTextColor={isDark ? '#6E736E' : '#A3A8A3'}
                                        value={firmName}
                                        onChangeText={setFirmName}
                                    />
                                </View>

                                <View style={styles.fieldGroup}>
                                    <Text style={[styles.label, { color: textPrimary }]}>BASL Bar Number (Optional)</Text>
                                    <TextInput
                                        style={[styles.input, { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary }]}
                                        placeholder="e.g. BASL/2022/491"
                                        placeholderTextColor={isDark ? '#6E736E' : '#A3A8A3'}
                                        value={barNumber}
                                        onChangeText={setBarNumber}
                                    />
                                </View>
                            </>
                        )}

                        {/* Password */}
                        <View style={styles.fieldGroup}>
                            <Text style={[styles.label, { color: textPrimary }]}>Password</Text>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={[
                                        styles.input,
                                        styles.passwordInput,
                                        { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary },
                                    ]}
                                    placeholder="Min. 8 characters"
                                    placeholderTextColor={isDark ? '#6E736E' : '#A3A8A3'}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity
                                    style={styles.eyeBtn}
                                    onPress={() => setShowPassword(!showPassword)}
                                    activeOpacity={0.7}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} color={textSecondary} />
                                    ) : (
                                        <Eye size={18} color={textSecondary} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.hintText, { color: textSecondary }]}>
                                Must include uppercase, lowercase, and a number.
                            </Text>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={[styles.registerBtn, { backgroundColor: buttonBg }]}
                            activeOpacity={0.85}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color={buttonTextColor} />
                            ) : (
                                <>
                                    <Text style={[styles.registerBtnText, { color: buttonTextColor }]}>
                                        {isClient ? 'Register as Client' : 'Register as Lawyer'}
                                    </Text>
                                    <ArrowRight size={18} color={buttonTextColor} />
                                </>
                            )}
                        </TouchableOpacity>

                        {/* Switch to Sign In */}
                        <View style={styles.switchRow}>
                            <Text style={[styles.switchText, { color: textSecondary }]}>Already have an account? </Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
                                <Text style={styles.signInLink}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Security Disclaimer */}
            <View style={styles.securityFooter}>
                <Lock size={14} color={isDark ? '#8A908A' : '#737873'} />
                <Text style={[styles.securityText, { color: isDark ? '#8A908A' : '#737873' }]}>
                    {isClient
                        ? 'Your personal data and legal records are encrypted and protected.'
                        : 'Credentials are securely encrypted and verified with the Bar Association.'}
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
    headerCircleBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
    },
    titleSection: {
        marginBottom: 24,
    },
    tagline: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        color: JudiciaColors.goldPrimary,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    heading: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 8,
    },
    subheading: {
        fontSize: 14,
    },
    errorBox: {
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(220, 38, 38, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        color: '#DC2626',
        fontSize: 13,
        flex: 1,
    },
    form: {
        gap: 16,
    },
    fieldGroup: {
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
    },
    input: {
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        borderWidth: 1,
    },
    passwordWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    passwordInput: {
        paddingRight: 45,
    },
    eyeBtn: {
        position: 'absolute',
        right: 14,
        padding: 6,
    },
    hintText: {
        fontSize: 11,
        marginTop: 2,
    },
    registerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    registerBtnText: {
        fontSize: 15,
        fontWeight: '700',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    switchText: {
        fontSize: 13,
    },
    signInLink: {
        fontSize: 13,
        fontWeight: '700',
        color: JudiciaColors.goldPrimary,
    },
    securityFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 30,
        paddingBottom: 20,
    },
    securityText: {
        fontSize: 11,
        lineHeight: 15,
        textAlign: 'center',
        flex: 1,
    },
});