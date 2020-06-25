import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import ListMui from '@material-ui/core/List'
import ContainerMui from "@material-ui/core/Container"
import CircularProgressMui from "@material-ui/core/CircularProgress/CircularProgress"
import Task from "./Task/Task"
import NewTask from "./NewTask/NewTask"
import {Route, RouteComponentProps, withRouter} from "react-router"
import {AppStateType} from "../../../redux/store"
import {getTasks, selectMyTasks, setFetching, setTasks} from "../../../redux/tasksReducer"
import {TaskType} from "../../../types/types"
import {ROUTE} from "../../../redux/appReducer"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
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

const TasksList: React.FC<RouteComponentProps & MapStatePropsType & MapDispatchPropsType> = (props) => {

    const classes = useStyles();

    // Установка флага процесса загрузки при загрузке списка пользователей
    let {usersIsFetching, setFetching, selectedProjectId, getTasks, setTasks, route, projects} = props
    useEffect(() => {
        if (usersIsFetching) setFetching(true)
        else switch (props.history.location.pathname) {
            case ROUTE.ROOT:
                selectedProjectId !== null && getTasks([selectedProjectId], null)
                break
            case ROUTE.MY_TASKS:
                projects.length > 0 && props.selectMyTasks()
                break
            default:
                setTasks([])
        }
    }, [usersIsFetching, selectedProjectId, route, setFetching, getTasks, setTasks, projects])
    // todo: баг при открытии страницы mytask

    return (
        /*Установка положения области задач по середине блока и ширины*/
        <ContainerMui maxWidth={"sm"}>
            <ListMui className={classes.root}>
                {
                    props.isFetching && props.isAuth
                        ? <CircularProgressMui className={classes.progress} size={50}/>
                        : props.isAuth && (
                            <div>
                                {props.filteredTasks.map(item => <Task key={item.id} task={item}/>)}
                                {props.route === ROUTE.ROOT && props.selectedProjectId !== null && <NewTask/>}
                            </div>
                        )
                }
            </ListMui>
        </ContainerMui>
    );
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.tasks.isFetching,
        isAuth: state.auth.isAuth,
        usersIsFetching: state.users.isFetching,
        selectedProjectId: state.projects.selectedProjectId,
        addNewTaskInProcess: state.tasks.addNewTaskInProcess,
        filteredTasks: state.tasks.filteredTasks,
        route: state.app.route,
        projects: state.projects.projects
    }
}

type MapDispatchPropsType = {
    setFetching: (isFetching: boolean) => void,
    getTasks: (projectIds: Array<number> | null, userIds: Array<number> | null) => void,
    setTasks: (tasks: Array<TaskType>) => void,
    selectMyTasks: () => void
}
const mapDispatchToProps = {
    setFetching,
    getTasks,
    setTasks,
    selectMyTasks
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TasksList))