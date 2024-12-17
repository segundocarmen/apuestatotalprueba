import './scss/sectionButtons.scss';

interface ButtonDetail {
    class?: string;
    text?: string;
    controller: any;
}

interface PropButtons {
    CreateButton?: ButtonDetail;
    DeleteAllButton?: ButtonDetail;
    OtherButton?: ButtonDetail;
}
interface Props {
    buttons: PropButtons;
}

const SectionButtons = ({ buttons }: Props) => {
    const { CreateButton, DeleteAllButton, OtherButton } = buttons;
    return (
        <div className='sectionbuttons'>
            <div className='sectionbuttons__wrapper'>
                {CreateButton && (
                    <button
                        className='sectionbuttons__wrapper__button'
                        onClick={() => {
                            CreateButton.controller();
                        }}
                    >
                        {' '}
                        {CreateButton.text}{' '}
                    </button>
                )}
                {DeleteAllButton && (
                    <button
                        className='sectionbuttons__wrapper__button'
                        onClick={() => {
                            DeleteAllButton.controller();
                        }}
                    >
                        {' '}
                        {DeleteAllButton.text}{' '}
                    </button>
                )}
                {OtherButton && (
                    <button
                        className='sectionbuttons__wrapper__button'
                        onClick={() => {
                            OtherButton.controller();
                        }}
                    >
                        {' '}
                        {OtherButton.text}{' '}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SectionButtons;
