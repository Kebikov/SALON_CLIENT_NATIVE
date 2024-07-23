import { StatusBar, View, Platform, StatusBarStyle } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/data/colors';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderTitle from '@/components/widgets/HeaderTitle/HeaderTitle';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    titlePage?: string;
    isScrollEnabled?: boolean;
    barStyle?: StatusBarStyle;
    backgroundColor?: string;
    imgFilter?: number;
    handlePessImgFilter?: Function;
}


/**
 * @wrapper `Обертка для страниц с :` 
 * - SafeAreaView 
 * - StatusBar
 * - ScrollView 
 * @param titlePage ? Заголовок страницы.
 * @param scrollEnabled ? Если не нужен ScrollView, передаем false.
 * @param barStyle ? Стиль StatusBar.
 * @param backgroundColor ? Цвет фона StatusBar.
 * @param imgFilter ? Иконка для дополнительной функциональности header.
 * @param handlePessImgFilter ? Функция обработки нажатия на иконку.
 * @example 
 * <WrapperScroll page={#}>
        {JSX.Element}
    </WrapperScroll>
 */
const WrapperScroll: FC<IWrapper> = ({
    children, 
    titlePage, 
    isScrollEnabled = true,
    barStyle = 'light-content',
    backgroundColor = COLOR_ROOT.MAIN_COLOR,
    imgFilter,
    handlePessImgFilter
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
                        <HeaderTitle text={titlePage} imgFilter={imgFilter} handlePessImgFilter={handlePessImgFilter} />
                        :
                        null
                    }
                    {
                        isScrollEnabled
                        ?
                        <ScrollView 
                            contentContainerStyle={{flexGrow: 1}} 
                            keyboardShouldPersistTaps={'handled'} 
                        >
                            {children}
                        </ScrollView>
                        :
                        <>
                            {children}
                        </>
                    }

                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};


export default WrapperScroll;


