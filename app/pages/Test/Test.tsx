import { StyleSheet, Modal, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';


const Test = () => {

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            console.log(e.absoluteX);
        });

    return (
        <Modal visible={true} >
            <GestureHandlerRootView style={{flex:1}} >
                <View style={styles.container} pointerEvents="box-none">
                    <GestureDetector gesture={panGesture}>
                        <Animated.View style={[styles.box]} />
                    </GestureDetector>
                </View>
            </GestureHandlerRootView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
  },
});

export default Test;