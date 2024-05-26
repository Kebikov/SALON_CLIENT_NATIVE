import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { COLOR_ROOT } from '@/data/colors';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';


interface IDownBottomSheet {
    bottomSheetRef: React.RefObject<BottomSheetMethods>
    children: JSX.Element | JSX.Element[];
    contentInScrollView: JSX.Element | JSX.Element[] | null;
}


/**
 * @shared `Выдвигаюшееся модальное окно с низу экрана.`
 * @param bottomSheetRef Ref для BottomSheet.
 * @param contentInScrollView Компоненты внутри скрола. 
 */
const DownBottomSheet: FC<IDownBottomSheet> = ({children, contentInScrollView, bottomSheetRef}) => {

    const snapPoints = useMemo(() => ['80%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} opacity={.2} />, []
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{backgroundColor: COLOR_ROOT.BACKGROUND, borderRadius: 30, overflow: 'hidden'}}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                {contentInScrollView}
            </BottomSheetScrollView>
            {children}
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default DownBottomSheet;