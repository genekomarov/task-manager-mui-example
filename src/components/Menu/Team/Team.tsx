import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListMui from '@material-ui/core/List';
import ListItemMui from '@material-ui/core/ListItem';
import ListItemIconMui from '@material-ui/core/ListItemIcon';
import ListItemTextMui from '@material-ui/core/ListItemText';
import CollapseMui from '@material-ui/core/Collapse';
import ExpandLessMui from '@material-ui/icons/ExpandLess';
import ExpandMoreMui from '@material-ui/icons/ExpandMore';
import PeopleIconMui from '@material-ui/icons/People';
import AccountCircleIconMui from '@material-ui/icons/AccountCircle';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"
import {AppStateType} from "../../../redux/store"
import {connect} from "react-redux"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        progress: {
            alignSelf: 'center',
            margin: theme.spacing(2),
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
)

const Team: React.FC<MapStatePropsType> = (props) => {

    const classes = useStyles()
    const [open, setOpen] = React.useState(true)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div className={classes.root}>
            <ListItemMui button onClick={handleClick}>
                <ListItemIconMui>
                    <PeopleIconMui />
                </ListItemIconMui>
                <ListItemTextMui
                    primary="Команда"
                    primaryTypographyProps={{variant: "body1"}}/>
                {open ? <ExpandLessMui /> : <ExpandMoreMui />}
            </ListItemMui>
            {props.isFetching
                ? <CircularProgress className={classes.progress}/>
                : <CollapseMui in={open} timeout="auto" unmountOnExit>
                    {['User 1', 'User 2', 'User 3'].map((item) => {
                        return (
                            <ListMui component="div" disablePadding key={item}>
                                <ListItemMui button className={classes.nested}>
                                    <ListItemIconMui>
                                        <AccountCircleIconMui/>
                                    </ListItemIconMui>
                                    <ListItemTextMui primary={item}/>
                                </ListItemMui>
                            </ListMui>
                        )
                    })}
                </CollapseMui>
            }
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.users.isFetching
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Team)
