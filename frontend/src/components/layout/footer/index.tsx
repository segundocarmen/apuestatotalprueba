import Style from './footer.module.scss';

const FooterComponent = () => {
    return (
        <div className={Style.footer}>
            <div className={Style.footer__container}>
                <div className={Style.footer__container__info}>
                    <span>Copyright &copy; 2024 Pokego</span>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;
