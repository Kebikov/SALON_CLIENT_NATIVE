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
                <Stack.Screen name="adminEditService/[id]" />
                <Stack.Screen name="adminEditDepartment/[id]" />
                <Stack.Screen name="adminAdd" />
                <Stack.Screen name="adminAddDepartment" />
                <Stack.Screen name="adminAddService" /> 
                <Stack.Screen name="adminDepartment" /> 
                <Stack.Screen name="adminService"/>
                <Stack.Screen name="adminSettings"/>
                <Stack.Screen name="changePassword"/>
                <Stack.Screen name="index" />
            </Stack>
            <BottomMenu role={'admin'} />
        </MainLayout>
    )
}

export default AdminLayout;