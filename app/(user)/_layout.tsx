import { MainLayout } from "app/_layout";
import { Stack, useNavigation } from 'expo-router';
import BottomMenu from '@/components/widgets/BottomMenu/BottomMenu';


const UserLayout = () => {
    return(
        <MainLayout>
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="home"/>
            </Stack>
            <BottomMenu page={'home'} />
        </MainLayout>
    )
}

export default UserLayout;