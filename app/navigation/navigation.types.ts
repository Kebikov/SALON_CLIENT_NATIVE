import { ComponentType } from "react";
import { RouteProp } from "@react-navigation/native";

type TChoiceImg = 'icon-group' | null;

export type TypeRootPage = {
    Auth: undefined;
    AuthCreateAccount: undefined;
    AuthEnter: undefined;
    AuthForgot: undefined;
    Home: undefined;
    User: undefined;
    ChangePassword: undefined;
    //Admin
    AdminAdd: undefined;
    AdminAddDepartment: undefined;
    AdminAddDepartmentForm: {
        /**
         * `Выбранная иконка.` 
         * - Например: "16.png"
         */
        choice: string;
    };
    SelectIcon: undefined;
};

export type TPageAdminAddDepartmentForm = {
    route: RouteProp<TypeRootPage, 'AdminAddDepartmentForm'>
}


export interface IRoute {
    name: keyof TypeRootPage;
    component: ComponentType;
}