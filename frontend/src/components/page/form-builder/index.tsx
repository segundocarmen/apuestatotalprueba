/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import {
    FormikInterface,
    FormBuilderFields,
    FormPropsInterface,
    deffaulltButtons
} from './form-builder.interface';
import { Formik } from 'formik';
import './scss/styles.scss';

//  eslint-disable-next-line @typescript-eslint/no-var-requires
const yup = require('yup');

const defaults = {
    autocomplete: 'off',
    required: true,
    buttons: deffaulltButtons
};

let schema = yup.object();
let CleanForm: any;

const FormBuilder = ({
    initialValues,
    formStructure,
    focusOn,
    styles,
    buttons,
    config,
    onSuccessCleanForm = true,
}: FormPropsInterface) => {
    const ref:any = useRef(null);
    const [ready, setReady] = useState<boolean>(false);
    const [sendForm, setSendForm] = useState<boolean>(false);
    const [form, setForm] = useState<FormikInterface>({});
    const [newFormStructure, setNewFormStructure] = useState<
        FormBuilderFields[]
    >([]);

    useEffect(() => {
        setForm(initialValues);
    }, [initialValues]);

    /**
     * @description
     * This effect clean the schema to create a new one
     */
    useEffect(() => {
        schema = yup.object({});
    }, []);

    /**
     * @description
     * This effect create the schema to validate the form, based on the formStructure
     */
    useEffect(() => {
        for (let i = 0; i < formStructure.length; i++) {
            setNewFormStructure(formStructure);
        }
    }, [formStructure]);

    useEffect(() => {
        if (newFormStructure.length > 0) {
            for (let i = 0; i < newFormStructure.length; i++) {
                const item = newFormStructure[i];
                if(item.validations){
                    const {
                        validations: { type, required, min, max, email }
                    } = item;
                    const obj: any = {};
                    if (type === 'string') {
                        obj[item.fieldNameId] = yup
                            .string()
                            .required(required.message);
                        min &&
                            (obj[item.fieldNameId] = obj[item.fieldNameId].min(
                                min.length,
                                min.message
                            ));
                        max &&
                            (obj[item.fieldNameId] = obj[item.fieldNameId].max(
                                max.length,
                                max.message
                            ));
                        email &&
                            (obj[item.fieldNameId] = obj[item.fieldNameId].email(
                                email.message
                            ));
                    } else {
                        obj[item.fieldNameId] = yup
                            .number()
                            .required(required.message);
                    }
                    schema = yup.object({ ...schema.fields, ...obj });
                }
                
            }
            setReady(true);
        }
    }, [newFormStructure]);

    const Submit = (dataForm: any) => {
        buttons?.ok.controller(dataForm);
        setSendForm(true);
    };

    useEffect(() => {
        if (sendForm && onSuccessCleanForm) {
            CleanForm();
        }
    }, [sendForm, onSuccessCleanForm]);

    const onHandleChange = (item: any, event: any) => {
        if(item.fieldType==='select' && item.controller){
            item.controller(event.target.value);
        }
    };

    const Cancel = (OnCancel: any) => {
        OnCancel();
        buttons?.cancel && buttons?.cancel.controller(focusOn);
        CleanForm();
    };

    const HandleKeyUp = (e:any,item:any) => {   
        if(e.code==='Enter'){
            const value = e.target.value
            if(ref.current){
                const actualFormValues = ref.current.values;
                item.externalActionsOnEnterFunction({value, actualFormValues});
            }
            e.preventDefault();     
        }
    }

    const RenderControls = (
        item: any,
        handleChange: any,
        values: any,
        errors: any
    ) => {
        /* let hexColor, rgbColor, rgbArray; */
        switch (item.fieldType) {
            case 'switch':
                return(
                    <div className='switch_wrapper'>
                        <label> {item.fieldPlaceholder} </label>
                        <div className="switch">
                            <input
                                type="checkbox"
                                name={item.fieldNameId}
                                defaultChecked
                                onChange={e => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                    </div>
                )
            case 'select':
                return (
                    <select
                        title={item.fieldPlaceholder}
                        required={item.required ? item.required : true}
                        onChange={e => {
                            onHandleChange(item, e);
                            handleChange(e);
                        }}
                        name={item.fieldNameId}
                        value={values[item.fieldNameId]}
                        className={
                            errors[item.fieldNameId]
                                ? `form-control invalid`
                                : `form-control`
                        }
                        ref={item.isFocusInClean ? focusOn : null}
                        disabled={item.disabled}
                    >
                        <option value=''>{item.fieldPlaceholder}</option>
                        {item.elements.map((element: any) => {
                            return (
                                <option key={element.id} value={element.id}>
                                    {element.value}
                                </option>
                            );
                        })}
                    </select>
                );
            case 'textarea':
                return (
                    <textarea
                        title={item.fieldPlaceholder}
                        required={item.required ? item.required : true}
                        onChange={handleChange}
                        autoComplete={
                            item.autoComplete ? item.autoComplete : 'off'
                        }
                        placeholder={!item.showLabel ?
                            item.fieldPlaceholder
                                ? item.fieldPlaceholder
                                : item.label : ''
                        }
                        name={item.fieldNameId}
                        value={values[item.fieldNameId]}
                        className={
                            errors[item.fieldNameId]
                                ? 'form-control invalid'
                                : 'form-control'
                        }
                        ref={item.isFocusInClean ? focusOn : null}
                        disabled={item.disabled}
                    ></textarea>
                );
            default:
                return (
                    <input
                        title={item.fieldPlaceholder}
                        required={item.required ? item.required : true}
                        onChange={handleChange}
                        autoComplete={
                            item.autoComplete ? item.autoComplete : 'off'
                        }
                        placeholder={!item.showLabel ?
                            item.fieldPlaceholder
                                ? item.fieldPlaceholder
                                : item.label : ''
                        }
                        type={item.fieldType ? item.fieldType : 'text'}
                        name={item.fieldNameId}
                        value={item.defaultValue ? item.defaultValue :values[item.fieldNameId]}
                        className={
                            errors[item.fieldNameId]
                                ? 'form-control invalid'
                                : 'form-control'
                        }
                        ref={item.isFocusInClean ? focusOn : null}
                        disabled={item.disabled}
                        onKeyDown={item.externalActionsOnEnter ? (e:any)=>{HandleKeyUp(e,item)} : ()=>{}}
                    />
                );
        }
    };

    return ready ? (
        <div className='formbuilder' style={styles}>
            <Formik
                innerRef={ref}
                validationSchema={schema}
                onSubmit={(dataForm: any) => {
                    Submit(dataForm);
                }}
                initialValues={form}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize={true}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    resetForm
                }: FormikInterface) =>
                    (
                        //  eslint-disable-next-line no-sequences
                        (CleanForm = resetForm),
                        (
                            <Form
                                className='formbuilder__form'
                                noValidate
                                onFinish={() => {
                                    handleSubmit(values);
                                }}
                            >
                                {newFormStructure.map(
                                    (
                                        item: FormBuilderFields,
                                        index: number
                                    ) => (
                                        //  item.depends ? item.dependsShow &&
                                        <div
                                            key={`form_item-${index}`}
                                            className={
                                                item.disabled
                                                    ? `disabled formbuilder__form__group`
                                                    : `enabled formbuilder__form__group`
                                            }
                                        >
                                            {RenderControls(
                                                item,
                                                handleChange,
                                                values,
                                                errors
                                            )}
                                            {
                                                item.showLabel &&
                                                <label
                                                    className={
                                                        item.disabled
                                                            ? 'disabled form-label'
                                                            : 'enabled form-label'
                                                    }
                                                    htmlFor={item.fieldNameId}
                                                >
                                                    {item.label}
                                                </label>
                                            }
                                            <div className='invalid-feedback'>
                                                {errors[item.fieldNameId]}
                                            </div>
                                        </div>
                                    )
                                )}
                                <div className={'formbuilder__form__buttons'}>
                                    {!config?.noCancelButton && (
                                        <button
                                            className={`btn ${
                                                buttons?.cancel?.class ??
                                                defaults.buttons.cancel?.class
                                            }`}
                                            onClick={() => Cancel(resetForm)}
                                        >
                                            {buttons?.cancel &&
                                            buttons?.cancel.text
                                                ? buttons?.cancel.text
                                                : defaults.buttons.cancel?.text}
                                        </button>
                                    )}
                                    <button
                                        className={`btn ${
                                            buttons?.ok?.class ??
                                            defaults.buttons.ok?.class
                                        }`}
                                        type='submit'
                                    >
                                        {buttons?.ok.text
                                            ? buttons?.ok.text
                                            : defaults.buttons.ok.text}
                                    </button>
                                </div>
                            </Form>
                        )
                    )
                }
            </Formik>
        </div>
    ) : (
        <>
            <span>{/* rdy formik {ready.toString()} */} </span>
        </>
    );
};

export default FormBuilder;
