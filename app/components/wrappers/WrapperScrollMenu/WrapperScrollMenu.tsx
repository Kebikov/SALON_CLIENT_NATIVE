import { StatusBar, View, Platform } from 'react-native';
import React, { FC, Fragment } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/data/colors';
import { TypeRootPage } from '@/navigation/navigation.types';
import { ScrollView } from 'react-native-gesture-handler';
import BottomMenu from '@/components/widgets/BottomMenu/BottomMenu';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    page: keyof TypeRootPage;
    titlePage?: string;
    scrollEnabled?: boolean;
}


/**
 * @wrapper `Обертка для страниц с :` 
 * - SafeAreaView 
 * - StatusBar
 * - ScrollView 
 * - BottomMenu
 * @param page Страница на которой был использован компонент.
 * @param titlePage ? Шапка в веху страницы с заголовком.
 * @param scrollEnabled ? Разрешена ли прокрутка.
 * @example 
 * <WrapperScroll page={#}>
        {JSX.Element}
    </WrapperScroll>
 */
const WrapperScrollMenu: FC<IWrapper> = ({children, page, titlePage, scrollEnabled = true}) => {

    return (
        <>
            <View style={{backgroundColor: COLOR_ROOT.MAIN_COLOR, height: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight}} >
                <StatusBar animated={true} barStyle={'light-content'} backgroundColor={COLOR_ROOT.MAIN_COLOR} />
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
                    <BottomMenu page={page} />
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};


export default WrapperScrollMenu;


