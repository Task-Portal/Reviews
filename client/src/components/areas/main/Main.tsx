import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../store/AppState";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable, {SelectRowProps} from "react-bootstrap-table-next";

import User from "../../../models/User";
import {SelectedCboxType} from "../../../store/selectedCheckboxes/selectedCboxReducer";
import Container from 'react-bootstrap/Container'
import format from 'date-fns/format'

const columns = [

    {
        dataField: "userName",
        text: "Name",
        sort: true
    },
    {
        dataField: "email",
        text: "Email",
        sort: true
    },
    {
        dataField: "status",
        text: "Status",
        sort: true
    },
    {
        dataField: "createdOn",
        text: "Created On",
        sort: true,
        formatter: (cell: any) => {
            return format(new Date(cell), 'dd MMMM yyyy eee H:mm:ss')
        }
    }, {
        dataField: "lastModifiedOn",
        text: "Last Login Date",
        sort: true,
        formatter: (cell: any) => {
            return format(new Date(cell), 'dd MMMM yyyy eee H:mm:ss')
        }
    }

];

const Main = () => {

    const usersState = useSelector((state: AppState) => state.users);
    const userState = useSelector((state: AppState) => state.user);
    const [data, setData] = useState<Array<User>>([])
    const [selectedCbox, setSelectedCbox] = useState<Array<string>>([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (usersState) {
            setData(usersState)
        }
    }, [usersState]);

    const selectRow: SelectRowProps<any> = {
        mode: "checkbox",
        bgColor: (row) => {
            return row.id === userState?.id ? "skyblue" : "navajowhite"
        },
        clickToSelect: true,
        onSelect: (row, isSelect) => {

            let f = [...selectedCbox]
            isSelect ? f.push(row.id) : f = f.filter(m => m !== row.id)
            setSelectedCbox(f)
            dispatch({type: SelectedCboxType, payload: f})
        },
        onSelectAll: (isSelect, rows) => {

            const r = isSelect ? rows.map(m => m.id) : []
            setSelectedCbox(r)
            dispatch({type: SelectedCboxType, payload: r})

        },
        selected: [...selectedCbox],
    }

    return (

       data.length>0? <Container>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={data!}
                columns={columns}
                selectRow={selectRow}
                classes="bootstrap_class"
                bordered={false}
                striped={true}

            />
        </Container> :null

    );
};

export default Main;
