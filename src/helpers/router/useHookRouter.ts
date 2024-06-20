import { useRouter } from "expo-router";
import type { AppRouterTypes } from "@/helpers/router/app.router.types";

// interface IObjectParams {
//     pathname: keyof AppRouterTypes;
//     params: AppRouterTypes
// }

// type TKeyApp = keyof AppRouterTypes;

// type TPath = AppRouterTypes

// type IObjectParams= {
//     pathname: [T in TKeyApp]
//     params: A
// }

// const foo: IObjectParams = {
//     pathname: '(admin)/[idEditDepartment]',
//     params: 
// }

export const useHookRouter = () => {
    const router = useRouter();

    class AppRouter {

        push(path: keyof AppRouterTypes) {
            router.push(path);
        }
    
        navigate(path: keyof AppRouterTypes) {
            router.navigate(path)
        }
    
        replace(path: keyof AppRouterTypes) {
            router.replace(path)
        }
        
    }

    const appRouter = new AppRouter();

    return {
        router,
        appRouter
    }
}

