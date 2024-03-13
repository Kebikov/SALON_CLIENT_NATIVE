import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TypeRootPage } from './navigation.types';
import { COLOR_ROOT } from '@/data/colors';
import Auth from '@/pages/Auth/Auth';
import Home from '@/pages/Home/Home';
import Registration from '@/pages/Registration/Registration';


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
                <Stack.Screen name='Home' component={Home} key={'Home'} />
                <Stack.Screen name='Registration' component={Registration} key={'Registration'} options={{animation: 'slide_from_right'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};


export default Navigatuon;