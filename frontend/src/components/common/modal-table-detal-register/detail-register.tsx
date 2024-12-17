import DataViewer from '@/components/page/data-viewer';
import { UserPokemonRegisterDetailInterface } from '@/interface';
import { useEffect, useState } from 'react';
import { PokemonRegisterDetailTable } from './others/headers';

interface Props {
    data: UserPokemonRegisterDetailInterface[];
}

const DetailRegister = ({ data }: Props) => {
    const [dataList, setDataList] = useState<
        UserPokemonRegisterDetailInterface[]
    >([]);

    useEffect(() => {
        setDataList(data);
    }, [data]);

    return (
        <div>
            <DataViewer data={dataList} headers={PokemonRegisterDetailTable} />
        </div>
    );
};

export default DetailRegister;
