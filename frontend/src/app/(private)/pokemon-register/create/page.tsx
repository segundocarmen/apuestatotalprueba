/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { HTTP_METHODS } from '@/common/Constants';
import { Dictionary } from '@/common/Dictionary';
import { useCallApi } from '@/common/utils/HttpRequest/client/Axios';
import FormBuilder from '@/components/page/form-builder';
import TitleHeader from '@/components/page/title-page';
import { useToast } from '@/hooks/useToast';
import { ApiUserPokemonRegister } from '@/service';
import { useToastHook } from '@/store/redux/slices/toast/toast.hook';
import { useRef, useState } from 'react';
import { FormCreatePokemonregister } from '../others/form';
import { PokemonRegisterListTable } from '../others/headers';
import { UserPokemonRegisterFormValues } from '@/interface';
import BackButtonComponent from '@/components/page/back-button';
import DataViewer from '@/components/page/data-viewer';
import SectionButtons from '@/components/page/section-buttons';
import '../scss/create.scss';
import '../scss/style.scss';

interface RegisterList {
    id?: string;
    pokemonId: string;
    pokemonName: string;
    pokemonPower: number;
}

const ProductCreatePage = () => {
    const { GetData, LoadingData, LoaderElement } = useCallApi();
    const fieldRef = useRef(null);
    const { ToastConfig } = useToastHook();
    const { Colors } = useToast();
    const [registerList, setRegisterList] = useState<RegisterList[]>([]);

    const OnAdd = async (values: RegisterList) => {
        const list = [...registerList];
        const exist = list.find(item => item.pokemonId === values.pokemonId);
        if (exist) {
            ToastConfig({ message: 'Id registrado', color: Colors.Warning });
        } else {
            list.push({ ...values, id: values.pokemonId });
            setRegisterList(list);
        }
    };

    /**
     * @description
     * @function FocusOnInput is a function that is called when the form's cancel button is clicked
     * @param ref is a reference to the form
     */
    const FocusOnInput = (ref: any) => {
        ref.current.focus();
    };

    /**
     * @description
     * @constant FormButtons is a object that contains the buttons of the form
     */
    const FormButtons = {
        ok: {
            controller: OnAdd,
            text: 'Agregar',
        },
        cancel: {
            controller: FocusOnInput,
        },
    };

    const SaveRegisters = async () => {
        try {
            const { success, message } = await GetData(
                ApiUserPokemonRegister,
                HTTP_METHODS.POST,
                { list: registerList },
            );
            if (success) {
                ToastConfig({ message: message, color: Colors.Success });
            } else {
                ToastConfig({ message: message, color: Colors.Error });
            }
        } catch (error: any) {
            ToastConfig({ message: error.message, color: Colors.Error });
        }
    };

    /**
     * @description
     * @constant FormButtons is a object that contains the buttons of the form
     */
    const FormButtonsSave = {
        OtherButton: {
            controller: SaveRegisters,
            text: Dictionary.sectionButtons.saveImport.text,
        },
    };

    return (
        <div className='page'>
            <TitleHeader title={Dictionary.pokemonregister.title} />
            <BackButtonComponent />
            <div className='formcreation'>
                <FormBuilder
                    buttons={FormButtons}
                    formStructure={FormCreatePokemonregister}
                    initialValues={UserPokemonRegisterFormValues}
                    focusOn={fieldRef}
                    onSuccessCleanForm
                />
            </div>
            <DataViewer
                data={registerList}
                headers={PokemonRegisterListTable}
            />
            <SectionButtons buttons={FormButtonsSave} />
            {LoadingData && <LoaderElement />}
        </div>
    );
};

export default ProductCreatePage;
