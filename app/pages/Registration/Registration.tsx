import { View, Text, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import React, { FC } from 'react';

/**
 * @component
 * @example 
 * @returns {JSX.Element}
 */
const Registration: FC = () => {

    return (
        <>
            <StatusBar backgroundColor={'rgba(0,0,0,0)'} translucent />
            <ImageBackground style={styles.main} source={require('@/source/img/auth/main-crop.jpg')} >
                <View style={styles.overlay} />
                
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
});

export default Registration;