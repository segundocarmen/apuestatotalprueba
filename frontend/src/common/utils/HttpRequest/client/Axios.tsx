/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { ApiRequest, ApiResponseInterface } from '@/interface';
import { GetAuthCookie } from '@/common/utils/AuthClient';
import { HTTP_METHODS } from '@/common/Constants';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { useAppSelector } from '@/store/redux/hooks';
import { ApplicationInterface } from '@/store/redux/slices/application/application.interface';
const KeySaveRequest = 'request-to-send-register';

interface State {
    LoadingData: boolean;
    OnError?: Error;
    Data?: any;
}

const defaultResponse = {
    statusCode: 502,
    codeDescription: 'An error has ocurred',
    success: false,
    message: '',
    data: {},
};
interface PropsInterface {
    path: string;
    method: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data?: Object;
}

export const FetchData = async ({ path, method, data }: PropsInterface) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { value }: any = await GetAuthCookie();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = await api({
        method,
        path,
        token: value.token,
        data,
    });
    return response.data;
};

const api = async ({
    method = '',
    path = '',
    token = '',
    data,
    dataHeaders = {},
}: ApiRequest) => {
    return await axios.request({
        method,
        baseURL: `${path}`,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
            Dataheaders: `${JSON.stringify(dataHeaders)}`,
        },
        data,
    });
};

const apiFiles = async ({ path = '', token = '', data }: ApiRequest) => {
    return await axios.post(path, data, {
        headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export function useCallApi(
    path: string = '',
    method: string = HTTP_METHODS.GET,
) {
    const { connection }: ApplicationInterface = useAppSelector(
        state => state.application,
    );
    const [status, setStatus] = useState<State>({
        LoadingData: false,
    });

    const VerifyHttpRequestPendings = () => {
        const exist = localStorage.getItem(KeySaveRequest);
        const successStatus: boolean[] = [];
        if (exist) {
            const pendings = JSON.parse(exist);
            pendings.forEach(async (element: any) => {
                const { success: successRequest } = await GetData(
                    element.path,
                    HTTP_METHODS.POST,
                    element.data,
                );
                successStatus.push(successRequest);
            });
            const resSavePendings = successStatus.indexOf(false);
            if (resSavePendings <= -1) {
                localStorage.setItem(KeySaveRequest, JSON.stringify([]));
            }
        }
    };

    useEffect(() => {
        if (connection) {
            VerifyHttpRequestPendings();
        }
    }, [connection]);

    const SaveRequest = (path: string, data = {}) => {
        const object = { path, data };
        let list: any = [];
        const exist = localStorage.getItem(KeySaveRequest);
        if (exist) {
            list = JSON.parse(exist);
        }
        const listLng: number = list.length;
        list.push({ ...object, id: listLng + 1 });
        localStorage.setItem(KeySaveRequest, JSON.stringify(list));
    };

    const GetData = async (
        path: string,
        method: string,
        data = {},
        isFile: boolean = false,
        cookieName: string = '',
    ): Promise<ApiResponseInterface> => {
        try {
            if (path === '') {
                setStatus({ LoadingData: false, Data: {} });
                return defaultResponse as ApiResponseInterface;
            }
            if (!connection) {
                // setStatus({ LoadingData: false, Data: {} });
                if (method === HTTP_METHODS.POST) {
                    SaveRequest(path, data);
                    return {
                        ...defaultResponse,
                        message: 'Sin conexión',
                    } as ApiResponseInterface;
                }
                //
            }
            setStatus({ LoadingData: true, Data: {} });
            let value: any = cookieName === '' && (await GetAuthCookie());
            if (!value) {
                value = await GetAuthCookie(
                    process.env.NEXT_PUBLIC_ACCESSCLIENTTOKENKEY,
                );
            }
            const response: AxiosResponse<any> = isFile
                ? await apiFiles({
                      path,
                      token: value.token,
                      data,
                  })
                : await api({
                      method,
                      path,
                      token: value.token,
                      data,
                  });
            if (response.request.responseURL.indexOf('auth/validate') <= -1) {
                setStatus({ LoadingData: false, Data: response.data });
            }
            return response.data;
        } catch (error: any) {
            setStatus({ LoadingData: false, OnError: error });
            const newData = error.response ? error.response.data : error;
            return {
                ...defaultResponse,
                ...newData,
            };
        }
    };

    const LoaderElement = () => {
        return <Loader />;
    };

    useEffect(() => {
        if (path !== '' || path != null) {
            const data = {};
            GetData(path, method, data);
        }
    }, [path]);

    return { ...status, GetData, LoaderElement };
}
