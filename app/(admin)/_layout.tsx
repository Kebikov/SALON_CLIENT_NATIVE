import { MainLayout } from "app/_layout";
import { Stack } from 'expo-router';
import BottomMenu from '@/components/widgets/BottomMenu/BottomMenu';


const AdminLayout = () => {
    return(
        <MainLayout>
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="index"/>
                <Stack.Screen name="adminAdd"/>
                <Stack.Screen name="adminSettings"/>
            </Stack>
            <BottomMenu role={'admin'} />
        </MainLayout>
    )
}

export default AdminLayout;