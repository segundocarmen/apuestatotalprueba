import { useEffect, useState } from 'react';
import './scss/style.scss';

export interface Props {
    OnOkModal: ()=> void,
    setShowModal: (status:boolean)=> void,
    show: boolean;
    title: string;
    children: React.ReactNode;
    ShowOk: boolean;
}

const ModalComponent = ({show:showModal,children,title,setShowModal,OnOkModal, ShowOk}:Props) => {
    const [show, setShow] = useState<boolean>(false);

    const ToogleConfirm = (status=false) => {
        setShow(status);
        setShowModal(status)
    }

    useEffect(()=>{
        setShow(showModal)
    },[showModal])

    const OnOK = () => {
        OnOkModal()
    }

    return(
        <>
        {
            show &&
            <div className="modalcomponent">
                <div className="overlay">

                </div>
                <div className="modal">
                    <div className="modal__wrapper">
                        <div className="modal__wrapper__header">
                            <div className="modal__wrapper__header__title">
                                <span> {title} </span>
                            </div>
                            <div className="modal__wrapper__header__close">
                                <button onClick={()=>{ToogleConfirm()}}> X </button>
                            </div>
                        </div>
                        <div className="modal__wrapper__body">
                        {children}
                        </div>
                        <div className="modal__wrapper__footer">
                            {ShowOk && <button className="rdg-button modal__wrapper__footer__ok" onClick={()=>{OnOK()}} >Aceptar</button>}
                            <button className="rdg-button modal__wrapper__footer__cancel" onClick={()=>{ToogleConfirm()}}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default ModalComponent;