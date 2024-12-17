import './style.scss';
import Link from 'next/link';
import Image from 'next/image';

const SystemAccess = () => {
    return (
        <div className='cart-preview'>
            <Link href='/login' className='cart-preview__link'>
                <Image alt='SystemIcon' src='/icons/svg/system.svg' width={32} height={32} />
            </Link>
        </div>
    );
};

export default SystemAccess;
