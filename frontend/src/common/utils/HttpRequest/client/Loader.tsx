import './styles.scss';
import Image from 'next/image';

export const Loader = () => {
    return (
        <div
            className='loading-component'
            style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div className='container'>
                <Image
                    src={`/icons/svg/Loaders.svg`}
                    alt='Loader icon'
                    width={120}
                    height={120}
                />
            </div>
        </div>
    );
};
