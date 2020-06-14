import React, {useEffect} from 'react';
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
import {getUsers, setFetching, setSelectedUserId} from "../../../redux/usersReducer"
import FolderOpenIcon from "@material-ui/core/SvgIcon/SvgIcon"
import PersonIcon from '@material-ui/icons/Person';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {TaskFilterType} from "../../../types/types"
import {setFilter} from "../../../redux/tasksReducer"

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

const Users: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {
    /**Активируем каскад вертушек
     * при начале инициализации*/
    useEffect(() => {
        props.projectsIsFetching && props.setFetching(true)
    }, [props.projectsIsFetching])

    useEffect(() => {
        props.selectedProjectId!==null && props.getUsers([props.selectedProjectId])
    },[props.selectedProjectId])

    const classes = useStyles()
    const [open, setOpen] = React.useState(true)

    const handleClick = () => {
        setOpen(!open)
    }

    const handleItemClick = (selectedUserId: number) => {
        props.setSelectedUserId(selectedUserId)
        props.setFilter({userIds: [selectedUserId], status: undefined, content: undefined}, true)
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
            {props.isFetching && props.isAuth
                ? <CircularProgress className={classes.progress}/>
                : <CollapseMui in={open} timeout="auto" unmountOnExit>
                    {props.isAuth && props.users.map((item) => {
                        return (
                            <ListMui component="div" disablePadding key={item.id}>
                                <ListItemMui button className={classes.nested} onClick={() => handleItemClick(item.id)}>
                                    <ListItemIconMui>
                                        {
                                            item.id === props.selectedUserId
                                                ? <PermIdentityIcon/>
                                                : <PersonIcon/>
                                        }
                                    </ListItemIconMui>
                                    <ListItemTextMui primary={
                                        `${item.nickname} (${props.tasks.filter(t => t.author === item.id).length})`
                                    }/>
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
        isFetching: state.users.isFetching,
        isAuth: state.auth.isAuth,
        projectsIsFetching: state.projects.isFetching,
        selectedProjectId: state.projects.selectedProjectId,
        users: state.users.users,
        selectedUserId: state.users.selectedUserId,
        tasks: state.tasks.tasks
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    setFetching: (isFetching: boolean) => void,
    getUsers: (projectIds: Array<number>) => void,
    setSelectedUserId: (selectedUserId: number) => void,
    setFilter: (filter: TaskFilterType, rewrite?: boolean) => void
}
const mapDispatchToProps = {
    setFetching,
    getUsers,
    setSelectedUserId,
    setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
