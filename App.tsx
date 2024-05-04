import { FC } from 'react';
import Navigatuon from '@/navigation/Navigatuon';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import ModalMsg from '@/components/shared/ModalMsg/ModalMsg';
import ApiInterceptors from '@/components/wrappers/ApiInterceptors/ApiInterceptors';
import Spinner from '@/components/shared/Spinner/Spinner';



const App: FC = () => {


	return (
        <Provider store={store} >
            <GestureHandlerRootView style={{flex: 1}}>
                <ApiInterceptors>
                    <ModalMsg/>
                    <Spinner/>
                    <Navigatuon/>
                </ApiInterceptors>
            </GestureHandlerRootView>
        </Provider>
	);
}

export default App;


