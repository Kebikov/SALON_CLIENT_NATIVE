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
                {/* <Stack.Screen name="[idEditDepartment]"/>
                <Stack.Screen name="adminAdd"/>
                <Stack.Screen name="adminSettings"/>
                <Stack.Screen name="changePassword"/>
                <Stack.Screen name="adminService"/>
                <Stack.Screen name="adminAddService"/> */}
            </Stack>
            <BottomMenu role={'admin'} />
        </MainLayout>
    )
}

export default AdminLayout;