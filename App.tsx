import { FC } from 'react';
import Navigatuon from '@/navigation/Navigatuon';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import ModalMsg from '@/shared/ModalMsg/ModalMsg';


const App: FC = () => {

	return (
        <Provider store={store} >
            <GestureHandlerRootView style={{flex: 1}}>
                <ModalMsg message='gfdd' type='error' />
                <Navigatuon/>
            </GestureHandlerRootView>
        </Provider>
	);
}

export default App;


