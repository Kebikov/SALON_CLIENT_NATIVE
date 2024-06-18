import { TypeRootPage } from '@/navigation/navigation.types';
import { RouteProp } from "@react-navigation/native";

type TkeyTypeRootPage = keyof TypeRootPage;


export type TypeParamsForNextPage = {
    AdminEditDepartment: {
        idDepartment: number;
    }
}

export type TPageAdminEditDepartment = {
    route: RouteProp<TypeRootPage, 'AdminEditDepartment'>
}



