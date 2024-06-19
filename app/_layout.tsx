import { FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import ModalMsg from '@/components/shared/ModalMsg/ModalMsg';
import ApiInterceptors from '@/components/wrappers/ApiInterceptors/ApiInterceptors';
import Spinner from '@/components/shared/Spinner/Spinner';
import { Stack, useNavigation } from 'expo-router';
import { Image } from 'react-native';
import BottomMenu from '@/components/widgets/BottomMenu/BottomMenu';



const IndexLayout: FC = () => {

	return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Provider store={store} >
                <ApiInterceptors>
                    <ModalMsg/>
                    <Spinner/>

                    {/*//: Stak */}
                    <Stack
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen name='index' />
                        <Stack.Screen name='modal' options={{presentation: 'modal'}} />
                    </Stack>
                    <BottomMenu page={'home'} />
                </ApiInterceptors>
            </Provider>
        </GestureHandlerRootView>
	);
}

export default IndexLayout;


