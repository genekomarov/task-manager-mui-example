import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListMui from '@material-ui/core/List';
import ListItemMui from '@material-ui/core/ListItem';
import ListItemIconMui from '@material-ui/core/ListItemIcon';
import ListItemTextMui from '@material-ui/core/ListItemText';
import CollapseMui from '@material-ui/core/Collapse';
import ExpandLessMui from '@material-ui/icons/ExpandLess';
import ExpandMoreMui from '@material-ui/icons/ExpandMore';
import AccountTreeIconMui from '@material-ui/icons/AccountTree';
import FolderIconMui from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

export default function Projects() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemMui button onClick={handleClick}>
                <ListItemIconMui>
                    <AccountTreeIconMui />
                </ListItemIconMui>
                <ListItemTextMui
                    primary="Проекты"
                    primaryTypographyProps={{variant: "body1"}}/>
                {open ? <ExpandLessMui /> : <ExpandMoreMui />}
            </ListItemMui>
            <CollapseMui in={open} timeout="auto" unmountOnExit>
                <ListMui component="div" disablePadding>
                    <ListItemMui button className={classes.nested}>
                        <ListItemIconMui>
                            <FolderIconMui />
                        </ListItemIconMui>
                        <ListItemTextMui primary="Работа" />
                    </ListItemMui>
                </ListMui>
                <ListMui component="div" disablePadding>
                    <ListItemMui button className={classes.nested}>
                        <ListItemIconMui>
                            <FolderIconMui />
                        </ListItemIconMui>
                        <ListItemTextMui primary="Учеба" />
                    </ListItemMui>
                </ListMui>
                <ListMui component="div" disablePadding>
                    <ListItemMui button className={classes.nested}>
                        <ListItemIconMui>
                            <FolderIconMui />
                        </ListItemIconMui>
                        <ListItemTextMui primary="Дом" />
                    </ListItemMui>
                </ListMui>
            </CollapseMui>
        </>
    );
}
