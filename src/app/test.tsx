import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';




const Test: FC = () => {

    const press = () => {
        //refClock.current?.openClock();
    }

    return (
        <View style={styles.main}>
            <FlatList
                data={ [
                    "2023-08-01", 
                    "2023-09-01", 
                    "2023-10-01", 
                    "2023-11-01", 
                    "2023-12-01", 
                    "2024-01-01", 
                    "2024-02-01", 
                    "2024-03-01", 
                    "2024-04-01", 
                    "2024-05-01", 
                    "2024-06-01", 
                    "2024-07-01", 
                    "2024-08-01", 
                    "2024-09-01", 
                    "2024-10-01", 
                    "2024-11-01", 
                    "2024-12-01", 
                    "2025-01-01", 
                    "2025-02-01", 
                    "2025-03-01", 
                    "2025-04-01", 
                    "2025-05-01", 
                    "2025-06-01", 
                    "2025-07-01", 
                    "2025-08-01"]}
                renderItem={ ({index, item}: {index: number, item: string}) => {
                    
                    return(
                        <Text>{item}</Text>
                    )
                }}
                keyExtractor={item => item}
            /> 
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

