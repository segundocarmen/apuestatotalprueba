import Image from 'next/image';
import { Logout } from '@/common/utils/AuthClient';
import { Dictionary } from '@/common/Dictionary';
import Link from 'next/link';
import './headerDashboard.scss';

const HeaderComponent = () => {
    return (
        <header className='mpheader'>
            <div className='mpheader__logo'>
                <Image
                    src={`/icons/logo.png`}
                    alt='Logo header'
                    width={180}
                    height={72}
                />
            </div>
            <div className='mpheader__center'></div>
            <div className='mpheader__menu'>
                <div className='mpheader__menu__options'>
                    <span className='mpheader__menu__options__text'>
                        Opciones
                    </span>
                    <div className='mpheader__menu__options__arrow'>
                        <Image
                            src={`/icons/svg/arrow-bottom-color.svg`}
                            alt='Arrow-bottom'
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className='mpheader__menu__options__toggle'>
                        <ul className='mpheader__menu__options__toggle__list'>
                            <li className='mpheader__menu__options__toggle__list__item'>
                                <button className='link' onClick={Logout}>
                                    {Dictionary.header.options.closeSesion}
                                </button>
                            </li>
                            {Dictionary.header.options.links.map(item => {
                                return (
                                    <li
                                        key={item.id}
                                        className='mpheader__menu__options__toggle__list__item'
                                    >
                                        <Link className='link' href={item.path}>
                                            {item.text}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
