import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


interface IIosWrapperMenu {
    children: JSX.Element | JSX.Element[];
    marginTop?: number;
}


/**
 * @wrapper Оболочка для меню под IOS.
 * @optional
 * @param marginTop Отступ с верху.
 */
const IosWrapperMenu: FC<IIosWrapperMenu> = ({
    children,
    marginTop = 5
}) => {

    return (
        <View style={[styles.main, {marginTop: marginTop}]} >
            <View style={styles.container} >
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 3,
        borderRadius: 12,
        //backgroundColor: 'rgba(0, 0, 0, .1)',
        backgroundColor: 'white',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, 
    }
});

export default IosWrapperMenu;