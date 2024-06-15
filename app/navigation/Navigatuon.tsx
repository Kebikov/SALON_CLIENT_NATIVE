import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TypeRootPage } from './navigation.types';
import { COLOR_ROOT } from '@/data/colors';
import Auth from '@/pages/Auth/Auth';
import Home from '@/pages/Home/Home';
import User from '@/pages/User/User';
import AuthCreateAccount from '@/pages/AuthCreateAccount/AuthCreateAccount';
import AuthEnter from '@/pages/AuthEnter/AuthEnter';
import AuthForgot from '@/pages/AuthForgot/AuthForgot';
import ChangePassword from '@/pages/ChangePassword/ChangePassword';
import AdminAdd from '@/pages/AdminAdd/AdminAdd';
import AdminDepartment from '@/pages/AdminDepartment/AdminDepartment';
import AdminAddDepartment from '@/pages/AdminAddDepartment/AdminAddDepartment';
import AdminEditDepartment from '@/pages/AdminEditDepartment/AdminEditDepartment';
import AdminService from '@/pages/AdminService/AdminService';
import Test from '@/pages/Test/Test';


const Stack = createNativeStackNavigator<TypeRootPage>();


const Navigatuon: FC = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: COLOR_ROOT.BACKGROUND
                    }
                }}
            >
                <Stack.Screen name='Auth' component={Auth} key={'Auth'} />
                <Stack.Screen name='AuthEnter' component={AuthEnter} key={'AuthEnter'} />
                <Stack.Screen name='AuthForgot' component={AuthForgot} key={'AuthForgot'} />
                <Stack.Screen name='AuthCreateAccount' component={AuthCreateAccount} key={'AuthCreateAccount'} />
                <Stack.Screen name='Home' component={Home} key={'Home'} />
                <Stack.Screen name="User" component={User} key={'User'} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} key={'ChangePassword'} />
                {/* Admin */}
                <Stack.Screen name="AdminAdd" component={AdminAdd} key={'AdminAdd'} />
                <Stack.Screen name="AdminDepartment" component={AdminDepartment} key={'AdminDepartment'} />
                <Stack.Screen name="AdminAddDepartment" component={AdminAddDepartment} key={'AdminAddDepartment'} />
                <Stack.Screen name="AdminEditDepartment" component={AdminEditDepartment} key={'AdminEditDepartment'} />
                <Stack.Screen name="AdminService" component={AdminService} key={'AdminService'} />
                {/* Test */}
                <Stack.Screen name="Test" component={Test} key={'Test'} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};


export default Navigatuon;

// options={{animation: 'slide_from_right'}}