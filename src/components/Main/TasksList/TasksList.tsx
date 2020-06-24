import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import ListMui from '@material-ui/core/List'
import ContainerMui from "@material-ui/core/Container"
import CircularProgressMui from "@material-ui/core/CircularProgress/CircularProgress"
import Task from "./Task/Task"
import NewTask from "./NewTask/NewTask"
import {Route} from "react-router"
import {AppStateType} from "../../../redux/store"
import {getTasks, setFetching} from "../../../redux/tasksReducer"

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

const TasksList: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const classes = useStyles();

    // Установка флага процесса загрузки при загрузке списка пользователей
    let {usersIsFetching, setFetching, selectedProjectId, getTasks} = props
    useEffect(() => {
        usersIsFetching
            ? setFetching(true)
            : selectedProjectId !== null && getTasks([selectedProjectId], null)
    }, [usersIsFetching, setFetching, selectedProjectId, getTasks])

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
                                <Route exact path='/'>
                                    <NewTask/>
                                </Route>
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
        filteredTasks: state.tasks.filteredTasks
    }
}

type MapDispatchPropsType = {
    setFetching: (isFetching: boolean) => void,
    getTasks: (projectIds: Array<number> | null, userIds: Array<number> | null) => void
}
const mapDispatchToProps = {
    setFetching,
    getTasks,
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList)