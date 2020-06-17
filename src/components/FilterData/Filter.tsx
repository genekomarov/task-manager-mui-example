import React from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import ListMui from '@material-ui/core/List'
import ListItemMui from '@material-ui/core/ListItem'
import ListItemSecondaryActionMui from '@material-ui/core/ListItemSecondaryAction'
import IconButtonMui from '@material-ui/core/IconButton'
import BackspaceIconMui from '@material-ui/icons/Backspace'
import CombinedFilter from "./CombinedFilter/CombinedFilter"
import ByStatusSort from "./ByStatusSort/ByStatusSort"
import ByUsersFilter from "./ByUsersFilter/ByUsersFilter"
import ByContentFilter from "./ByContentFilter/ByContentFilter"
import {AppStateType} from "../../redux/store"
import {appInitializing} from "../../redux/appReducer"
import {connect} from "react-redux"
import FilterRow from "./FilterRow/FilterRow"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

const Filter: React.FC<any> = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ListMui disablePadding>
                <FilterRow rowNumber={1}>
                        <CombinedFilter/>
                        <ByStatusSort/>
                </FilterRow>
                <FilterRow rowNumber={2}><ByUsersFilter/></FilterRow>
                <FilterRow rowNumber={3}><ByContentFilter/></FilterRow>
            </ListMui>
        </div>
    );
}


export default Filter
