'use client';
import {
    Constants,
    HTTP_METHODS,
    REGISTERSTATE_COLLECTION_VALUES,
} from '@/common/Constants';
import { useToastHook } from '@/store/redux/slices/toast/toast.hook';
import { useToast } from '@/hooks/useToast';
import { useCallApi } from '@/common/utils/HttpRequest/client/Axios';
import { useRouter } from 'next/navigation';
import TitleHeader from '@/components/page/title-page';
import { Dictionary } from '@/common/Dictionary';
import DataViewer from '@/components/page/data-viewer';
import { PokemonRegisterTable } from './others/headers';
import { UserPokemonRegisterInterface } from '@/interface/user-pokemon-register.interface';
import { useEffect, useState } from 'react';
import {
    ApiUserPokemonRegisterDetailByRegisterId,
    ApiUserPokemonRegisterId,
    ApiUserPokemonRegisterPendings,
} from '@/service';
import ModalComponent from '@/components/page/modal';
import './scss/style.scss';
import DetailRegister from '@/components/common/modal-table-detal-register/detail-register';
import { UserPokemonRegisterDetailInterface } from '@/interface';

const DashboardPage = () => {
    const [dataList, setDataList] = useState<UserPokemonRegisterInterface[]>(
        [],
    );
    const [detailsList, setDetailsList] = useState<
        UserPokemonRegisterDetailInterface[]
    >([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter();
    const { ToastConfig } = useToastHook();
    const { Colors } = useToast();
    const { GetData, LoadingData, LoaderElement } = useCallApi();

    const CreateButton = () => {
        router.push(`${Constants.protected.PokemonRegister}/create`, {
            scroll: false,
        });
    };

    const GetInitialData = async () => {
        try {
            const { data, success, message } = await GetData(
                ApiUserPokemonRegisterPendings,
                HTTP_METHODS.GET,
            );
            if (success) {
                setDataList(data);
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

    /**
     * @description
     * @constant FormButtons is a object that contains the buttons of the form
     */
    const FormButtons = {
        CreateButton: {
            controller: CreateButton,
            text: Dictionary.sectionButtons.create.text,
        },
        OtherButton: {
            controller: CreateButton,
            text: Dictionary.sectionButtons.import.text,
        },
    };

    const Accept = async (id: string) => {
        const values = {
            accepted: REGISTERSTATE_COLLECTION_VALUES.ACEPTADO,
        };
        try {
            const { data, success, message } = await GetData(
                ApiUserPokemonRegisterId(id),
                HTTP_METHODS.PATCH,
                values,
            );
            if (success) {
                setDataList(data);
                ToastConfig({ message: message, color: Colors.Success });
                GetInitialData();
            } else {
                ToastConfig({ message: message, color: Colors.Error });
            }
        } catch (error: any) {
            ToastConfig({ message: error.message, color: Colors.Error });
        }
    };

    const Reject = async (id: string) => {
        const values = {
            accepted: REGISTERSTATE_COLLECTION_VALUES.DENEGADO,
        };
        try {
            const { data, success, message } = await GetData(
                ApiUserPokemonRegisterId(id),
                HTTP_METHODS.PATCH,
                values,
            );
            if (success) {
                setDataList(data);
                ToastConfig({ message: message, color: Colors.Success });
                GetInitialData();
            } else {
                ToastConfig({ message: message, color: Colors.Error });
            }
        } catch (error: any) {
            ToastConfig({ message: error.message, color: Colors.Error });
        }
    };

    const Details = async (id: string) => {
        try {
            const { data, success, message } = await GetData(
                ApiUserPokemonRegisterDetailByRegisterId(id),
                HTTP_METHODS.GET,
            );
            if (success) {
                setDetailsList(data);
                ToastConfig({ message: message, color: Colors.Success });
            } else {
                ToastConfig({ message: message, color: Colors.Error });
            }
        } catch (error: any) {
            ToastConfig({ message: error.message, color: Colors.Error });
        }
        setShowModal(!showModal);
    };

    const ManageActionButtons = {
        onDetails: Details,
    };

    return (
        <div className='page'>
            <TitleHeader title={Dictionary.dashboard.title} />
            <DataViewer
                data={dataList}
                headers={PokemonRegisterTable}
                actionsButtons={ManageActionButtons}
                addsActions={[
                    {
                        action: Accept,
                        title: 'Aceptar',
                        iconUrl: `/icons/svg/check-2-blue.svg`,
                    },
                    {
                        action: Reject,
                        title: 'Rechazar',
                        iconUrl: `/icons/svg/trash-color.svg`,
                    },
                ]}
            />
            <ModalComponent
                OnOkModal={() => {
                    setShowModal(false);
                }}
                title={Dictionary.dashboard.registerDetail}
                show={showModal}
                setShowModal={setShowModal}
                ShowOk={false}
            >
                <DetailRegister data={detailsList} />
            </ModalComponent>
            {LoadingData && <LoaderElement />}
        </div>
    );
};

export default DashboardPage;
