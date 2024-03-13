import { ComponentType } from "react";

export type TypeRootPage = {
    Auth: undefined;
    Home: undefined;
    Registration: undefined;
};

export interface IRoute {
    name: keyof TypeRootPage;
    component: ComponentType;
}