import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import ListMui from '@material-ui/core/List'
import ListItemMui from '@material-ui/core/ListItem'
import ListItemIconMui from '@material-ui/core/ListItemIcon'
import ListItemTextMui from '@material-ui/core/ListItemText'
import CollapseMui from '@material-ui/core/Collapse'
import CircularProgressMui from '@material-ui/core/CircularProgress/CircularProgress'
import ExpandLessMui from '@material-ui/icons/ExpandLess'
import ExpandMoreMui from '@material-ui/icons/ExpandMore'
import PeopleIconMui from '@material-ui/icons/People'
import PersonIconMui from '@material-ui/icons/Person'
import PermIdentityIconMui from '@material-ui/icons/PermIdentity'
import {AppStateType} from '../../../redux/store'
import {TaskFilterType, UserType} from '../../../types/types'
import {getUsersByIds, getUsersByProjectIds, setSelectedUserId, setUsers} from '../../../redux/usersReducer'
import {setFilter} from '../../../redux/tasksReducer'
import {ROUTE} from '../../../redux/appReducer'

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

const Users: React.FC<RouteComponentProps & MapStatePropsType & MapDispatchPropsType> = (props) => {

    const classes = useStyles()
    const [open, setOpen] = React.useState(true)

    // Установка флага процесса загрузки при загрузке списка проектов
    let {selectedProjectId, getUsersByProjectIds, setUsers, myId, getUsersByIds} = props
    let  locationPathName = props.history.location.pathname
    useEffect(() => {
        switch (locationPathName) {
            case ROUTE.ROOT:
                if (selectedProjectId !== null) getUsersByProjectIds([selectedProjectId])
                else setUsers([])
                break
            case ROUTE.MY_TASKS:
                if (myId !== null) getUsersByIds([myId])
                else setUsers([])
                break
            default:
                setUsers([])
        }
    }, [selectedProjectId, setUsers, getUsersByProjectIds, locationPathName, myId, getUsersByIds])

    const handleCollapseList = () => {setOpen(!open)}

    const handleSelectItem = (selectedUserId: number) => {
        props.setSelectedUserId(selectedUserId)
        props.setFilter({userIds: [selectedUserId], status: undefined, content: undefined}, true)
    }

    return (
        <div className={classes.root}>

            {/*Элемент заголовка списка*/}
            <ListItemMui button onClick={handleCollapseList}>
                <ListItemIconMui>
                    <PeopleIconMui/>
                </ListItemIconMui>
                <ListItemTextMui
                    primary='Команда'
                    primaryTypographyProps={{variant: 'body1'}}/>
                {open ? <ExpandLessMui/> : <ExpandMoreMui/>}
            </ListItemMui>

            {/*Список*/}
            {props.isFetching && props.isAuth
                ? <CircularProgressMui className={classes.progress}/>
                : <CollapseMui in={open} timeout='auto' unmountOnExit>
                    {props.isAuth && props.users.map((item) => {
                        return (
                            <ListMui component='div' disablePadding key={item.id}>
                                <ListItemMui button className={classes.nested}
                                             onClick={() => handleSelectItem(item.id)}>
                                    <ListItemIconMui>
                                        {
                                            item.id === props.selectedUserId
                                                ? <PermIdentityIconMui/>
                                                : <PersonIconMui/>
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

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.users.isFetching,
        isAuth: state.auth.isAuth,
        selectedProjectId: state.projects.selectedProjectId,
        users: state.users.users,
        selectedUserId: state.users.selectedUserId,
        tasks: state.tasks.tasks,
        myId: state.auth.id
    }
}

type MapDispatchPropsType = {
    getUsersByProjectIds: (projectIds: Array<number>) => void,
    getUsersByIds: (userIds: Array<number>) => void,
    setUsers: (users: Array<UserType>) => void
    setSelectedUserId: (selectedUserId: number) => void,
    setFilter: (filter: TaskFilterType, rewrite?: boolean) => void
}
const mapDispatchToProps = {
    getUsersByProjectIds,
    getUsersByIds,
    setUsers,
    setSelectedUserId,
    setFilter
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))