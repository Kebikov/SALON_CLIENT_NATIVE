// router.navigate({pathname: '(admin)/[idEditDepartment]', params: {idEditDepartment: id}});

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
    '(admin)/changePassword': undefined;

    '(admin)/adminAddDepartment': undefined;
    '(admin)/adminDepartment': undefined;
    '(admin)/[idEditDepartment]': { idEditDepartment: number };

    //: (user)
    '(user)': undefined;
    '(user)/userSettings': undefined;
    '(user)/changePassword': undefined;

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
