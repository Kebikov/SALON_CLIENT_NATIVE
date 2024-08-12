import { FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import ModalMsg from '@/components/shared/ModalMsg/ModalMsg';
import ApiInterceptors from '@/components/wrappers/ApiInterceptors/ApiInterceptors';
import Spinner from '@/components/shared/Spinner/Spinner';
import { Stack } from 'expo-router';
import { PortalProvider, PortalHost } from '@gorhom/portal';


interface IMainLayout {
    children?: JSX.Element | JSX.Element[] | undefined;
}

export const MainLayout: FC<IMainLayout> = ({children}) => {

	return (
        <GestureHandlerRootView style={{flex: 1}} >
            <PortalProvider>
                <Provider store={store} >
                    <ApiInterceptors>
                        <PortalHost name='calendar' />
                        <PortalHost name='clock' />
                        <ModalMsg/>
                        <Spinner/>
                        <>
                            {children}
                        </>
                    </ApiInterceptors>
                </Provider>
            </PortalProvider>
        </GestureHandlerRootView>
	);
}

const IndexLayout = () => {

    return(
        <MainLayout>
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='index' />
                <Stack.Screen name='auth/authCreateAccount' />
                <Stack.Screen name='auth/authEnter' />
                <Stack.Screen name='auth/authForgot' />
            </Stack>
        </MainLayout>
    )
}

export default IndexLayout;



