'use client';
import { Constants, HTTP_METHODS } from '@/common/Constants';
import { useToastHook } from '@/store/redux/slices/toast/toast.hook';
import { useToast } from '@/hooks/useToast';
import { useCallApi } from '@/common/utils/HttpRequest/client/Axios';
import { useRouter } from 'next/navigation';
import TitleHeader from '@/components/page/title-page';
import { Dictionary } from '@/common/Dictionary';
import SectionButtons from '@/components/page/section-buttons';
import DataViewer from '@/components/page/data-viewer';
import {
    PokemonRegisterListTable,
    PokemonRegisterTable,
} from './others/headers';
import { UserPokemonRegisterInterface } from '@/interface/user-pokemon-register.interface';
import { useEffect, useState } from 'react';
import {
    ApiUserPokemonRegister,
    ApiUserPokemonRegisterByUserId,
    ApiUserPokemonRegisterDetailByRegisterId,
} from '@/service';
import { GetSessionUserid } from '@/common/storage';
import ModalComponent from '@/components/page/modal';
import './scss/style.scss';
import DetailRegister from '@/components/common/modal-table-detal-register/detail-register';
import * as XLSX from 'xlsx';
import {
    RegisterExcelImportInterface,
    UserPokemonRegisterDetailInterface,
} from '@/interface';

const PokemonRegisterPage = () => {
    const [dataList, setDataList] = useState<UserPokemonRegisterInterface[]>(
        [],
    );
    const [detailsList, setDetailsList] = useState<
        UserPokemonRegisterDetailInterface[]
    >([]);
    const [excelFile, setExcelFile] = useState<any>([]);
    const [uploadData, setuploadData] = useState<
        RegisterExcelImportInterface[]
    >([]);
    const router = useRouter();
    const { ToastConfig } = useToastHook();
    const { Colors } = useToast();
    const { GetData, LoadingData, LoaderElement } = useCallApi();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalUpload, setShowModalUpload] = useState<boolean>(false);

    const CreateButton = () => {
        router.push(`${Constants.protected.PokemonRegister}/create`, {
            scroll: false,
        });
    };

    const GetInitialData = async () => {
        try {
            const userId = GetSessionUserid();
            const { data, success, message } = await GetData(
                ApiUserPokemonRegisterByUserId(userId),
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

    const UploadFile = () => {
        setShowModalUpload(true);
    };

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
            controller: UploadFile,
            text: Dictionary.sectionButtons.import.text,
        },
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

    const HandleFileUpload = (e: any) => {
        setExcelFile([...e.target.files]);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = e => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData: RegisterExcelImportInterface[] =
                XLSX.utils.sheet_to_json(sheet, {
                    /* raw: false, // Evalúa las fórmulas */
                    defval: null, // Usar `null` en lugar de vacío para celdas sin valor
                });
            const filteredData = parsedData.filter(row =>
                Object.values(row).some(
                    value => value !== null && value !== '',
                ),
            );
            const dataWithIds = filteredData.map(item => {
                const newObject = {
                    ...item,
                    id: item.pokemonId,
                };
                return newObject;
            });
            setuploadData(dataWithIds);
        };
    };

    const SaveRegistersImport = async () => {
        try {
            const { success, message } = await GetData(
                ApiUserPokemonRegister,
                HTTP_METHODS.POST,
                { list: uploadData },
            );
            if (success) {
                ToastConfig({ message: message, color: Colors.Success });
                setShowModalUpload(false);
                GetInitialData();
            } else {
                ToastConfig({ message: message, color: Colors.Error });
            }
        } catch (error: any) {
            ToastConfig({ message: error.message, color: Colors.Error });
        }
    };

    return (
        <div className='page'>
            <TitleHeader title={Dictionary.pokemonregister.title} />
            <SectionButtons buttons={FormButtons} />

            <DataViewer
                actionsButtons={ManageActionButtons}
                data={dataList}
                headers={PokemonRegisterTable}
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

            <ModalComponent
                OnOkModal={() => {
                    SaveRegistersImport();
                }}
                title={Dictionary.dashboard.registerDetail}
                show={showModalUpload}
                setShowModal={setShowModalUpload}
                ShowOk={true}
            >
                <div>
                    <label className='popUp__main__text__upload subtitle'>
                        <input
                            type='file'
                            accept='.csv'
                            onChange={HandleFileUpload}
                            style={{ display: 'none' }}
                        />
                        <div className='popUp__main__text__upload__label'>
                            Seleccionar archivo
                        </div>
                    </label>
                    <DataViewer
                        data={uploadData}
                        headers={PokemonRegisterListTable}
                    />
                </div>
            </ModalComponent>
            {LoadingData && <LoaderElement />}
        </div>
    );
};

export default PokemonRegisterPage;
