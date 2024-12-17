/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { TableInterface } from "./interface/table.interface";
import { tableData } from './config';
import Image from 'next/image';
import './scss/styles.scss';

const DataViewer = ({data,headers,actionsButtons,showPagination=true, addsActions, tableSize}:TableInterface) => {
    const {
        regXpage,
        listCountPages,
        emptyData,
        filesPageTxt,
        filesPageTxtConnector,
        regsPageTxt
    } = tableData;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [registersXPages, setRegistersXPages] = useState<number>(regXpage);
    const [registersCurrentPage, setRegistersCurrentPage] = useState<object[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [iniReg, setIniReg] = useState<number>(1);
    const [finReg, setFinReg] = useState<number>(1);
    const [tableRegisters, setTableRegisters] = useState<object[]>(data);
    const [registersFilter, setRegistersFilter] = useState<object[]>([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setTableRegisters(data);
            setRegistersCurrentPage(data);
        }
    }, [data]);

    //  Every time the data is assigned to the state, the data for pagination is initialized.
    useEffect(() => {
        if (tableRegisters.length) {
            ClickPagination(currentPage);
        }
    }, [tableRegisters]);

    useEffect(() => {
        ClickPagination(1, tableRegisters);
    }, [registersXPages]);

    const ChangeCountPage = (event:any) => {
        const count = event.target.value;
        let regsxp: number = registersXPages;
        regsxp = parseInt(count);
        setRegistersXPages(regsxp);
    };

    //  Assign data to be filtered - Set data of the current, initial and final page for pagination
    const AsignData = (page: number, dataAsign:object[]) => {
        setCurrentPage(page);
        const ini: number = page * registersXPages - registersXPages;
        setIniReg(ini);
        const fin: number = ini + registersXPages;
        setFinReg(fin);
        const arr: number[] = [];
        for (let i = ini; i < fin; i += 1) {
            arr.push(i);
        }
        const dataBackup: object[] = dataAsign;
        const ArrFilter: object[] = [];
        for (let x = 0; x < dataBackup.length; x += 1) {
            const exist = arr.indexOf(x);
            if (exist >= 0) {
                ArrFilter.push(dataBackup[x]);
            }
        }
        setRegistersFilter(ArrFilter);
    };

    //  The number of pages is assigned
    const setPagesPagination = (dataPages:object[]) => {
        const rxp: number = registersXPages;
        const countData = dataPages.length;
        const resto: number = countData % rxp;
        let coc: number = Math.trunc(countData / rxp);
        if (resto > 0) {
            coc += 1;
        }
        setPages(coc);
        const arrpages: number[] = [];
        for (let e = 0; e < coc; e += 1) {
            arrpages.push(e + 1);
        }
    };

    const ClickPagination = (page:any, dataPagination = registersCurrentPage) => {
        setPagesPagination(dataPagination);
        AsignData(page, dataPagination);
    };

    const ActionButtons = (id: string, type: number | null, ctrl: any) => {
        ctrl(id,type);
    }


    return(
        <div className="tablecontainer">
            <div className="tablecontainer__wrapper">

                <table style={{width: `${tableSize}px`}} className="tablecontainer__wrapper__table" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            {
                                headers.map((item) => {
                                    if(!item.show || item.show === '1'){
                                        return(
                                            <th key={item.text}>
                                                <span>
                                                    {item.text}
                                                </span>
                                            </th>
                                        )
                                    }
                                })
                            }
                            {
                                actionsButtons && <th></th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registersFilter.length > 0 &&  registersFilter.map((register:any,index) => {
                                const classRowIndex =  headers.findIndex(elm => elm.addclass);
                                const classRow = headers.find(elm => elm.addclass);
                                return(
                                    <tr className={classRowIndex >= 0 && classRow ? register[classRow?.dataField] : ''} key={register.id}>
                                        <td> {index + 1} </td>
                                        {
                                            headers.map((headElement, index) => {
                                                const nameCol:string = headElement.dataField === null ? 'id' : headElement.dataField;
                                                const inTwoLevels = nameCol.split('.');
                                                if(inTwoLevels.length === 1){
                                                    if(!headElement.show || headElement.show === '1'){
                                                        return(
                                                            <td key={headElement.dataField}> {register[nameCol]} </td>
                                                        )
                                                    }
                                                }else{
                                                    if(!headElement.show || headElement.show === '1'){
                                                        return(
                                                            <td key={`${index}-${register[inTwoLevels[0]] ? register[inTwoLevels[0]][inTwoLevels[1]] : `xd${index}`}`}> {register[inTwoLevels[0]] ? register[inTwoLevels[0]][inTwoLevels[1]]: ''} </td>
                                                        )
                                                    }
                                                }
                                                
                                            })
                                        }
                                        {
                                            actionsButtons && 
                                                <td style={{width: '130px'}}>
                                                    {
                                                        actionsButtons.onEdit && 
                                                            <button onClick={()=>{ActionButtons(register.id,0,actionsButtons.onEdit)}}>
                                                                <Image
                                                                    src={`/icons/svg/edit-color.svg`}
                                                                    alt='Edit'
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </button>
                                                    }
                                                    {
                                                        actionsButtons.onDelete &&
                                                            <button onClick={()=>{ActionButtons(register.id,1,actionsButtons.onDelete)}}>
                                                                <Image
                                                                    src={`/icons/svg/trash-color.svg`}
                                                                    alt='Edit'
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </button>
                                                    }
                                                    {
                                                        actionsButtons.onDetails &&
                                                            <button onClick={()=>{ActionButtons(register.id,2,actionsButtons.onDetails)}}>
                                                                <Image
                                                                    src={`/icons/svg/details.svg`}
                                                                    alt='Edit'
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </button>
                                                    }
                                                    {addsActions?.map(
                                                    (
                                                        itemAction,
                                                        indexAction
                                                    ) => {
                                                        return (
                                                            <button
                                                                key={`addsaction_${indexAction}`}
                                                                onClick={()=>{ActionButtons(register.id,null,itemAction.action)}}
                                                            >
                                                                <Image
                                                                    src={itemAction.iconUrl? itemAction.iconUrl : `/icons/svg/dashboard-color.svg`}
                                                                    alt='Edit'
                                                                    width={20}
                                                                    height={20}
                                                                    title={
                                                                        itemAction.title
                                                                    }
                                                                />
                                                            </button>
                                                        );
                                                    }
                                                )}
                                                </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {registersFilter.length <= 0 &&<div className="tablecontainer__wrapper__empty"> {emptyData} </div>}
            </div>
            {
                showPagination && 
                    <nav
                        className='tablecontainer__pagination'
                        aria-label='Page navigation example'
                    >
                        <div className='tablecontainer__pagination__list__nav subtitle'>
                            {`${filesPageTxt}: ${iniReg + 1}-${
                                finReg > tableRegisters.length
                                    ? tableRegisters.length
                                    : finReg
                            } ${filesPageTxtConnector} ${tableRegisters.length}`}
                        </div>
                        <ul className='tablecontainer__pagination__list'>
                            {currentPage === 1 ? (
                                <li className='tablecontainer__pagination__list__nav__item'>
                                    <span
                                        className='tablecontainer__pagination__list__nav__item__link'
                                        aria-disabled='true'
                                    >
                                        &lt;
                                    </span>
                                </li>
                            ) : (
                                <li className='tablecontainer__pagination__list__nav__item'>
                                    <button
                                        type='submit'
                                        className='tablecontainer__pagination__list__nav__item__button'
                                        onClick={() => {
                                            ClickPagination(currentPage - 1);
                                        }}
                                    >
                                        <span
                                            className='tablecontainer__pagination__list__nav__item__link isActive'
                                            aria-disabled='true'
                                        >
                                            &lt;
                                        </span>
                                    </button>
                                </li>
                            )}
                            {pages === currentPage ? (
                                <li className='tablecontainer__pagination__list__nav__item'>
                                    <span className='tablecontainer__pagination__list__nav__item__link'>
                                        &gt;
                                    </span>
                                </li>
                            ) : (
                                <li className='tablecontainer__pagination__list__nav__item'>
                                    <button
                                        type='submit'
                                        className='tablecontainer__pagination__list__nav__item__button'
                                        onClick={() => {
                                            ClickPagination(currentPage + 1);
                                        }}
                                    >
                                        <span className='tablecontainer__pagination__list__nav__item__link isActive'>
                                            &gt;
                                        </span>
                                    </button>
                                </li>
                            )}
                        </ul>
                        <div className='tablecontainer__pagination__list'>
                            <p className='tablecontainer__pagination__list__regsxpage'>
                                {regsPageTxt}
                            </p>
                            <select
                                onChange={ChangeCountPage}
                                name='lstCountPages'
                                id='lstCountPages'
                            >
                                {listCountPages.map(item => {
                                    return (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </nav>
            }
        </div>
    )
}

export default DataViewer;