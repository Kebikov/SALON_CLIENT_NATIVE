import { ComponentType } from "react";
import { TypeParamsForNextPage } from "./extra.types";



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
    AdminAddGroupDepartment: undefined;
    AdminEditDepartment: {
        /**
         * Id группы которую редактируем.
         */
        idDepartment: number;
    }
};


export interface IRoute {
    name: keyof TypeRootPage;
    component: ComponentType;
}