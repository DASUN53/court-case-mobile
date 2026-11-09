import React, { useState, useEffect } from 'react';
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
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
import { JudiciaLogo } from '@/components/common/JudiciaLogo';
import { JudiciaColors } from '@/constants/theme';
import { API_BASE_URL, STORAGE_KEYS, normalizeApiUrl } from '@/constants/config';
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
    Settings,
    CheckCircle2,
    AlertCircle,
    X,
    Wifi,
} from 'lucide-react-native';

export default function LawyerLoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Dynamic Server API URL Configuration & Testing
    const [apiUrl, setApiUrl] = useState(API_BASE_URL);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [inputUrl, setInputUrl] = useState(API_BASE_URL);
    const [testStatus, setTestStatus] = useState<{
        status: 'idle' | 'testing' | 'success' | 'error';
        message: string;
    }>({
        status: 'idle',
        message: '',
    });

    useEffect(() => {
        SecureStore.getItemAsync(STORAGE_KEYS.CUSTOM_API_URL).then((saved) => {
            if (saved && saved.trim().length > 0) {
                setApiUrl(saved.trim());
                setInputUrl(saved.trim());
            }
        });
    }, []);

    const handleTestConnection = async (targetOverride?: string) => {
        const target = normalizeApiUrl(targetOverride || inputUrl);
        setTestStatus({ status: 'testing', message: `Pinging ${target}...` });
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);
            const res = await fetch(`${target}/health`, {
                signal: controller.signal,
                headers: { Accept: 'application/json' },
            });
            clearTimeout(timeoutId);
            if (res.ok) {
                const data = await res.json();
                setTestStatus({
                    status: 'success',
                    message: `Connected! PostgreSQL: ${data.database || 'connected'} (${data.responseTimeMs || '<50'}ms)`,
                });
            } else {
                setTestStatus({
                    status: 'error',
                    message: `Server returned HTTP ${res.status}: ${res.statusText}`,
                });
            }
        } catch (err: any) {
            setTestStatus({
                status: 'error',
                message:
                    err.name === 'AbortError'
                        ? 'Timed out (4s). Cannot reach this IP/URL. Ensure Next.js is running.'
                        : (err.message || 'Network unreachable'),
            });
        }
    };

    const handleSaveUrl = async (newUrlToSave: string) => {
        const normalized = normalizeApiUrl(newUrlToSave);
        await SecureStore.setItemAsync(STORAGE_KEYS.CUSTOM_API_URL, normalized);
        setApiUrl(normalized);
        setShowConfigModal(false);
        setErrorMessage(null);
    };

    const handleResetUrl = async () => {
        await SecureStore.deleteItemAsync(STORAGE_KEYS.CUSTOM_API_URL);
        const def = 'http://172.20.10.2:3000/api';
        setApiUrl(def);
        setInputUrl(def);
        setShowConfigModal(false);
        setErrorMessage(null);
    };

    const handleSignIn = async () => {
        if (!email.trim() || !password) {
            setErrorMessage('Please enter both your email address and password.');
            return;
        }

        setErrorMessage(null);
        setIsLoading(true);

        try {
            await login({
                email: email.trim(),
                password,
            });
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
                        <Text style={styles.tagline}>LAWYER ACCESS</Text>
                        <Text style={[styles.heading, { color: textPrimary }]}>Welcome back</Text>
                        <Text style={[styles.subheading, { color: textSecondary }]}>
                            Sign in to your practice workspace.
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
                                placeholder="john@pereralaw.lk"
                                placeholderTextColor={isDark ? '#6E736E' : '#A3A8A3'}
                                autoCapitalize="none"
                                keyboardType="email-address"
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
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity
                                    style={styles.eyeBtn}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} color={textSecondary} />
                                    ) : (
                                        <Eye size={18} color={textSecondary} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Remember Me & Forgot Password */}
                        <View style={styles.optionsRow}>
                            <TouchableOpacity
                                style={styles.rememberMe}
                                activeOpacity={0.8}
                                onPress={() => setKeepSignedIn(!keepSignedIn)}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        {
                                            borderColor: keepSignedIn ? JudiciaColors.goldPrimary : textSecondary,
                                            backgroundColor: keepSignedIn ? JudiciaColors.goldPrimary : 'transparent',
                                        },
                                    ]}
                                >
                                    {keepSignedIn && <Check size={12} color="#14291F" strokeWidth={3} />}
                                </View>
                                <Text style={[styles.rememberText, { color: textPrimary }]}>Keep me signed in</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={styles.forgotText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity
                            style={[
                                styles.signInBtn,
                                { backgroundColor: buttonBg },
                                isLoading && { opacity: 0.7 },
                            ]}
                            activeOpacity={0.85}
                            disabled={isLoading}
                            onPress={handleSignIn}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color={buttonTextColor} />
                            ) : (
                                <>
                                    <Text style={[styles.signInBtnText, { color: buttonTextColor }]}>
                                        Sign in
                                    </Text>
                                    <ArrowRight size={18} color={buttonTextColor} />
                                </>
                            )}
                        </TouchableOpacity>

                        {/* Switch to Register */}
                        <View style={styles.switchRow}>
                            <Text style={[styles.switchText, { color: textSecondary }]}>New to Judicia? </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => router.push('/(auth)/register' as any)}
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
                    Lawyer accounts remain pending until professional credentials are verified.
                </Text>
            </View>

            {/* Tap-to-Configure Server URL Footer */}
            <TouchableOpacity
                style={styles.serverPill}
                activeOpacity={0.7}
                onPress={() => {
                    setInputUrl(apiUrl);
                    setTestStatus({ status: 'idle', message: '' });
                    setShowConfigModal(true);
                }}
            >
                <Wifi size={12} color={JudiciaColors.goldPrimary} />
                <Text style={styles.serverPillText} numberOfLines={1}>
                    Server: {apiUrl}
                </Text>
                <Settings size={12} color={JudiciaColors.goldPrimary} />
            </TouchableOpacity>

            {/* Modal: Configure & Test Server Connection */}
            <Modal
                visible={showConfigModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowConfigModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalCard, { backgroundColor: isDark ? '#191B19' : '#FFFFFF' }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: textPrimary }]}>Backend Server Setting</Text>
                            <TouchableOpacity onPress={() => setShowConfigModal(false)}>
                                <X size={20} color={textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.modalDesc, { color: textSecondary }]}>
                            Enter your PC's IP address or public tunnel URL (port 3000):
                        </Text>

                        <TextInput
                            style={[
                                styles.modalInput,
                                { backgroundColor: inputBg, borderColor: cardBorder, color: textPrimary },
                            ]}
                            value={inputUrl}
                            onChangeText={setInputUrl}
                            autoCapitalize="none"
                            placeholder="http://172.20.10.2:3000/api"
                            placeholderTextColor="#8A918B"
                        />

                        {/* Quick Presets */}
                        <View style={styles.presetRow}>
                            <TouchableOpacity
                                style={styles.presetBtn}
                                onPress={() => setInputUrl('http://172.20.10.2:3000/api')}
                            >
                                <Text style={styles.presetText}>Hotspot (172.20.10.2)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.presetBtn}
                                onPress={() => setInputUrl('http://10.0.2.2:3000/api')}
                            >
                                <Text style={styles.presetText}>Android Emulator</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Test Connection Button */}
                        <TouchableOpacity
                            style={styles.testBtn}
                            onPress={() => handleTestConnection()}
                            disabled={testStatus.status === 'testing'}
                        >
                            {testStatus.status === 'testing' ? (
                                <ActivityIndicator size="small" color={JudiciaColors.goldPrimary} />
                            ) : (
                                <Text style={styles.testBtnText}>⚡ Test Connection Now</Text>
                            )}
                        </TouchableOpacity>

                        {/* Test Status Banner */}
                        {testStatus.message.length > 0 && (
                            <View
                                style={[
                                    styles.testResultBox,
                                    {
                                        backgroundColor:
                                            testStatus.status === 'success'
                                                ? 'rgba(22, 163, 74, 0.15)'
                                                : testStatus.status === 'error'
                                                ? 'rgba(220, 38, 38, 0.15)'
                                                : 'rgba(201, 161, 90, 0.15)',
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.testResultText,
                                        {
                                            color:
                                                testStatus.status === 'success'
                                                    ? '#16A34A'
                                                    : testStatus.status === 'error'
                                                    ? '#DC2626'
                                                    : JudiciaColors.goldPrimary,
                                        },
                                    ]}
                                >
                                    {testStatus.message}
                                </Text>
                            </View>
                        )}

                        {/* Action Buttons */}
                        <View style={styles.modalActionRow}>
                            <TouchableOpacity
                                style={styles.saveBtn}
                                onPress={() => handleSaveUrl(inputUrl)}
                            >
                                <Text style={styles.saveBtnText}>Save & Use This URL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
    },
    titleSection: {
        marginBottom: 24,
    },
    tagline: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        color: JudiciaColors.goldPrimary,
        marginBottom: 8,
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    subheading: {
        fontSize: 14,
        lineHeight: 20,
    },
    errorBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(220, 38, 38, 0.12)',
        borderColor: 'rgba(220, 38, 38, 0.4)',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
    },
    errorText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        color: '#DC2626',
        fontWeight: '500',
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
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 16,
        fontSize: 14,
    },
    passwordWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    passwordInput: {
        paddingRight: 48,
    },
    eyeBtn: {
        position: 'absolute',
        right: 16,
        padding: 4,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    rememberMe: {
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
    rememberText: {
        fontSize: 13,
    },
    forgotText: {
        fontSize: 13,
        color: JudiciaColors.goldPrimary,
        fontWeight: '600',
    },
    signInBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 52,
        borderRadius: 12,
        marginTop: 12,
    },
    signInBtnText: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    switchText: {
        fontSize: 13,
    },
    createAccountLink: {
        fontSize: 13,
        color: JudiciaColors.goldPrimary,
        fontWeight: '700',
    },
    securityFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 24,
        paddingBottom: 6,
    },
    securityText: {
        fontSize: 11,
        textAlign: 'center',
        lineHeight: 16,
        flex: 1,
    },
    serverPill: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(201, 161, 90, 0.08)',
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(201, 161, 90, 0.25)',
    },
    serverPillText: {
        fontSize: 11,
        color: JudiciaColors.goldPrimary,
        fontWeight: '600',
        maxWidth: '80%',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.65)',
        justifyContent: 'center',
        padding: 20,
    },
    modalCard: {
        borderRadius: 16,
        padding: 22,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        gap: 14,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    modalDesc: {
        fontSize: 13,
        lineHeight: 18,
    },
    modalInput: {
        height: 46,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 14,
        fontSize: 13,
        fontFamily: 'SpaceMono',
    },
    presetRow: {
        flexDirection: 'row',
        gap: 8,
    },
    presetBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        backgroundColor: 'rgba(201, 161, 90, 0.12)',
        borderWidth: 1,
        borderColor: 'rgba(201, 161, 90, 0.3)',
    },
    presetText: {
        fontSize: 11,
        color: JudiciaColors.goldPrimary,
        fontWeight: '600',
    },
    testBtn: {
        height: 42,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: JudiciaColors.goldPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(201, 161, 90, 0.1)',
    },
    testBtnText: {
        fontSize: 13,
        fontWeight: '700',
        color: JudiciaColors.goldPrimary,
    },
    testResultBox: {
        padding: 10,
        borderRadius: 8,
    },
    testResultText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 16,
    },
    modalActionRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 6,
    },
    saveBtn: {
        flex: 1,
        height: 46,
        borderRadius: 10,
        backgroundColor: JudiciaColors.goldPrimary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#101110',
    },
});
