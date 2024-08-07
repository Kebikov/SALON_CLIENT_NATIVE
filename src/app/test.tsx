import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Button } from 'react-native';
import Calendar from '@/components/widgets/CalendarDataTime/Calendar';



const Test: FC = () => {



    return (
        <View style={styles.main}>
            <Calendar/>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: '#ccc',
        paddingTop: 50
    }
});

export default Test;

