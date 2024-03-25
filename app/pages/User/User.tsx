import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Wrapper from '@/shared/Wrapper/Wrapper';
import BottomMenu from '@/widgets/BottomMenu/BottomMenu';

/**
 * @page Страница пользователя.
 */
const User: FC = () => {

    return (
        <Wrapper>
            <View style={styles.main} >
                <View style={styles.box} >
                    <Text>USER</Text>
                </View>
            </View>
            <BottomMenu page='User' />
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    box: {

    }
});

export default User;