import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListMui from '@material-ui/core/List';
import ListItemMui from '@material-ui/core/ListItem';
import ListItemIconMui from '@material-ui/core/ListItemIcon';
import ListItemTextMui from '@material-ui/core/ListItemText';
import CollapseMui from '@material-ui/core/Collapse';
import ExpandLessMui from '@material-ui/icons/ExpandLess';
import ExpandMoreMui from '@material-ui/icons/ExpandMore';
import FilterListIconMui from '@material-ui/icons/FilterList';
import Filter from "./Filter"
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        /*nested: {
            paddingLeft: theme.spacing(4),
        },*/

    }),
);

export default function FilterWrapper() {
    /*const classes = useStyles();*/
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemMui button onClick={handleClick} >
                <ListItemIconMui >
                    <SearchIcon />
                </ListItemIconMui>
                <ListItemTextMui
                    primary="Поиск задач"
                    primaryTypographyProps={{variant: "body1"}}/>
                {open ? <ExpandLessMui /> : <ExpandMoreMui />}
            </ListItemMui>
            <CollapseMui in={open} timeout="auto" unmountOnExit>
                <ListMui component="div" disablePadding>
                    <Filter/>
                </ListMui>
            </CollapseMui>
        </>
    );
}
