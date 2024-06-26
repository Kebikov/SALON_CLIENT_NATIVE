import { StatusBar, View, Platform } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/data/colors';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    titlePage?: string;
}


/**
 * @wrapper `Обертка для страниц с :`
 * - SafeAreaView 
 * - StatusBar
 * @param titlePage ? Шапка в веху страницы с заголовком.
 * @example 
 * <WrapperScroll page={#}>
        {JSX.Elements}
    </WrapperScroll>
 */
const WrapperMenu: FC<IWrapper> = ({children, titlePage}) => {

    return (
        <>
            <View style={{backgroundColor: COLOR_ROOT.MAIN_COLOR, height: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight}} >
                <StatusBar animated={true} barStyle={'light-content'} backgroundColor={COLOR_ROOT.MAIN_COLOR} hidden={false} />
            </View>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: COLOR_ROOT.BACKGROUND }} >
                    {
                        titlePage ?
                        <HeaderTitle text={titlePage} />
                        :
                        null
                    }
                    {children}
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};


export default WrapperMenu;