import { StatusBar, View, Platform } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/data/colors';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    titlePage?: string;
    scrollEnabled?: boolean;
}


/**
 * @wrapper `Обертка для страниц с :` 
 * - SafeAreaView 
 * - StatusBar
 * - ScrollView 
 * @param titlePage ? Шапка в веху страницы с заголовком.
 * @param scrollEnabled ? Разрешена ли прокрутка.
 * @example 
 * <WrapperScroll page={#}>
        {JSX.Element}
    </WrapperScroll>
 */
const WrapperScrollMenu: FC<IWrapper> = ({children, titlePage, scrollEnabled = true}) => {

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
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};


export default WrapperScrollMenu;


