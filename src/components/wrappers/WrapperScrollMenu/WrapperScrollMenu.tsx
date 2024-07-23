import { StatusBar, View, Platform, StatusBarStyle } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/data/colors';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    titlePage?: string;
    scrollEnabled?: boolean;
    barStyle?: StatusBarStyle;
    backgroundColor?: string;
}


/**
 * @wrapper `Обертка для страниц с :` 
 * - SafeAreaView 
 * - StatusBar
 * - ScrollView 
 * @param titlePage ? Заголовок страницы.
 * @param scrollEnabled ? Включить/выключить ScrollView.
 * @param barStyle ? Стиль StatusBar.
 * @param backgroundColor ? Цвет фона StatusBar.
 * @example 
 * <WrapperScrollMenu page={#}>
        {JSX.Element}
    </WrapperScrollMenu>
 */
const WrapperScrollMenu: FC<IWrapper> = ({
    children, 
    titlePage, 
    scrollEnabled = true,
    barStyle = 'light-content',
    backgroundColor = COLOR_ROOT.MAIN_COLOR
}) => {

    return (
        <>
            <View style={{backgroundColor, height: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight}} >
                <StatusBar animated={true} barStyle={barStyle} backgroundColor={backgroundColor} />
            </View>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f1f7' }}>
                    {
                        titlePage ?
                        <HeaderTitle text={titlePage} />
                        :
                        null
                    }
                    <ScrollView 
                        contentContainerStyle={{flexGrow: 1}} 
                        keyboardShouldPersistTaps={'handled'} 
                        scrollEnabled={scrollEnabled}
                    >
                            {children}
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};


export default WrapperScrollMenu;


