import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'flex-end'
    },
    container: { 
        width: '100%',
        overflow: 'hidden'
    },
    scrollView: { 
        flex: 1
    },
    header: { 
        width: '100%', 
        height: 40,
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, .07)'
    },
    line: {
        width: 34, 
        height: 5, 
        borderRadius: 4, 
        backgroundColor: 'blue' 
    },
    withoutScrollBox: {
        flex: 1
    }
});