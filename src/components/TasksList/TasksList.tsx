import React, {useEffect, useMemo} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import ListMui from '@material-ui/core/List'
import ContainerMui from "@material-ui/core/Container"
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"
import {AppStateType} from "../../redux/store"
import {connect} from "react-redux"
import {getTasks, setCountOfShownTasks, setFetching} from "../../redux/tasksReducer"
import {TaskType} from "../../types/types"
import {filterByDate, filterByStatus} from "../../utils/tasksFilters"
import Task from "./Task/Task"
import {setSelectedProjectId} from "../../redux/projectsReducer"
import NewTask from "./NewTask/NewTask"

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
        itemSecondaryText: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    }),
)

const TasksList: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    useEffect(() => {
        props.usersIsFetching
            ? props.setFetching(true)
            : props.selectedProjectId !== null && props.getTasks([props.selectedProjectId], null)
    }, [props.usersIsFetching])

    const classes = useStyles();

    let tasksWithClientSideData = props.tasks.filter(
        t => !props.tasksOnClient.deleted.filter(
            item => item === t.id
        ).length
    ).concat(props.tasksOnClient.items.filter(item => item.project === props.selectedProjectId))

    let filteredTasks = tasksWithClientSideData.filter((t) => {
        let statusFilter = props.filter.status !== null ? t.isDone === props.filter.status : true
        let usersFilter = props.filter.userIds && props.filter.userIds.length > 0 ? props.filter.userIds.filter(id => id === t.author).length > 0 : true
        let contentFilter = props.filter.content ? t.title.match(new RegExp(props.filter.content, 'gi')) : true
        return statusFilter && usersFilter && contentFilter
    })

    filteredTasks = filteredTasks.sort((a: TaskType, b: TaskType): number => {
        let sortResultByStatus = filterByStatus(a, b, props.sort.firstCompleted)
        let sortResultByDate = filterByDate(a, b, props.sort.firstNew)

        if (sortResultByStatus !== 0) return sortResultByStatus
        else return sortResultByDate
    })

    useEffect(()=>{
        props.setCountOfShownTasks(filteredTasks.length)
    },[filteredTasks])

    return (
        <ContainerMui maxWidth={"sm"}>
            <ListMui className={classes.root}>
                {
                    props.isFetching && props.isAuth
                        ? <CircularProgress className={classes.progress} size={50}/>
                        : props.isAuth && (
                            <div>
                                {filteredTasks.map(item => <Task key={item.id} task={item}/>)}
                                <NewTask/>
                            </div>
                    )
                }
            </ListMui>
        </ContainerMui>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.tasks.isFetching,
        isAuth: state.auth.isAuth,
        usersIsFetching: state.users.isFetching,
        selectedProjectId: state.projects.selectedProjectId,
        tasks: state.tasks.tasks,
        filter: state.tasks.filter,
        sort: state.tasks.sort,
        tasksOnClient: state.clientSideDb.clientSideData.tasks
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