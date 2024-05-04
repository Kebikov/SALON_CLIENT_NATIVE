import { View, ActivityIndicator } from 'react-native';
import React, { FC } from 'react';
import { useAppSelector } from '@/redux/store/hooks';


/**
 * @shared  `Спинер загрузки.`
 * - Управление видимостью элемента через redux modalSlice.spiner.
 * @example <Spinner/>
 */
const Spinner: FC = () => {

    const {isShowSpinner} = useAppSelector(state => state.modalSlice.spiner);

    return (
        <>
            {
                isShowSpinner
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