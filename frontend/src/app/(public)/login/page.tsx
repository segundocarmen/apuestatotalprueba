'use client';
import LoginForm from './components/login-form';
import { useCallApi } from '@/common/utils/HttpRequest/client/Axios';
import { useEffect } from 'react';
import { GetAuthCookie } from '@/common/utils/AuthClient';
import { redirect } from 'next/navigation';
import { Constants } from '@/common/Constants';
import { Dictionary } from '@/common/Dictionary';
import Style from './login.module.scss';

const LoginPage = () => {
    useEffect(() => {
        const authCookie = GetAuthCookie();
        if (authCookie) {
            redirect(Constants.protected.DashBoard);
        }
    }, []);

    const { LoadingData, LoaderElement } = useCallApi();
    return (
        <div className={`${Style.loginpage} page`}>
            <div className={Style.loginpage__wrapper}>
                <div className={Style.loginpage__wrapper__title}>
                    {' '}
                    {Dictionary.login.title}{' '}
                </div>
                <div className={Style.loginpage__wrapper__form}>
                    <LoginForm isShop={false} />
                </div>
            </div>
            {LoadingData && <LoaderElement />}
        </div>
    );
};

export default LoginPage;
