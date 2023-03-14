import React, {useContext, useEffect, useMemo, useState} from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    IconButton,
    MenuItem,
    Tooltip, Typography,
} from '@mui/material';
import {Edit} from '@mui/icons-material';
import axios from "axios";
import UserContext from "../contexts/userContext";
import {useNavigate} from "react-router";

const RANKS = ["Felhasználó", "Adminisztrátor"];

const Dashboard = () => {
    const [tableData, setTableData] = useState([]);
    const {id: userId, loggedIn, rank} = useContext(UserContext);
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/admin/users");
            setTableData(res["data"]);
        } catch (e) {
            console.error(e.response);
        }
    }

    const sanitizeUsersData = (users) => {
        return users.map(user => {
            return {
                ...user,
                rank: user["rank"] === "U" ? "Felhasználó" : "Adminisztrátor"
            }
        })
    }

    useEffect(() => {
        fetchUsers().then(() => setTableData(sanitizeUsersData));
    }, [flag]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableEditing: false, //disable editing on this column
                size: 80,
            },
            {
                accessorKey: 'username',
                header: 'Felhasználónév',
                size: 140,
                enableEditing: false,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({}),
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 140,
                enableEditing: false,
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    type: 'email',

                }),
            },
            {
                accessorKey: 'rank',
                header: 'Rang',
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    select: true, //change to select for a dropdown
                    children: RANKS.map((rank) => (
                        <MenuItem key={rank} value={rank}>
                            {rank}
                        </MenuItem>
                    )),
                }),
            },
        ],
        [],
    );

    if (!loggedIn) {
        navigate("/authentication");
        return;
    }

    if (rank !== "A") {
        navigate("/");
        return;
    }

    const patchEdit = (id, rank) => {
        return axios.patch("admin/users", {id, rank});
    }

    const handleSaveRowEdits = async ({exitEditingMode, row, values}) => {
        tableData[row.index] = values;
        const rank = values["rank"] === "Felhasználó" ? "U" : "A";
        const id = values["id"];
        try {
            const editRes = await patchEdit(id, rank);
            if (editRes["status"] === 200) {
                setFlag(!flag);
            }
        } catch (e) {
            console.error(e.response);
        }
        exitEditingMode(); //required to exit editing mode and close modal
    };

    return (
        <MaterialReactTable
            displayColumnDefOptions={{
                'mrt-row-actions': {
                    muiTableHeadCellProps: {
                        align: 'center',
                    },
                    size: 120,
                },
            }}
            columns={columns}
            data={tableData}
            editingMode="modal" //default
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            renderRowActions={({row, table}) => {
                if (userId === row.original.id) return null;
                return (
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }}
            localization={{
                actions: "Műveletek",
                cancel: "Mégse",
                save: "Mentés"

            }}
            renderTopToolbarCustomActions={() => <Typography variant="h3">Felhasználók</Typography>}
        />
    );
};

//example of creating a mui dialog modal for creating new rows
export default Dashboard;
