import { COLOR_ROOT } from '@/data/colors';
import { View, StyleSheet, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { FC } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import DepartmentCartAdmin from '@/components/shared/DepartmentCartAdmin/DepartmentCartAdmin';
import ButtonWithIcon from '@/components/shared/ButtonWithIcon/ButtonWithIcon';
import Discription from '@/components/shared/Discription/Discription';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TypeRootPage } from '@/navigation/navigation.types';
import NotElements from '@/components/shared/NotElements/NotElements';
import { useHookGetDataDepartments } from '@/hooks/useHookGetDataDepartments';
import ButtonSwipeable from '@/components/widgets/ButtonSwipeable/ButtonSwipeable';


/**
 * @page `Страница с кнопкой добавления департамента.`
 * - С уже добавленными департаментами также.
 */
const AdminAddDepartment: FC= () => {
    const {dataDepartments} = useHookGetDataDepartments();

    const {navigate} = useNavigation<NavigationProp<TypeRootPage>>();

    const goEditDepartment = (id: number) => {
        navigate('AdminEditDepartment', {idDepartment: id});
    }

    return (
        <>
            <WrapperMenu page='AdminAddDepartment' titlePage='Группы услуг' >
            
                <View style={styles.main} >
                    <Discription text='Работа с группами услуг. Для обьединения услуг в определенные группы.' marginTop={10}/>
                    {
                        dataDepartments 
                        ?
                        <FlatList
                            contentContainerStyle={{gap: 10, margin: Platform.OS === 'ios' ? 0 : 5}}
                            data={dataDepartments}
                            scrollEventThrottle={16}
                            renderItem={({item}) =>  
                                <ButtonSwipeable
                                    totalButton={2}
                                    paddingForButton={30}
                                    onPressButton1={() => goEditDepartment(item.id)}
                                    colorButton1={COLOR_ROOT.BUTTON_COLOR_YELLOW}
                                    iconForButton1={require('@/source/img/icon/edit-btn.png')}

                                    colorButton2={COLOR_ROOT.BUTTON_COLOR_RED}
                                    iconForButton2={require('@/source/img/icon/del-btn.png')}
                                >
                                    <DepartmentCartAdmin 
                                        title={item.name} 
                                        discription={item.discription} 
                                        icon={item.icon} 
                                    />
                                </ButtonSwipeable>
                            }
                            keyExtractor={item => String(item.id)}
                            extraData={dataDepartments}
                            ListEmptyComponent={<NotElements title='Нет групп.'/>}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        null
                    }
                </View>
                
                <View style={styles.boxButton}>
                    <ButtonWithIcon 
                        title='добавить группу' 
                        pushButton={() => navigate('AdminAddGroupDepartment')} 
                        img={require('@/source/img/icon/plus-white.png')} 
                        marginTop={10} 
                    />
                </View>

            </WrapperMenu> 
        </>
    );
};


const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 15
    },
    boxButton: {
        paddingHorizontal: 10,
        marginBottom: 5,
    }
});

export default AdminAddDepartment;