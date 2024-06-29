import type { TRole } from '@/api/routes/registration/types/registration.types';
import { AppRouterTypes } from '@/helpers/router/app.router.types';

export type TKeyPage =  keyof AppRouterTypes;

export interface IButtonPage {
    id: number;
    page: TKeyPage | null; 
    img: number;
}

type TMenu = {
    [key in TRole]: IButtonPage[] | null;
};

const listMenuClient: Array<IButtonPage> = [
    {
        id: 1,
        page: '/user',
        img: require('@/source/img/icon/home.png')
    },
    {
        id: 2,
        page: null,
        img: require('@/source/img/icon/bookmark.png')
    },
    {
        id: 3,
        page: null,
        img: require('@/source/img/icon/calendar.png')
    },
    {
        id: 4,
        page: '/user/userSettings',
        img: require('@/source/img/icon/user.png')
    }
];

const listMenuAdmin: Array<IButtonPage> = [
    {
        id: 1,
        page: '/admin',
        img: require('@/source/img/icon/home.png')
    },
    {
        id: 2,
        page: '/admin/adminAdd',
        img: require('@/source/img/icon/add.png')
    },
    {
        id: 3,
        page: '/admin/adminSettings',
        img: require('@/source/img/icon/user.png')
    }
];

const menu: TMenu = {
    'client': listMenuClient,
    'master': null,
    'admin': listMenuAdmin
};

export default menu;




