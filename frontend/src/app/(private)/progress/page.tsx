'use client';
import { HTTP_METHODS } from '@/common/Constants';
import { useToastHook } from '@/store/redux/slices/toast/toast.hook';
import { useToast } from '@/hooks/useToast';
import { useCallApi } from '@/common/utils/HttpRequest/client/Axios';
import TitleHeader from '@/components/page/title-page';
import { Dictionary } from '@/common/Dictionary';
import './scss/style.scss';
import Image from 'next/image';
import { ApiMedalSequenceByUser } from '@/service';
import { useEffect, useState } from 'react';
import { MedalSequenceByUser } from '@/interface';

const ProgressPage = () => {
    const { ToastConfig } = useToastHook();
    const { Colors } = useToast();
    const { GetData, LoadingData, LoaderElement } = useCallApi();
    const [medaldata, setMedalData] = useState<MedalSequenceByUser>();

    const GetInitialData = async () => {
        try {
            const { data, success, message } = await GetData(
                ApiMedalSequenceByUser,
                HTTP_METHODS.POST,
            );
            if (success) {
                setMedalData(data);
                ToastConfig({ message: message, color: Colors.Success });
            } else {
                ToastConfig({ message: message, color: Colors.Error });
            }
        } catch (error: any) {
            ToastConfig({ message: error.message, color: Colors.Error });
        }
    };

    useEffect(() => {
        GetInitialData();
    }, []);

    return (
        <div className='page'>
            <TitleHeader title={Dictionary.progress.title} />
            <Image
                alt='medal'
                src='/icons/svg/medal.svg'
                width={100}
                height={100}
            />
            <p>
                Medalla actual: <strong> {medaldata?.default.name} </strong>
            </p>
            <p>
                Puntos para la próxima medalla:{' '}
                <strong>
                    {medaldata && medaldata?.default.count
                        ? medaldata?.next.count -
                          medaldata?.default.count +
                          medaldata?.default.pendingPoints
                        : medaldata?.default.pendingPoints}
                </strong>
            </p>
            <p>
                Próxima medalla: <strong> {medaldata?.next.name} </strong>
            </p>
            {LoadingData && <LoaderElement />}
        </div>
    );
};

export default ProgressPage;
