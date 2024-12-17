'use client';
import Link from 'next/link';
import { Dictionary } from '@/common/Dictionary';
import useVerifyLink from '@/hooks/useVerifyLink';
import { useEffect, useState } from 'react';
import { AppSectionInterface } from '@/interface';
import { GetStorage } from '@/common/storage';
//  <--FETCH--> //
import { useCallApi } from '@/common/utils/HttpRequest/client/Axios';
import { useToastHook } from '@/store/redux/slices/toast/toast.hook';
import { useToast } from '@/hooks/useToast';
import './scss/style.scss';

const SidebarComponent = () => {
    const { GetData, LoadingData, LoaderElement } = useCallApi();
    const { getIsActive } = useVerifyLink();
    const [sections, setSections] = useState<AppSectionInterface[]>([]);
    const { Colors } = useToast();
    const { ToastConfig } = useToastHook();

    useEffect(() => {
        GetInitialData();
    }, []);

    const GetInitialData = async () => {
        try {
            const sections = JSON.parse(
                GetStorage(process.env.NEXT_PUBLIC_USER_SECTIONS),
            );
            setSections(sections);
        } catch (error) {
            ToastConfig({
                message: 'Error',
                color: Colors.Error,
            });
        }
    };

    return (
        <>
            <div className='sidebar'>
                <div className='sidebar__wrapper'>
                    <ul className='sidebar__wrapper__list'>
                        {sections.map(item => {
                            return (
                                <li
                                    className={`sidebar__wrapper__list__item ${getIsActive(
                                        item.path,
                                    )}`}
                                    key={item.id}
                                >
                                    <Link
                                        className='sidebar__wrapper__list__item__link'
                                        href={item.path}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {LoadingData && <LoaderElement />}
            </div>
        </>
    );
};

export default SidebarComponent;
