import { StatusBar, StatusBarStyle } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';


interface IWrapperScroll {
    children: JSX.Element | JSX.Element[];
    backgroundColor: string;
    barStyle: StatusBarStyle;
}

/**
 * @wrapper Обертка для страниц с : 
 * - SafeAreaView 
 * - StatusBar
 * - ScrollView 
 * @param color Цвет статус бара.
 * @param barStyle Стиль статус бара.
 * @example 
 * <WrapperScroll color='white' barStyle='dark-content' >
        {JSX.Element}
    </WrapperScroll>
 */
const WrapperScroll: FC<IWrapperScroll> = ({children, backgroundColor, barStyle}) => {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar animated={true} barStyle={barStyle} backgroundColor={backgroundColor} />
                <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={'handled'} >
                    {children}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


export default WrapperScroll;