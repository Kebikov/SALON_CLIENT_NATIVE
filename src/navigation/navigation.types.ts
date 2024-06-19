import { ComponentType } from "react";


export type TypeRootPage = {
    auth: undefined;
    authCreateAccount: undefined;
    authEnter: undefined;
    authForgot: undefined;
    home: undefined;
    user: undefined;
    changePassword: undefined;
    //Admin
    adminAdd: undefined;
    adminDepartment: undefined;
    adminAddDepartment: undefined;
    adminEditDepartment: {
        /**
         * Id группы которую редактируем.
         */
        idDepartment: number;
    };
    adminService: undefined;
    adminAddService: undefined;
    test: undefined;
};
