import { Stack } from 'expo-router';

export default function ClientLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="case-tracking/[id]" options={{ headerShown: false }} />
        </Stack>
    );
}