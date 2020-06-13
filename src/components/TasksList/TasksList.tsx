import React, {useEffect, useMemo} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import ListMui from '@material-ui/core/List'
import ListItemMui from '@material-ui/core/ListItem'
import ListItemIconMui from '@material-ui/core/ListItemIcon'
import ListItemSecondaryActionMui from '@material-ui/core/ListItemSecondaryAction'
import ListItemTextMui from '@material-ui/core/ListItemText'
import CheckboxMui from '@material-ui/core/Checkbox'
import IconButtonMui from '@material-ui/core/IconButton'
import ContainerMui from "@material-ui/core/Container"
import DeleteOutlineIconMui from '@material-ui/icons/DeleteOutline'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"
import CollapseMui from "@material-ui/core/Collapse/Collapse"
import {AppStateType} from "../../redux/store"
import {connect} from "react-redux"
import {getTasks, setCountOfShownTasks, setFetching} from "../../redux/tasksReducer"
import {TaskFilterType, TaskType, UserType} from "../../types/types"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 600,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            flexDirection: 'column',
        },
        progress: {
            alignSelf: 'center',
            margin: theme.spacing(2),
        },
    }),
)

const TasksList: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    /*********************************************
     * Отладочный блок
     * *******************************************/
    console.log(`Component "TasksList" was drawed`)

    useEffect(()=>{console.log(`isFetching =        ${props.isFetching}`)},[props.isFetching])
    useEffect(()=>{console.log(`isAuth] =           ${props.isAuth}`)},[props.isAuth])
    useEffect(()=>{console.log(`usersIsFetching =   ${props.usersIsFetching}`)},[props.usersIsFetching])
    useEffect(()=>{console.log(`selectedUserId =    ${props.selectedUserId}`)},[props.selectedUserId])
    useEffect(()=>{console.log(`selectedProjectId = ${props.selectedProjectId}`)},[props.selectedProjectId])
    useEffect(()=>{console.log(`tasks =             ${props.tasks}`)},[props.tasks])
    useEffect(()=>{console.log(`users =             ${props.users}`)},[props.users])
    useEffect(()=>{console.log(`myId =              ${props.myId}`)},[props.myId])
    useEffect(()=>{console.log(`filter =            ${props.filter}`)},[props.filter])

    /*********************************************
     * Конец отладочного блока
     * *******************************************/


    useEffect(() => {
        props.usersIsFetching && props.setFetching(true)
    }, [props.usersIsFetching])

    useEffect(() => {

        props.selectedProjectId !== null && props.getTasks([props.selectedProjectId], null)
    }, [props.selectedProjectId])

    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    };

    const userNickNameByUserId = (users: Array<UserType>, item: TaskType) => {
        let userNicknams = props.users.filter((u) => u.id === item.author)
        return userNicknams.length > 0 && userNicknams[0].nickname
    }

    const filteredTasks = useMemo(() => {
        return props.tasks.filter((t) => {
                let statusFilter = props.filter.status !== null ? t.isDone === props.filter.status : true
                let usersFilter = props.filter.userIds.length > 0 ? props.filter.userIds.filter(id => id === t.author).length > 0 : true
                let contentFilter = t.title.match(new RegExp(props.filter.content, 'g'))
                return statusFilter && usersFilter && contentFilter
            })
    }, [props.filter, props.tasks])

    const countOfShownTasks = useMemo(()=>{
        props.setCountOfShownTasks(filteredTasks.length)
    },[filteredTasks])

    return (
        <ContainerMui maxWidth={"sm"}>
            <ListMui className={classes.root}>
                {props.isFetching && props.isAuth
                    ? <CircularProgress className={classes.progress} size={50}/>
                    : props.isAuth && filteredTasks.map((item) => {
                    const labelId = `checkbox-list-label-${item.id}`;
                    return (
                        <ListItemMui key={item.id} role={undefined} button onClick={handleToggle(item.id)}>
                            <ListItemIconMui>
                                <CheckboxMui
                                    edge="start"
                                    checked={item.isDone}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIconMui>
                            <ListItemTextMui id={labelId}
                                             primary={item.title}
                                             secondary={
                                                 userNickNameByUserId(props.users, item)
                                             }
                            />
                            {item.author === props.myId && (
                                <ListItemSecondaryActionMui>
                                    <IconButtonMui edge="end" aria-label="comments">
                                        <DeleteOutlineIconMui/>
                                    </IconButtonMui>
                                </ListItemSecondaryActionMui>
                            )}
                        </ListItemMui>
                    );
                })}
            </ListMui>
        </ContainerMui>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.tasks.isFetching,
        isAuth: state.auth.isAuth,
        usersIsFetching: state.users.isFetching,
        selectedUserId: state.users.selectedUserId,
        selectedProjectId: state.projects.selectedProjectId,
        tasks: state.tasks.tasks,
        users: state.users.users,
        myId: state.auth.id,
        filter: state.tasks.filter
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    setFetching: (isFetching: boolean) => void,
    getTasks: (projectIds: Array<number> | null, userIds: Array<number> | null) => void
    setCountOfShownTasks: (countOfShownTasks: number) => void
}
const mapDispatchToProps = {
    setFetching,
    getTasks,
    setCountOfShownTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList)