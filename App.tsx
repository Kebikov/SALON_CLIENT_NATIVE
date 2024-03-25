import { FC } from 'react';
import Navigatuon from '@/navigation/Navigatuon';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App: FC = () => {

	return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Navigatuon/>
        </GestureHandlerRootView>
	);
}

export default App;


