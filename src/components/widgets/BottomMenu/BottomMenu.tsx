import { View, StyleSheet, Image, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import menu, {TKeyPage, IButtonPage} from './listMenu';
import type { TRole } from '@/api/routes/registration/types/registration.types';
import { useRouter, usePathname } from 'expo-router';


interface IBottomMenu {
    role: TRole;
}


/**
 * @widgets `Нижнее меню с иконками.`
 * @param role Для кокой роли меню. ['admin' | 'user' | 'master']
 */
const BottomMenu: FC<IBottomMenu> = ({role}) => {

    const router = useRouter();
    const path = usePathname();

    /**
     * Подчеркивание иконки меню текушей страницы.
     */
    const line = (pageLIne: TKeyPage) => {
        const slice = pageLIne.split(')');
        if(slice[1] === '') slice[1] = '/';
        return path === slice[1] ? <View style={styles.boxImgLine}/> : null;
    };

    /**
     * Кнопка в нижнем меню.
     */
    const ButtonForMenuPage = (item: IButtonPage): JSX.Element => {
        return(
            <Pressable 
                style={styles.boxImg} 
                onPress={() => item && item.page !== null ? router.navigate(item.page) : null} 
                key={item.id} 
            >
                <Image source={item.img} style={styles.icon} />
                {item.page ? line(item.page) : null}
            </Pressable>
        )
    };

    const menuItem = menu[role];
    const listMenu = menuItem !== null ? menuItem.map(item => ButtonForMenuPage(item)) : null;

    return (
        <View style={styles.main}>
            <View style={styles.box}>
                {
                    listMenu
                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        borderTopColor: 'rgba(204, 204, 204, .5)',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 35 : 10,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    boxImg: {
        width: 37,
        height: 37,
        //backgroundColor: 'red',
        padding: 5
    },
    boxImgLine: {
        width: '100%',
        height: 4,
        backgroundColor: COLOR_ROOT.MAIN_COLOR,
        borderRadius: 5
    },
    icon: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        marginBottom: 2
    }
});


export default BottomMenu;