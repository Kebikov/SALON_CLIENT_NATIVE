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
    AdminDepartment: undefined;
    AdminAddDepartment: undefined;
    AdminEditDepartment: {
        /**
         * Id группы которую редактируем.
         */
        idDepartment: number;
    };
    AdminService: undefined;
    AdminAddService: undefined;
    Test: undefined;
};


export interface IRoute {
    name: keyof TypeRootPage;
    component: ComponentType;
}