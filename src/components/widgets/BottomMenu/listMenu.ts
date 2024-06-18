import type { TRole } from '@/api/routes/registration/types/registration.types';
import { TypeRootPage } from '@/navigation/navigation.types';

export type TKeyPage =  keyof TypeRootPage;

export interface IButtonPage {
    id: number;
    page: TKeyPage | null; 
    params?: TypeRootPage[TKeyPage];
    img: number;
}



type TMenu = {
    [key in TRole]: IButtonPage[] | null;
};

const listMenuClient: Array<IButtonPage> = [
    {
        id: 1,
        page: 'Home',
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
        page: 'User',
        img: require('@/source/img/icon/user.png')
    }
];

const listMenuAdmin: Array<IButtonPage> = [
    {
        id: 1,
        page: 'Home',
        img: require('@/source/img/icon/home.png')
    },
    {
        id: 2,
        page: 'AdminAdd',
        img: require('@/source/img/icon/add.png')
    },
    {
        id: 3,
        page: 'User',
        img: require('@/source/img/icon/user.png')
    }
];

const menu: TMenu = {
    'client': listMenuClient,
    'master': null,
    'admin': listMenuAdmin
};

export default menu;