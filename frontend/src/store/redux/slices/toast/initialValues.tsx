import {
    ToastStoreInterface,
    ToastConfigStoreInterface
} from './toast.interface';

const toastDataIni: ToastConfigStoreInterface = {
    message: '',
    color: ''
};

export const ToastDefault: ToastStoreInterface = {
    toastData: toastDataIni,
    show: false
};
