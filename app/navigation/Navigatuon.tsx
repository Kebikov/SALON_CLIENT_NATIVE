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
            </Stack.Navigator>
        </NavigationContainer>
    )
};


export default Navigatuon;

// options={{animation: 'slide_from_right'}}