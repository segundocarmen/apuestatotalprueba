/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { ToastNew as ToastElement } from './Toast';

const Colors = {
    Success: 'color-success',
    Warning: 'color-warning',
    Error: 'color-error',
    Info: 'color-info'
} as const;
type Color = (typeof Colors)[keyof typeof Colors];

interface ToastInterface {
    current: any;
}

interface ConfigToastInterface {
    show: boolean;
    text: string | null;
    backColor: Color;
    title: string;
}

const ConfigToast: ConfigToastInterface = {
    show: true,
    backColor: 'color-info',
    text: null,
    title: 'Info'
};

export function useToast() {
    const toastManagerRef: ToastInterface = useRef(null);

    const setConfigToast = (config: any) => {
        if (toastManagerRef) {
            toastManagerRef.current?.changeToast(config);
        }
    };

    return {
        setConfigToast,
        ToastElement,
        ConfigToast,
        toastManagerRef,
        Colors
    };
}
