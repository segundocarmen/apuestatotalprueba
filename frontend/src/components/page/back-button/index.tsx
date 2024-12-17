'use client'
import { useEffect, useState } from "react";
import { ConfigBackbutton } from "./config";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import './scss/style.scss';

const BackButtonComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [breadcumb, setBreadcumb] = useState<string[]>([]);

    useEffect(() => {
        const list = pathname.split('/').filter(item => item !== "");
        setBreadcumb(list);
    },[pathname])

    const GoToBack = () => {
        router.back();
    }

    return (
        <div className="backbutton">
            <div className="backbutton__wrapper">
                <div className="backbutton__wrapper__breadcumb">
                    {
                        breadcumb.map((item, index) => {
                            if(index + 1 >= breadcumb.length){
                                return(
                                    <span className="backbutton__wrapper__breadcumb__link" key={index}>{item}</span>
                                )
                            }else{
                                return(
                                    <Link className="backbutton__wrapper__breadcumb__link" href={`/${item}`} key={index}>{item}</Link>
                                )
                            }
                        })
                    }
                </div>
                <div className="backbutton__wrapper__return">
                    <button className="backbutton__wrapper__return__button" onClick={GoToBack}>{ConfigBackbutton.backText}</button>
                </div>
            </div>
        </div>
    )
}

export default BackButtonComponent;