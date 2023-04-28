import React, {useContext, useEffect, useMemo, useState} from 'react';
import MaterialReactTable from 'material-react-table';
import "../styles/dashboard-quit.css";
import {Link} from "react-router-dom";
import {
    AppBar,
    Box, CssBaseline, Divider, Drawer,
    IconButton, List,
    MenuItem, Toolbar,
    Tooltip, Typography,
} from '@mui/material';
import {Edit} from '@mui/icons-material';
import axios from "axios";
import UserContext from "../contexts/userContext";
import {useNavigate} from "react-router";
import logout_image from "../images/log-out.png";

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
                enableEditing: false,
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
                    select: true,
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
        exitEditingMode();
    };



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - 240px)`, ml: `240px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Felhasználók
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Divider />
                <List>
                    <Link className="dashboardQuit" to="/"> <img src={logout_image} className="dashboardQuitImage" alt="not-found"/> </Link>
                </List>
                <Divider />
            </Drawer>
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
            editingMode="modal"
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            renderRowActions={({row, table}) => {
                if (userId === row.original.id) return null;
                return (
                    <Box>
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
        </Box>
    );
};


export default Dashboard;
