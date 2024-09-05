import type { IReqEditMaster } from "@/api/routes/master/types/master.dto";
import type { IMasterFind } from "@/api/routes/master/types/master.dto";


import type { TRouteAdminSettingsMaster } from "../../app/admin/adminSettingsMaster/[id]";
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
    
    '/admin/adminEditService/[id]': ServiceDTOAndDepartmentName;

    '/admin/adminTimetable': undefined;
    '/admin/masterTimetable/[id]': IMasterFind;

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


    '/admin/adminAddServiceForMaster/[id]': TRouteAdminSettingsMaster;

    '/admin/adminSettingsMaster/[id]': {
        id: number;
        name: string;
        surname: string; 
        picture: string;
        departmentName: string | null;
    };
    '/admin/modal': undefined;

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
        string : 

        T[key] extends number | undefined 
        ? 
        string | undefined : 

        T[key] extends number | null
        ? 
        string : 

        T[key] extends string | undefined 
        ?
        string :

        T[key] extends string | null
        ?
        string :

        T[key];
};




