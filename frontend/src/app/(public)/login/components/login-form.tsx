'use client';
import { FormLogin } from './form';
//  <--COMPONENTS--> //
import FormBuilder from '@/components/page/form-builder';
//  <--INTERFACE--> //
import { LoginFormValues, UserFomLoginInterface } from '@/interface';
//  <--FETCH--> //
import { useCallApi } from '@/common/utils/HttpRequest/client/Axios';
import { ApiLogin } from '@/service';
import { Constants, HTTP_METHODS } from '@/common/Constants';
//  <--REDUX--> //
import { useAppDispatch } from '@/store/redux/hooks';
import { SaveStorage } from '@/common/storage';
import { SetAuthCookie } from '@/common/utils/AuthClient';
import { setIsLoged, setUserData } from '@/store/redux/slices/users';
import { useToastHook } from '@/store/redux/slices/toast/toast.hook';
import { useToast } from '@/hooks/useToast';
import { Dictionary } from '@/common/Dictionary';
import '../scss/login.scss';

const LoginForm = () => {
    const { GetData, LoadingData, LoaderElement } = useCallApi();
    const dispatch = useAppDispatch();
    const { ToastConfig } = useToastHook();
    const { Colors } = useToast();
    /**
     * @description
     * @function OnLogin is a function that is called when the form is submitted
     * @param loginData is a object that contains the data of the form
     */
    const OnLogin = async (loginData: UserFomLoginInterface) => {
        try {
            const { data, success, message } = await GetData(
                ApiLogin,
                HTTP_METHODS.POST,
                loginData,
            );
            const { token, userData } = data;
            if (success) {
                dispatch(setUserData(userData));
                dispatch(setIsLoged(true));
                SaveStorage(userData, process.env.NEXT_PUBLIC_USER_DATA_COOKIE);
                SaveStorage(0, process.env.NEXT_PUBLIC_DEFFAULT_ROLE);
                SaveStorage(
                    JSON.stringify(userData.role.appSections),
                    process.env.NEXT_PUBLIC_USER_SECTIONS,
                );
                SetAuthCookie({ token });
                if (userData.role.name === 'Admin') {
                    window.location.href = Constants.protected.DashBoardAdmin;
                } else {
                    window.location.href = Constants.protected.PokemonRegister;
                }
            } else {
                ToastConfig({
                    message,
                    color: Colors.Error,
                });
            }
        } catch (error) {
            ToastConfig({
                message: 'Error',
                color: Colors.Error,
            });
        }
    };

    /**
     * @description
     * @constant FormButtons is a object that contains the buttons of the form
     */
    const FormButtons = {
        ok: {
            controller: OnLogin,
            text: Dictionary.login.okButton,
        },
    };

    return (
        <>
            <FormBuilder
                initialValues={LoginFormValues}
                buttons={FormButtons}
                formStructure={FormLogin}
                styles={{ backgroundColor: 'transparent' }}
                config={{
                    noCancelButton: false,
                }}
            />
            {LoadingData && <LoaderElement />}
        </>
    );
};

export default LoginForm;
