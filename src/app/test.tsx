import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Button } from 'react-native';




const Test: FC = () => {

    const press = () => {
        //refClock.current?.openClock();
    }

    return (
        <View style={styles.main}>
           <Button title='open modal' onPress={press}  />
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

