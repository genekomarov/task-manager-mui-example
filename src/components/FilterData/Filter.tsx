import React from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import ListMui from '@material-ui/core/List'
import CombinedSort from "./CombinedSort/CombinedSort"
import ByStatusFilter from "./ByStatusFilter/ByStatusFilter"
import ByUsersFilter from "./ByUsersFilter/ByUsersFilter"
import ByContentFilter from "./ByContentFilter/ByContentFilter"
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
                    <CombinedSort/>
                    <ByStatusFilter/>
                </FilterRow>
                <FilterRow rowNumber={2}>
                    <ByUsersFilter/>
                </FilterRow>
                <FilterRow rowNumber={3}>
                    <ByContentFilter/>
                </FilterRow>
            </ListMui>
        </div>
    );
}


export default Filter
