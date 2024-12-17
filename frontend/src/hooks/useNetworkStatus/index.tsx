import { useEffect, useState } from "react";
// import { Detector } from "react-detect-offline";
import './style.scss';
import { useAppDispatch } from "@/store/redux/hooks";
import {setApplicationConnection} from '@/store/redux/slices/application';

export function UseNetworkStatus() {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState<boolean>(false);
    const [connection, setConnection] = useState<boolean>(true);

    useEffect(()=> {
        if(show){
            if(connection){
                setTimeout(()=> {
                    setShow(false);
                },7000)
            }
        }
    },[show,connection])

    useEffect(()=>{
        setShow(true)
        dispatch(setApplicationConnection(connection))
    },[connection])

    useEffect(()=> {
        VerifyIsOnline();
        if(!connection){
            setShow(true)
        }else{
            setShow(false)
        }
    },[])

    useEffect(() => {
        window.addEventListener('online', VerifyIsOnline);
        window.addEventListener('offline', VerifyIsOnline);
        return () => {
            window.removeEventListener('online', VerifyIsOnline);
            window.addEventListener('offline', VerifyIsOnline);
        }
    },[])

    const VerifyIsOnline = () => {
        if(navigator.onLine){
            setConnection(true);
        }else{
            setConnection(false)
        }
    }

    const OnlineComponent = () => {
        return(
            !connection ? 
                show ? <div className="connection offline"><span>No tienes conexión a internet</span></div> : <></>
            :
                show ? <div className="connection online"><span>Vuelves a tener conexión</span></div> : <></>
        )
    }

    return {OnlineComponent,connection}
}

