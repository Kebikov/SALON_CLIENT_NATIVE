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
    AdminAddGroup: undefined;
    AdminAddGroupForm: {
        choice: string;
    };
    SelectIcon: {
        choice: TChoiceImg
    }
};

export type TPageAdminAddGroupForm = {
    route: RouteProp<TypeRootPage, 'AdminAddGroupForm'>
}

export type TPageChoiсeImg = {
    route: RouteProp<TypeRootPage, 'SelectIcon'>
}

export interface IRoute {
    name: keyof TypeRootPage;
    component: ComponentType;
}