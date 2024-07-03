import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ButtonSwipeable from '@/components/widgets/ButtonSwipeable/ButtonSwipeable';
import DepartmentCartAdmin from '@/components/shared/DepartmentCartAdmin/DepartmentCartAdmin';

const Test: FC = () => {

    const press = () => {
       
    }

    return (
        <View style={styles.main}>
            <ButtonSwipeable 
                totalButton={2}
                paddingForButton={29}
                onPressButton1={press}
                iconForButton1={require('@/source/img/icon/bell-white.png')}
            >
                <DepartmentCartAdmin 
                    title={'Маникюр'} 
                    discription={'Лучший маникюр в городе.'} 
                    icon={'1.png'} 
                />
            </ButtonSwipeable>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc'},
});

export default Test;

