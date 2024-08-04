import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/data/colors';


interface IButtonSelectDepartment {
    openList: () => void | undefined;
    nameSelectedDepatment: string;
}


/**
 * @shared `Кнопка выбора группы.`
 */
const ButtonSelectDepartment: FC<IButtonSelectDepartment> = ({openList, nameSelectedDepatment}) => {
    console.log(nameSelectedDepatment);
    return (
        <Pressable 
            onPress={openList}
            style={styles.button}
        >
            <Text style={[styles.buttonText, {fontSize: Platform.OS === 'ios' ? 15 : 13}]} >Выбор группы</Text>
            {
                nameSelectedDepatment 
                ?
                <Text style={[styles.buttonText, {fontSize: Platform.OS === 'ios' ? 12 : 11}]} >{nameSelectedDepatment}</Text>
                :
                null
            }
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10, 
        overflow: 'hidden', 
        marginTop: 10, 
        backgroundColor: COLOR_ROOT.GRAY,
        paddingVertical: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '500',
    }
});

export default ButtonSelectDepartment;