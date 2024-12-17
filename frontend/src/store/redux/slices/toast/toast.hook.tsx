import { ToastConfigStoreInterface } from './toast.interface';
//  <--REDUX--> //
import { useAppDispatch } from '../../hooks';
import { setToastData, clearToastData } from './index';
import { Constants } from '@/common/Constants';

export function useToastHook() {
    const dispatch = useAppDispatch();

    const ToastConfig = (state: ToastConfigStoreInterface) => {
        dispatch(setToastData(state));
        setTimeout(() => {
            dispatch(clearToastData());
        }, Constants.toastDelayTime);
    };

    return { ToastConfig };
}
