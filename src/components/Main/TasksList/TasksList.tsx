import React, {useEffect} from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {connect} from 'react-redux'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import ListMui from '@material-ui/core/List'
import ContainerMui from '@material-ui/core/Container'
import CircularProgressMui from '@material-ui/core/CircularProgress/CircularProgress'
import Task from './Task/Task'
import NewTask from './NewTask/NewTask'
import {AppStateType} from '../../../redux/store'
import {TaskType} from '../../../types/types'
import {getTasks, selectMyTasks, setFetching, setTasks} from '../../../redux/tasksReducer'
import {ROUTE} from '../../../redux/appReducer'
import {compose} from "redux"

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

    const classes = useStyles()

    // Положение списка задач
    let {setFetching, selectedProjectId, getTasks, setTasks, route, projects, selectMyTasks} = props
    let locationPath = props.history.location.pathname
    useEffect(() => {
        switch (locationPath) {
            case ROUTE.ROOT:
                selectedProjectId !== null && getTasks([selectedProjectId], null)
                break
            case ROUTE.MY_TASKS:
                projects.length > 0 && selectMyTasks()
                break
            default:
                setTasks([])
        }
    }, [selectedProjectId, route, setFetching, getTasks, setTasks, projects, locationPath, selectMyTasks])

    return (
        <ContainerMui maxWidth={'sm'}>
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
    )
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.tasks.isFetching,
        isAuth: state.auth.isAuth,
        selectedProjectId: state.projects.selectedProjectId,
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

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TasksList)