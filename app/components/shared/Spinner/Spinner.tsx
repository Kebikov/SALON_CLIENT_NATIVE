import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { FC } from 'react';


export interface ISpinner {
    visible: boolean;
}


/**
 * @shared  `Спинер загрузки.`
 * @param visible Видимость элемента.
 * @example <Spinner visible={#} />
 */
const Spinner: FC<ISpinner> = ({visible}) => {

    return (
        <>
            {
                visible
                ?
                <View style={{position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 100}}>
                    <ActivityIndicator size='large' color='#0000ff' />
                </View>
                :
                null
            }
        </>
        
    );
};


export default Spinner;