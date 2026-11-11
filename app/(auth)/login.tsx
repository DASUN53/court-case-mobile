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
import {
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Check,
    Sun,
    Moon,
    AlertCircle,
} from 'lucide-react-native';

export default function LoginScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ role?: string }>();
    const { login, selectedPortalRole } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    // Determine if this is Client Access or Lawyer Access
    const isClient = (params.role || selectedPortalRole) === 'client';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSignIn = async () => {
        if (!email.trim() || !password) {
            setErrorMessage('Please enter both your email address and password.');
            return;
        }

        setErrorMessage(null);
        setIsLoading(true);

        try {
            // Connects to Next.js POST /api/auth/login and queries PostgreSQL
            await login({
                email: email.trim(),
                password,
            });
            // AuthContext automatically routes:
            // - CLIENT -> /(client)
            // - LAWYER -> /(lawyer)
        } catch (error: any) {
            setErrorMessage(error.message || 'Invalid email or password.');
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
                    {/* Headline Section */}
                    <View style={styles.titleSection}>
                        <Text style={styles.tagline}>
                            {isClient ? 'CLIENT ACCESS' : 'LAWYER ACCESS'}
                        </Text>
                        <Text style={[styles.heading, { color: textPrimary }]}>Welcome back</Text>
                        <Text style={[styles.subheading, { color: textSecondary }]}>
                            {isClient
                                ? 'Sign in to your secure case portal.'
                                : 'Sign in to your practice workspace.'}
                        </Text>
                    </View>

                    {/* Error Banner */}
                    {errorMessage && (
                        <View style={styles.errorBox}>
                            <AlertCircle size={16} color="#DC2626" style={{ marginTop: 2, marginRight: 8 }} />
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    )}

                    {/* Form Fields */}
                    <View style={styles.form}>
                        {/* Email Field */}
                        <View style={styles.fieldGroup}>
                            <Text style={[styles.label, { color: textPrimary }]}>Email address</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary },
                                ]}
                                placeholder={isClient ? 'name@example.com' : 'counsel@example.com'}
                                placeholderTextColor={isDark ? '#6E736E' : '#A3A8A3'}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        {/* Password Field */}
                        <View style={styles.fieldGroup}>
                            <Text style={[styles.label, { color: textPrimary }]}>Password</Text>
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={[
                                        styles.input,
                                        styles.passwordInput,
                                        { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary },
                                    ]}
                                    placeholder="Enter your password"
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
                        </View>

                        {/* Options Row */}
                        <View style={styles.optionsRow}>
                            <TouchableOpacity
                                style={styles.checkboxRow}
                                activeOpacity={0.7}
                                onPress={() => setKeepSignedIn(!keepSignedIn)}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        { borderColor: cardBorder },
                                        keepSignedIn && styles.checkboxActive,
                                    ]}
                                >
                                    {keepSignedIn && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                                </View>
                                <Text style={[styles.checkboxLabel, { color: textSecondary }]}>Keep me signed in</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={styles.forgotPassword}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity
                            style={[styles.signInBtn, { backgroundColor: buttonBg }]}
                            activeOpacity={0.85}
                            onPress={handleSignIn}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color={buttonTextColor} />
                            ) : (
                                <>
                                    <Text style={[styles.signInBtnText, { color: buttonTextColor }]}>Sign in</Text>
                                    <ArrowRight size={18} color={buttonTextColor} />
                                </>
                            )}
                        </TouchableOpacity>

                        {/* Switch to Register */}
                        <View style={styles.switchRow}>
                            <Text style={[styles.switchText, { color: textSecondary }]}>New to Judicia? </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() =>
                                    router.push({
                                        pathname: '/(auth)/register' as any,
                                        params: { role: isClient ? 'client' : 'lawyer' },
                                    })
                                }
                            >
                                <Text style={styles.createAccountLink}>Create an account</Text>
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
                        ? 'You will only see information and documents explicitly shared with you.'
                        : 'Lawyer accounts remain pending until professional credentials are verified.'}
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
        paddingTop: 24,
        paddingBottom: 40,
    },
    titleSection: {
        marginBottom: 28,
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
        gap: 18,
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
        paddingVertical: 13,
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
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 6,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: {
        backgroundColor: JudiciaColors.goldPrimary,
        borderColor: JudiciaColors.goldPrimary,
    },
    checkboxLabel: {
        fontSize: 12,
    },
    forgotPassword: {
        fontSize: 12,
        fontWeight: '600',
        color: JudiciaColors.goldPrimary,
    },
    signInBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    signInBtnText: {
        fontSize: 15,
        fontWeight: '700',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    switchText: {
        fontSize: 13,
    },
    createAccountLink: {
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