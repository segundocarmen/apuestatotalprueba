import Style from './headerInfoStyle.module.scss';

const HeaderInfo = () => {
    return (
        <div className={Style.headerinfo}>
            <div className={Style.headerinfo__text}>
                <span>
                    Para registrar tus pokemon en <strong>POKEGO</strong>,
                    inicia sesión
                </span>
            </div>
        </div>
    );
};

export default HeaderInfo;
