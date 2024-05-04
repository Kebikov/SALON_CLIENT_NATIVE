import { StatusBar } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/data/colors';
import { TypeRootPage } from '@/navigation/navigation.types';
import BottomMenu from '@/components/widgets/BottomMenu/BottomMenu';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    page: keyof TypeRootPage;
    titlePage?: string;
}


/**
 * @wrapper `Обертка для страниц с :`
 * - SafeAreaView 
 * - StatusBar
 * - BottomMenu
 * @param page Страница на которой был использован компонент.
 * @param titlePage ? Шапка в веху страницы с заголовком.
 * @example 
 * <WrapperScroll page={#}>
        {JSX.Elements}
    </WrapperScroll>
 */
const WrapperMenu: FC<IWrapper> = ({children, page, titlePage}) => {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar animated={true} barStyle={'light-content'} backgroundColor={COLOR_ROOT.MAIN_COLOR} />
                {
                    titlePage ?
                    <HeaderTitle text={titlePage} />
                    :
                    null
                }
                {children}
                <BottomMenu page={page} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


export default WrapperMenu;