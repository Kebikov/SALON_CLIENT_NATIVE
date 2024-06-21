import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';
import ButtonWithIcon from '../../components/shared/ButtonWithIcon/ButtonWithIcon';
import { useHookRouter } from '@/helpers/router/useHookRouter';


/**
 * @page `Страница с услугами и кнопкой добавления услуги.`
 * @example 
 * @returns {JSX.Element}
 */
const AdminService: FC = () => {

    const {appRouter} = useHookRouter();

    return (
        <WrapperMenu titlePage='Услуги'>
            <View style={styles.main} >
                <ServiceCart title='Маникюр ручной' department='Маникюр' time={34} price={45} img={'1718492942870.jpg'}/>
            </View>
            <View style={styles.boxButton}>
                <ButtonWithIcon 
                    title='добавить услугу'
                    pushButton={() => {
                        appRouter.push('(admin)/adminAddService');
                    }} 
                    img={require('@/source/img/icon/plus-white.png')} 
                    marginTop={10} 
                />
            </View>
        </WrapperMenu>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 5 },
    boxButton: { paddingHorizontal: 10, marginBottom: 5 },
});

export default AdminService;