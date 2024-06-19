
export type AppRouterTypes = {
    '/': undefined;

    //: (auth)
    '(auth)/authCreateAccount': undefined;
    '(auth)/authEnter': undefined;
    '(auth)/authForgot': undefined;

    //: (admin)
    '(admin)': undefined;
    '(admin)/adminAdd': undefined;
    '(admin)/adminSettings': undefined;

    //: (user)
    '(user)': undefined;
    '(user)/userSettings': undefined;


    changePassword: undefined;
    //Admin
    
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
