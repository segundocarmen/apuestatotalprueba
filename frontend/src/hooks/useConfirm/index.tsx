import { useState } from 'react';
import './scss/style.scss';

export interface OSFInterface {
    id: string;
    type: number;
}

export default function useConfirm (){
    const [show, setShow] = useState<boolean>(false);
    const [title, settitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [pressConfirm, setPressConfirm] = useState<boolean>(false);
    const [objectSelected, setObjectSelected] = useState<OSFInterface | null>(null);

    const ToogleConfirm = (status=false) => {
        setShow(status);
    }

    const OnOK = () => {
        setPressConfirm(true);
        setTimeout(() => {
            setPressConfirm(false);
        }, 50);
    }

    const ConfirmComponent = () => {
        return(
            <>
            {
                show &&
                <div className="confirmcomponent">
                    <div className="overlay">
    
                    </div>
                    <div className="confirm">
                        <div className="confirm__wrapper">
                            <div className="confirm__wrapper__header">
                                <div className="confirm__wrapper__header__title">
                                    <span> {title} </span>
                                </div>
                                <div className="confirm__wrapper__header__close">
                                    <button onClick={()=>{ToogleConfirm()}}> X </button>
                                </div>
                            </div>
                            <div className="confirm__wrapper__body">
                                <div className="confirm__wrapper__body__text">
                                    <span> {text} </span>
                                </div>
                            </div>
                            <div className="confirm__wrapper__footer">
                                <button className="rdg-button confirm__wrapper__footer__ok" onClick={()=>{OnOK()}} >Aceptar</button>
                                <button className="rdg-button confirm__wrapper__footer__cancel" onClick={()=>{ToogleConfirm()}}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </>
        )
    }

    return {ConfirmComponent,ToogleConfirm, settitle, setText, pressConfirm, objectSelected, setObjectSelected}
}