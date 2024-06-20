import { MainLayout } from "@/app/_layout";
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
                <Stack.Screen name="changePassword"/>
                <Stack.Screen name="[idEditDepartment]" getId={ ({ params }) => String(Date.now()) } />
            </Stack>
            <BottomMenu role={'admin'} />
        </MainLayout>
    )
}

export default AdminLayout;