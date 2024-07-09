// import { View, Text, StyleSheet } from 'react-native';
// import React, { FC } from 'react';
// import BottomModalSheet from '@/components/wrappers/BottomModalSheet/BottomModalSheet';

// import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';


// interface IBottomModalSheetWithDepartment {
//     bottomSheetRef: React.RefObject<IRefBottomModalSheet>;
// }


// /**
//  * @widgets `Нижнее модальное окно с группами.`
//  * @param bottomSheetRef Ref для модального окна.
//  */
// const BottomModalSheetWithDepartment: FC<IBottomModalSheetWithDepartment> = ({
//     bottomSheetRef
// }) => {

//     return (
//         <BottomModalSheet 
//             ref={bottomSheetRef} 
//             heightProcent={50} 
//             isWithScrooll={false}
//         >
//             <View style={styles.sheet_header}>
//                 <Text style={styles.sheet_title}>Фильтр услуг</Text>
//             </View>
//             <View style={styles.main_sheet} >
//                 {
//                     sheetDepartments.length > 2
//                     ?
//                     <FlatList
//                         contentContainerStyle={{ gap: 0, paddingBottom: 10 }}
//                         data={sheetDepartments}
//                         renderItem={ 
//                             ({item, index}) => (
//                                 <Pressable
//                                     style={index === 0 ? [styles.sheet_button_first, styles.sheet_button] : styles.sheet_button}
//                                     onPress={() => {
//                                         setCurentFilter(item.name);
//                                         closeList();
//                                     }}
//                                 >
//                                     <View style={styles.sheet_box_img} >
//                                         <Image style={styles.sheet_img} source={
//                                                 item.icon === 'icon все услуги'
//                                                 ?
//                                                 require('@/source/img/icon/all.png')
//                                                 :
//                                                 item.icon === 'icon нет группы'
//                                                 ?
//                                                 require('@/source/img/icon/not.png')
//                                                 :
//                                                 item.icon
//                                                 ?
//                                                 {uri: `${baseLink}/api/img/get-img/${item.icon}?type=icon_icon-group`}
//                                                 :
//                                                 null
//                                             } 
//                                         />
//                                     </View>
//                                     <Text style={styles.shet_text}>{item.name}</Text>
//                                 </Pressable>
//                             ) 
//                         }
//                         keyExtractor={item => item.name ?? 'key'}
//                         horizontal={false}
//                         showsHorizontalScrollIndicator={false}
//                     />
//                     :
//                     null
//                 }
//             </View>
//         </BottomModalSheet>
//     );
// };

// const styles = StyleSheet.create({
//     // sheet
//     main_sheet: {
//         flex: 1, padding: 10
//     },
//     sheet_header: {
//         backgroundColor: COLOR_ROOT.MAIN_COLOR, 
//         paddingVertical: 5
//     },
//     sheet_title: {
//         textAlign: 'center', 
//         fontSize: 16, 
//         fontWeight: '500', 
//         color: 'white'
//     },
//     sheet_button_first: { 
//         borderTopColor: COLOR_LINE, 
//         borderTopWidth: 1
//     },
//     sheet_button: {
//         paddingVertical: 5, 
//         borderBottomColor: COLOR_LINE, 
//         borderBottomWidth: 1, 
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     shet_text: {
//         fontSize: Platform.OS === 'ios' ? 16 : 15,
//         marginLeft: 10
//     },
//     sheet_box_img: {
//         width: Platform.OS === 'ios' ? 32 : 30, 
//         height: Platform.OS === 'ios' ? 32 : 30, 
//         borderRadius: 200, 
//         borderColor: COLOR_ROOT.MAIN_COLOR, 
//         borderWidth: 1, 
//         padding: 4
//     },
//     sheet_img: {resizeMode: 'contain', width: '100%', height: '100%'}
// });


// export default BottomModalSheetWithDepartment;