import { useRouter } from 'expo-router';
import BottomModalSheetWithDepartment from '@/components/widgets/BottomModalSheetWithDepartment/BottomModalSheetWithDepartment';
import InputMasterName from '@/components/shared/shared_AdminAddMaster/InputMasterName';
import InputMasterSurname from '@/components/shared/shared_AdminAddMaster/InputMasterSurname';
import InputMasterDescription from '@/components/shared/shared_AdminAddMaster/InputMasterDescription';
import InputMasterPhone from '@/components/shared/shared_AdminAddMaster/InputMasterPhone';
import InputMasterEmail from '@/components/shared/shared_AdminAddMaster/InputMasterEmail';
import InputMasterPassword from '@/components/shared/shared_AdminAddMaster/InputMasterPassword';
import { addMaster } from '@/helpers/helpersForComponents/adminAddMaster/addMaster';

import type { IRefBottomModalSheet } from '@/components/wrappers/BottomModalSheet/types';
import type { IAddMaster } from '@/api/routes/master/types/master.dto';

/**
 * @component
 * @example 
 * @returns {JSX.Element}
 */
const FormMaster: FC = () => {

    return (
        <View>
            <Text>FormMaster</Text>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default FormMaster;