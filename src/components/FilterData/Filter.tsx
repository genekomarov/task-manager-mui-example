import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';
import CombinedFilter from "./CombinedFilter/CombinedFilter"
import ByStatusSort from "./ByStatusSort/ByStatusSort"
import ByUsersFilter from "./ByUsersFilter/ByUsersFilter"
import ByContentFilter from "./ByContentFilter/ByContentFilter"
import ListMui from "@material-ui/core/List/List"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            /*maxWidth: 752,*/
            /*marginTop: "-40px"*/
        },
    }),
);

export default function Filter() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List disablePadding>
                <ListItem >

                    {/** Опции поиска*/}
                    <CombinedFilter/>
                    <ByStatusSort/>

                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <BackspaceIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem >

                    {/** Опции поиска*/}
                    <ByUsersFilter/>

                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <BackspaceIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem >

                    {/** Опции поиска*/}
                    <ByContentFilter/>

                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <BackspaceIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
    );
}
