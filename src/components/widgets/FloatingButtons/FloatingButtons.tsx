import { View, Text, StyleSheet, LayoutChangeEvent, Pressable, DimensionValue } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { COLOR_ROOT } from '@/data/colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import VibrationApp from '@/helpers/helpersForComponents/vibration/VibrationApp';


interface IOneButton {
    title: string;
    handlePress: () => void;
}

interface IFloatingButtons {
    buttonsArray: IOneButton[];
    backgroundColorButtons?: string;
    heightContainer?: number;
    widthContainer?: number;
}

const PADDING = 8;

/**
 * @widget `Плаваюшие кнопки.`
 * @param buttonsArray Массив обьектов с заголовками и функцией сработаюшей при нажатии кнопки.
 * @optional below
 * @param backgroundColorButtons ? Фон для тела кнопок.
 * @param heightContainer ? Высота контейнера.
 * @param widthContainer ? Ширина контейнера.
 */
const FloatingButtons: FC<IFloatingButtons> = ({
    buttonsArray,
    backgroundColorButtons = COLOR_ROOT.LIGHT_BLUE,
    heightContainer = 20,
    widthContainer = 80
}) => {
    if(buttonsArray.length < 2) throw new Error('В компаненте FloatingButtons, массив totalButtons, должен состоять из двух или трех объектов.');
    /**
     * `Сдвиг(относительный left) активной кнопки.`
     */
    const svLeft = useSharedValue<number>(3);
    /**
     * @param widthButtons Ширина контейнера для кнопок.
     */
    const [widthButtons, setWidthButtons] = useState<number>(0);
    /**
     * @param textButton Текст активной кнопки.
     */
    const [textButton, setTextButton] = useState<string>(buttonsArray.length === 2 ? buttonsArray[0].title : buttonsArray[1].title);
    /**
     * `Массив элементов кнопок.`
     */
    const buttons = buttonsArray.map((item, i) => {
        return(
            <Pressable 
                onPress={() => {
                    VibrationApp.select();
                    item.handlePress();
                    moveButton(i, item.title);
                }}
                style={[styles.button, {width: `${100 / buttonsArray.length}%`}, i !== 0 ? styles.line : null]} 
                key={i}
            >
                <Text style={styles.buttonText} >{item.title}</Text>
            </Pressable>
        )
    })

    const animationStyle = useAnimatedStyle(() => {
        return {
            left: svLeft.value
        }
    })

    const moveButton = (num: number, title: string) => {
        'worklet';
        const length = buttonsArray.length;
        const minus = length === 3 ? 2 : 7;
        let move: number;
        switch(num) {
            case 0:
                move = 3;
                break;
            case 1:
                move = widthButtons / length - minus;
                break;
            case 2:
                move = widthButtons * num / length - 7;
                break;
            default:
                move = 0;
                break;
        }
        svLeft.value = withTiming(move, {duration: 300});
        runOnJS(setTextButton)(title);
    }
    /**
     * `Опиределение и установка ширины контейнера для кнопок.`
     */
    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setWidthButtons(width);
    }

    useEffect(() => {
        const length = buttonsArray.length;
        if(length === 3) svLeft.value = widthButtons / length - 2;
    }, [widthButtons]);

    
    return (
        <View style={[styles.main]} >
            <View style={[styles.body, {backgroundColor: backgroundColorButtons,
                width: `${widthContainer}%`
            }]}>
                <Animated.View style={[styles.floating, {width: widthButtons / buttonsArray.length + 4, height: heightContainer + PADDING * 2 - 6,}, animationStyle]} >
                    <Text style={styles.buttonText} >{textButton}</Text>
                </Animated.View>
                <View style={[styles.container, {height: heightContainer}]} onLayout={onLayout} >
                    { buttons }
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        width: '100%',
        alignItems: 'center'
    },
    body: {
        position: 'relative',
        paddingVertical: PADDING,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,

        shadowColor: 'rgba(0, 0, 0, .7)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, 
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {

        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 14,
        color: COLOR_ROOT.BLACK,
        textAlign: 'center',
        paddingHorizontal: 6,
    },
    line: {
        borderColor:  COLOR_ROOT.BLACK,
        borderLeftWidth: 1
    },
    floating: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        top: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,

        borderRadius : 8,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, 
    }
});

export default FloatingButtons;