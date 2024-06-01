// import React, { useState } from 'react';
// import { StyleSheet, TextInput, View, Text } from 'react-native';
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import Animated, { runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, 
//     withDelay, withTiming, clamp, interpolate } from 'react-native-reanimated';

// const INITIAL_POS_Y_INPUT = -50;
// const INITIAL_POS_Y_SCROLL = 0;
// const DELAY_RESET_POSITION = 500;


// const Test = () => {

//     const mainSv = useSharedValue(0);
//     const isScrollActive = useSharedValue(false);
//     const [isPanEnabled, setIsPanEnabled] = useState(true);

//     const updatePanState = (offset: number) => {
//         'worklet';
//         if (offset > 0) {
//             runOnJS(setIsPanEnabled)(false);
//         } else if (offset === 0) {
//             runOnJS(setIsPanEnabled)(true);
//         }
//     };

//     const scrollPanGesture = Gesture.Pan()
//         .onUpdate(({ translationY }) => {
            
//             console.log('translationY >>> ', translationY);
//             console.log('isScrollActive.value >>> ', isScrollActive.value);

//             if(translationY > 0 && isScrollActive.value) {
//                 mainSv.value = translationY;
//             } else {
//                 isScrollActive.value = true;
//             }
//         })
//         .onEnd(() => {
//             mainSv.value = withTiming(0, {duration: 300})
//         })
//         //.enabled(isPanEnabled);

//     const nativeGesture = Gesture.Native();
//     const composedGestures = Gesture.Simultaneous(
//         scrollPanGesture,
//         nativeGesture,
//     );

//     const onScroll = useAnimatedScrollHandler({
//         onBeginDrag({ contentOffset }) {
//             console.log('onBeginDrag');
//             updatePanState(contentOffset.y);
//         },
//         onScroll({ contentOffset }) {
//             console.log('contentOffset >>> ', contentOffset.y);

//             if(contentOffset.y === 0) {
//                 isScrollActive.value = false;
//             } else {
//                 isScrollActive.value = true;
//             }

//             updatePanState(contentOffset.y);
//         },
//         onEndDrag({ contentOffset }) {
//             console.log('onEndDrag');
//             updatePanState(contentOffset.y);
//         },
//         onMomentumEnd({ contentOffset }) {
//             console.log('onMomentumEnd');
//             updatePanState(contentOffset.y);
//         },
//     });

//     const mainAnimatedStyle = useAnimatedStyle(() => {
//         return {
//             transform: [
//                 {
//                     translateY: mainSv.value
//                 }
//             ]
//         }
//     });
//     const size = 88;

//     return (
//         <View style={styles.main}>
//             <Animated.View style={[styles.container, mainAnimatedStyle]}>
//                 <GestureDetector gesture={composedGestures}>
//                     <Animated.ScrollView
//                         onScroll={onScroll}
//                         bounces={false}
//                         scrollEventThrottle={16}
//                         showsVerticalScrollIndicator={false}
//                         style={[styles.scrollView, {pointerEvents: 'auto'}]}
//                     >
//                     <Text style={{fontSize: size}}>1 Lorem</Text>
//                     <Text style={{fontSize: size}}>2 Lorem</Text>
//                     <Text style={{fontSize: size}}>3 Lorem</Text>
//                     <Text style={{fontSize: size}}>4 Lorem</Text>
//                     <Text style={{fontSize: size}}>5 Lorem</Text>
//                     <Text style={{fontSize: size}}>6 Lorem</Text>
//                     <Text style={{fontSize: size}}>7 Lorem</Text>
//                     <Text style={{fontSize: size}}>Lorem</Text>
//                     <Text style={{fontSize: size}}>Lorem</Text>
//                     <Text style={{fontSize: size}}>Lorem</Text>
//                     <Text style={{fontSize: size}}>Lorem</Text>
//                     <Text style={{fontSize: size}}>Lorem</Text>
//                     </Animated.ScrollView>
//                 </GestureDetector>
//             </Animated.View>
//         </View>
//     );
// };

// export default Test;

// const styles = StyleSheet.create({
//     main: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'flex-end'
//     },
//     container: { width: '100%', height: '70%', backgroundColor: 'white' },
//     scrollView: { flex: 1, backgroundColor: 'white', padding: 16 },
//     textInput: { position: 'absolute', marginTop: 16, marginHorizontal: 16 },
// });