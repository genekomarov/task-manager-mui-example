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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

const Filter: React.FC<any> = () => {

    const classes = useStyles();

    type OwnProps = {
        children: React.ReactElement | React.ReactElement[]
    }
    const FilterRow: React.FC<OwnProps> = (props) => {
        return (
            <ListItemMui >
                {props.children}
                <ListItemSecondaryActionMui>
                    <IconButtonMui edge="end" aria-label="delete">
                        <BackspaceIconMui/>
                    </IconButtonMui>
                </ListItemSecondaryActionMui>
            </ListItemMui>
        )
    }

    return (
        <div className={classes.root}>
            <ListMui disablePadding>
                <FilterRow>
                        <CombinedFilter/>
                        <ByStatusSort/>
                </FilterRow>
                <FilterRow><ByUsersFilter/></FilterRow>
                <FilterRow><ByContentFilter/></FilterRow>
            </ListMui>
        </div>
    );
}

export default Filter
