import axios from "axios";
import { baseLinkApi } from "../axios.instance/instance";
import NetInfo from "@react-native-community/netinfo";
import { Alert, ToastAndroid, Platform } from "react-native";


/**
 * `Проерка соединения с сервером.`
 */
export const checkNetwork = async () => {
    try {
        const netInfo = await NetInfo.fetch();
        if(!netInfo.isConnected) return Platform.OS === 'ios' ? Alert.alert('Проверьте соединение...') : ToastAndroid.show('Проверьте соединение...', ToastAndroid.SHORT);

        const {data} = await axios.get(baseLinkApi);
        return data;
    } catch (error) {
        console.error('Error in [checkNetwork]', error);
    }
}  