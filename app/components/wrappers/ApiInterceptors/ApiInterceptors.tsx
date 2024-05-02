import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';


/**
 * @wrapper Оболочка для перехвата запросов к серверу.
 * @example 
 * @returns {JSX.Element}
 */
const ApiInterceptors: FC = () => {

    return (
        <View>
            <Text>ApiInterceptors</Text>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default ApiInterceptors;