import type { TypeRootPage } from '@/navigation/navigation.types';
import { useNavigation, NavigationProp } from '@react-navigation/native';

/**
 * `Возврат обьекта навигации.`
 */
const useHookNavigate = () => {
    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();
    return { navigate };
}

export default useHookNavigate;