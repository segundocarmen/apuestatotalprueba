export interface ToastConfigStoreInterface {
    message: string;
    color: string;
}
export interface ToastStoreInterface {
    toastData: ToastConfigStoreInterface;
    show: boolean;
}
