'use client'
interface Props {
    OnClick: ()=>void,
    text: string,
    defaultClass?: string;
}

const ButtonComponent = ({OnClick, text,defaultClass}:Props) => {
    return(
        <button className={`rdg-button ${defaultClass ? defaultClass : ''}`} onClick={OnClick} >{text}</button>
    )
}

export default ButtonComponent;