import { ComponentType } from "react";

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
    AdminAddGroupForm: undefined;
};

export interface IRoute {
    name: keyof TypeRootPage;
    component: ComponentType;
}