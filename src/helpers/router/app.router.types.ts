import type { ServiceDTOAndDepartmentName } from "@/api/routes/service/types/service.types";
import type { IReqEditMaster } from "@/api/routes/master/types/master.dto";
import type { IMasterFind } from "@/api/routes/master/types/master.dto";


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
        id: number;
        title: string;
        description: string;
        price: number;
        time: number;
        img: string;
        id_department?: number; 
        name?: string;
    };

    '/admin/adminMaster': undefined;
    '/admin/adminAddMaster': undefined;
    '/admin/adminEditMaster/[id]': {
        id: number;
        name: string;
        surname: string;
        description: string;
        phone: string;
        picture: string;
        access_ban: number;
        id_department: number | null;
        email: string;
        department_name: string | null;
    };


    '/admin/adminAddServiceForMaster/[id]': {
        id: string;
        name: string;
        surname: string;
        picture: string;
        department_name?: string;
    };
    '/admin/modal': undefined;
    '/admin/adminAllMasters': undefined;

    //: user
    '/user': undefined;
    '/user/userSettings': undefined;
    '/user/changePassword': undefined;

    //Admin
    '/test': undefined;
};


export type TTypeToString<T> = {
    [key in keyof T]: 
        T[key] extends number 
        ? 
        string 
        : 
        T[key] extends number | undefined 
        ? 
        string
        : 
        T[key] extends number | null
        ?
        string
        :
        T[key] extends string | null
        ?
        string
        :
        T[key];
};




