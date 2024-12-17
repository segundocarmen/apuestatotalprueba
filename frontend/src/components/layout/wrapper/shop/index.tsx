'use client'
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useCallApi } from '@/common/utils/HttpRequest/client/Axios';
import { GetAuthCookie, Logout } from '@/common/utils/AuthClient';
import { ApiValidateLogin } from '@/service';
import { HTTP_METHODS } from '@/common/Constants';

interface PropsInterface {
    children: React.ReactNode;
}

export const PageShopWrapper = ({ children }: PropsInterface) => {
    const { GetData, LoaderElement } = useCallApi();
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        Verify();
    }, []);

    const Verify = async () => {
        const { token } = GetAuthCookie(process.env.NEXT_PUBLIC_ACCESSCLIENTTOKENKEY);
        if (token === null || token === '') {
            Logout();
        } else {
            try {
                const data = await GetData(
                    ApiValidateLogin,
                    HTTP_METHODS.GET,
                    { token },
                    false,
                    process.env.NEXT_PUBLIC_ACCESSCLIENTTOKENKEY
                );
                if (!data.success) {
                    Logout();
                } else {
                    jwtDecode(token);
                    setReady(true);
                }
            } catch (error) {
                Logout();
            }
        }
    };

    return !ready ? (
        <LoaderElement />
    ) : (
        <div className="shop_protected">
            {children}
        </div>
    );
};
