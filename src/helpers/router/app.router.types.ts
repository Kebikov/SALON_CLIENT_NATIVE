

export type AppRouterTypes = {
    '/': undefined;

    //: auth
    'auth/authCreateAccount': undefined;
    'auth/authEnter': undefined;
    'auth/authForgot': undefined;

    //: admin
    'admin': undefined;
    'admin/adminAdd': undefined;
    'admin/adminSettings': undefined;
    'admin/changePassword': undefined;

    'admin/adminAddDepartment': undefined;
    'admin/adminDepartment': undefined;
    'admin/[idEditDepartment]': { discription: string, icon: string, id: number, name: string };

    'admin/adminService': undefined;
    'admin/adminAddService': undefined;

    'admin/modal': undefined;

    //: user
    'user': undefined;
    'user/userSettings': undefined;
    'user/changePassword': undefined;

    //Admin
    'test': undefined;
};

