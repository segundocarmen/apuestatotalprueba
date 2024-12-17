/* eslint-disable @typescript-eslint/no-explicit-any */
interface DetailValidations {
    state: boolean;
    message: string;
}

interface DetailValidationsNumber {
    length: number;
    state: boolean;
    message: string;
}

export interface Validations {
    type: 'string' | 'number';
    required: DetailValidations;
    min?: DetailValidationsNumber;
    max?: DetailValidationsNumber;
    email?: DetailValidations;
}

interface ElementsList {
    id: string;
    value: string;
}

export interface FormBuilderFields {
    showLabel?: boolean;
    label: string;
    fieldNameId: string;
    fieldType: string;
    fieldPlaceholder?: string;
    disabled?: boolean;
    isFocusInClean?: boolean;
    defaultValue?: string;
    required?: boolean;
    autoComplete?: string;
    elements?: ElementsList[];
    validations?: Validations;
    name?: string;
    controller?: any;
    externalActionsOnEnter?: any;
    externalActionsOnEnterFunction?: any
}

export interface FormikInterface {
    handleSubmit?: any;
    handleChange?: any;
    handleBlur?: any;
    values?: any;
    errors?: any;
    resetForm?: any;
    isSubmitting?: any;
}

interface Config {
    noCancelButton?: boolean;
}

interface ButtonDetail {
    class?: string;
    text?: string;
    controller: any;
}

interface ButtonInterface {
    buttonsWrapperClass?: string;
    cancel?: ButtonDetail;
    ok: ButtonDetail;
}

export interface FormPropsInterface {
    initialValues: any;
    lang?: string;
    formStructure: FormBuilderFields[];
    focusOn?: any;
    styles?: any;
    onSuccessCleanForm?: boolean;
    config?: Config;
    buttons: ButtonInterface;
}

export const deffaulltButtons: ButtonInterface = {
    buttonsWrapperClass: 'app-d-flex__center childs_uniform',
    ok: {
        class: 'btn_primary',
        text: 'Guardar',
        controller: () => {}
    },
    cancel: {
        class: 'btn_danger',
        text: 'Cancelar',
        controller: () => {}
    }
};
