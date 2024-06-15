import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperMenu from '@/components/wrappers/WrappersMenu/WrappersMenu';
import ServiceCart from '@/components/shared/ServiceCart/ServiceCart';

/**
 * @page Страница с услугами и кнопкой добавления услуги.
 * @example 
 * @returns {JSX.Element}
 */
const AdminService: FC = () => {

    return (
        <WrapperMenu titlePage='Услуги' page='AdminService' >
            <View style={styles.main} >
                <Text>AdminAddService</Text>
                {/* <ServiceCart title='' /> */}
            </View>
        </WrapperMenu>
    );
};

const styles = StyleSheet.create({
    main: { flex: 1, paddingHorizontal: 15 },
});

export default AdminService;