import './scss/titlePage.scss';

interface Props {
    title: string;
}

const TitleHeader = ({ title }: Props) => {
    return (
        <div className='titleheader'>
            <h1 className='titleheader__text'> {title} </h1>
        </div>
    );
};

export default TitleHeader;
