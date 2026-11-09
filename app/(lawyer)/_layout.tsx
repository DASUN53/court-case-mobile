import { Stack } from 'expo-router';

export default function LawyerLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="case-details/[id]" options={{ headerShown: false }} />
        </Stack>
    );
}