import type { ServiceDTOAndDepartmentName } from "@/api/routes/service/types/service.types";


export type AppRouterTypes = {
    '/': undefined;

    //: auth
    '/auth/authCreateAccount': undefined;
    '/auth/authEnter': undefined;
    '/auth/authForgot': undefined;

    //: admin
    '/admin': undefined;
    '/admin/adminAdd': undefined;
    '/admin/adminSettings': undefined;
    '/admin/changePassword': undefined;

    '/admin/adminAddDepartment': undefined;
    '/admin/adminDepartment': undefined;
    '/admin/adminEditDepartment/[id]': { 
        discription: string, 
        icon: string, 
        id: number, 
        name: string 
    };

    '/admin/adminService': undefined;
    '/admin/adminAddService': undefined;
    '/admin/adminEditService/[id]': {
        id: number, 
        title: string, 
        description: string, 
        price: number, 
        time: number, 
        img: string, 
        id_department?: number, 
        name?: string 
    }


    '/admin/modal': undefined;

    //: user
    '/user': undefined;
    '/user/userSettings': undefined;
    '/user/changePassword': undefined;

    //Admin
    'test': undefined;
};


export type TNumbersToString<T> = {
    [key in keyof T]: T[key] extends number ? string : T[key] extends number | undefined ? string | undefined : T[key];
};




