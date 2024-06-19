import { MainLayout } from "@/app/_layout";
import { Stack } from 'expo-router';
import BottomMenu from '@/components/widgets/BottomMenu/BottomMenu';


const UserLayout = () => {
    return(
        <MainLayout>
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="userSettings" />
            </Stack>
            <BottomMenu role={'client'} />
        </MainLayout>
    )
}

export default UserLayout;