import { FormBuilderFields } from '@/components/page/form-builder/form-builder.interface';

export const FormCreatePokemonregister: FormBuilderFields[] = [
    {
        label: 'Pokemon id',
        fieldNameId: 'pokemonId',
        fieldType: 'text',
        fieldPlaceholder: 'Ingrese el id',
        autoComplete: 'off',
        isFocusInClean: true,
        validations: {
            type: 'string',
            required: {
                state: true,
                message: 'Este campo es requerido',
            },
            min: {
                length: 3,
                state: true,
                message: 'Mínimo 3 carateres',
            },
            max: {
                length: 70,
                state: true,
                message: 'Máximo 40 caracteres',
            },
        },
    },
    {
        label: 'Pokemon name',
        fieldNameId: 'pokemonName',
        fieldType: 'text',
        fieldPlaceholder: 'Ingrese el nombre',
        autoComplete: 'off',
        isFocusInClean: true,
        validations: {
            type: 'string',
            required: {
                state: true,
                message: 'Este campo es requerido',
            },
            min: {
                length: 3,
                state: true,
                message: 'Mínimo 3 carateres',
            },
            max: {
                length: 70,
                state: true,
                message: 'Máximo 40 caracteres',
            },
        },
    },
    {
        label: 'Pokemon power',
        fieldNameId: 'pokemonPower',
        fieldType: 'number',
        fieldPlaceholder: 'Ingrese el poder',
        autoComplete: 'off',
        isFocusInClean: true,
        validations: {
            type: 'string',
            required: {
                state: true,
                message: 'Este campo es requerido',
            },
            min: {
                length: 1,
                state: true,
                message: 'Mínimo 1 carateres',
            },
            max: {
                length: 3,
                state: true,
                message: 'Máximo 3 caracteres',
            },
        },
    },
];
