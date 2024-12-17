'use client';
import { useAppSelector } from '@/store/redux/hooks';
import { useToast } from '@/hooks/useToast';
import { useEffect } from 'react';
import Styles from '../styles.module.scss';
import { UseNetworkStatus } from '@/hooks/useNetworkStatus';
import HeaderInfo from '@/components/layout/header-info/HeaderInfo';
import FooterComponent from '@/components/layout/footer';

interface PropsInterface {
    children: React.ReactNode;
}

export const PageWrapper = ({ children }: PropsInterface) => {
    const { OnlineComponent } = UseNetworkStatus();
    const { ConfigToast, setConfigToast, ToastElement, toastManagerRef } =
        useToast();
    const { show, toastData } = useAppSelector(state => state.toast);

    useEffect(() => {
        if (show) {
            Alerts(toastData.message, toastData.color);
        }
    }, [show]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Alerts = (message: string, color: any) => {
        ConfigToast.text = message;
        ConfigToast.backColor = color;
        setConfigToast(ConfigToast);
    };

    return (
        <main className={Styles.main}>
            <HeaderInfo />
            <div className='root'>
                <ToastElement ref={toastManagerRef} />
                <div className={Styles.root_public}>{children}</div>
                <OnlineComponent />
            </div>
            <FooterComponent />
        </main>
    );
};
