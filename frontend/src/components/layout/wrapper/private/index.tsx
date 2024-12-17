'use client';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/redux/hooks';
import HeaderComponent from '@/components/layout/header/dashboard';
import FooterComponent from '@/components/layout/footer';
import { useToast } from '@/hooks/useToast';
import useVerifyLink from '@/hooks/useVerifyLink';
import { useEffect, useState } from 'react';
import { useCallApi } from '@/common/utils/HttpRequest/client/Axios';
import { GetAuthCookie, Logout } from '@/common/utils/AuthClient';
import { ApiValidateLogin } from '@/service';
import { HTTP_METHODS } from '@/common/Constants';
import Styles from '../styles.module.scss';
import { UseNetworkStatus } from '@/hooks/useNetworkStatus';
import { AppSectionInterface } from '@/interface';
import { GetStorage } from '@/common/storage';

interface PropsInterface {
    children: React.ReactNode;
}

export const PageWrapper = ({ children }: PropsInterface) => {
    const router = useRouter();
    const { OnlineComponent } = UseNetworkStatus();
    const { path } = useVerifyLink();
    const { GetData, LoaderElement } = useCallApi();
    const { ConfigToast, setConfigToast, ToastElement, toastManagerRef } =
        useToast();
    const { show, toastData } = useAppSelector(state => state.toast);
    const [sections, setSections] = useState<AppSectionInterface[]>([]);

    const [ready, setReady] = useState<boolean>(false);

    const GetUserSections = async () => {
        const sections = JSON.parse(
            GetStorage(process.env.NEXT_PUBLIC_USER_SECTIONS),
        );
        setSections(sections);
    };

    useEffect(() => {
        if (path) {
            const exist = sections.findIndex(
                item => item.path === path || path.indexOf(item.path) >= 0,
            );
            if (exist < 0) {
                router.push(`${sections[0].path}`, {
                    scroll: false,
                });
            }
        }
    }, [path]);

    useEffect(() => {
        Verify();
        GetUserSections();
    }, []);

    const Verify = async () => {
        const { token } = GetAuthCookie();
        if (token === null || token === '') {
            Logout();
        } else {
            try {
                const data = await GetData(ApiValidateLogin, HTTP_METHODS.GET, {
                    token,
                });
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

    useEffect(() => {
        if (show) {
            Alerts(toastData.message, toastData.color);
        }
    }, [show]);

    const Alerts = (message: string, color: any) => {
        ConfigToast.text = message;
        ConfigToast.backColor = color;
        setConfigToast(ConfigToast);
    };

    return !ready ? (
        <LoaderElement />
    ) : (
        <>
            <ToastElement ref={toastManagerRef} />
            <HeaderComponent />
            <main className={Styles.mainContent}>
                <div className={Styles.mainContent__root}>
                    <div className={Styles.root_private}>{children}</div>
                </div>
            </main>
            <FooterComponent />
            <OnlineComponent />
        </>
    );
};
