import { useRouter } from "expo-router";
import type { AppRouterTypes } from "@/helpers/router/app.router.types";

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

