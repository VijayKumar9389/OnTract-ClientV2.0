import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkAdminStatus, verifyRefreshToken } from '../services/auth.services';
import { setAdminStatus, setLogin, setLogout } from '../store/reducers/auth.reducer';
import { activateInterceptor } from '../utils/interceptor.utils.ts';
import {Dispatch} from "redux";

export const useInitializeApp = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch: Dispatch = useDispatch();

    useEffect((): void => {
        const initializeApp = async (): Promise<void> => {
            try {
                activateInterceptor(dispatch);
                const status: { auth: boolean, user: string } = await verifyRefreshToken();
                dispatch(setLogin(status));
                const adminStatus: boolean = await checkAdminStatus();
                dispatch(setAdminStatus(adminStatus));
            } catch (error) {
                console.error('Error during initialization:', error);
                dispatch(setLogout());
            } finally {
                setLoading(false);
            }
        };

        initializeApp().then(() => console.log('App initialized'));
    }, [dispatch]);

    return loading;
};
