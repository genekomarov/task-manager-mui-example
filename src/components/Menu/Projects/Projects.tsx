import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
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
)

const Projects: React.FC<any> = () => {
    
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <ListItemMui button onClick={handleClick}>
                <ListItemIconMui>
                    <AccountTreeIconMui/>
                </ListItemIconMui>
                <ListItemTextMui
                    primary="Проекты"
                    primaryTypographyProps={{variant: "body1"}}/>
                {open ? <ExpandLessMui/> : <ExpandMoreMui/>}
            </ListItemMui>
            <CollapseMui in={open} timeout="auto" unmountOnExit>
                {['Работа', 'Учеба', 'Дом'].map((item) => {
                    return (
                        <ListMui component="div" disablePadding key={item}>
                            <ListItemMui button className={classes.nested}>
                                <ListItemIconMui>
                                    <FolderIconMui/>
                                </ListItemIconMui>
                                <ListItemTextMui primary={item}/>
                            </ListItemMui>
                        </ListMui>
                    )
                })}
            </CollapseMui>
        </>
    );
}

export default Projects