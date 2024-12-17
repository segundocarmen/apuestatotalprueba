import { FormBuilderFields } from '@/components/page/form-builder/form-builder.interface';

export const FormLogin: FormBuilderFields[] = [
    {
        showLabel: true,
        label: 'Correo electrónico',
        fieldNameId: 'email',
        fieldType: 'email',
        isFocusInClean: true,
        validations: {
            type: 'string',
            required: {
                state: true,
                message: 'Este campo es requerido'
            },
            min: {
                length: 3,
                state: true,
                message: 'Mínimo 3 carateres'
            },
            max: {
                length: 50,
                state: true,
                message: 'Máximo 50 caracteres'
            },
            email: {
                state: true,
                message: 'Ingrese un email válido'
            }
        }
    },
    {
        showLabel: true,
        label: 'Contraseña',
        fieldNameId: 'password',
        fieldType: 'password',
        isFocusInClean: true,
        validations: {
            type: 'string',
            required: {
                state: true,
                message: 'Este campo es requerido'
            },
            min: {
                length: 3,
                state: true,
                message: 'Mínimo 3 carateres'
            },
            max: {
                length: 40,
                state: true,
                message: 'Máximo 40 caracteres'
            }
        }
    }
];
