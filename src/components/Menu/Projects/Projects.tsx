import React, {useEffect} from 'react';
import {connect} from "react-redux"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import ListMui from '@material-ui/core/List';
import ListItemMui from '@material-ui/core/ListItem';
import ListItemIconMui from '@material-ui/core/ListItemIcon';
import ListItemTextMui from '@material-ui/core/ListItemText';
import CollapseMui from '@material-ui/core/Collapse';
import CircularProgressMui from '@material-ui/core/CircularProgress';
import ExpandLessMui from '@material-ui/icons/ExpandLess';
import ExpandMoreMui from '@material-ui/icons/ExpandMore';
import AccountTreeIconMui from '@material-ui/icons/AccountTree';
import FolderIconMui from '@material-ui/icons/Folder';
import FolderOpenIconMui from '@material-ui/icons/FolderOpen';
import {AppStateType} from "../../../redux/store"
import {ProjectType, TaskFilterType, TaskSortType} from "../../../types/types"
import {getProjects, setProjects, setSelectedProjectId} from "../../../redux/projectsReducer"
import {setSelectedUserId} from "../../../redux/usersReducer"
import {setFilter, setSort} from "../../../redux/tasksReducer"
import {NavLink} from "react-router-dom"
import Tab from "@material-ui/core/Tab"

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

const Projects: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const classes = useStyles()
    const [open, setOpen] = React.useState(true)

    // Изменение списка проектов при изменении статуса авторизации
    let {myId, getProjects, setProjects} = props
    useEffect(() => {
        myId!==null
            ? getProjects([myId])
            : setProjects([])
    },[myId, getProjects, setProjects])

    const handleCollapseList = () => {
        setOpen(!open)
    }

    const handleSelectList = (selectedProjectId: number) => {
        props.setSelectedProjectId(selectedProjectId)
        props.setFilter({userIds: null, status: null, content: null})
        props.setSort({firstCompleted: null, firstNew: null})
        props.setSelectedUserId(null)
    }

    return (
        <div className={classes.root}>

            {/*Элемент заголовка списка*/}
            <ListItemMui button onClick={handleCollapseList}>
                <ListItemIconMui>
                    <AccountTreeIconMui/>
                </ListItemIconMui>
                <ListItemTextMui
                    primary="Проекты"
                    primaryTypographyProps={{variant: "body1"}}/>
                {open ? <ExpandLessMui/> : <ExpandMoreMui/>}
            </ListItemMui>

            {/*Список*/}
            {props.isFetching && props.isAuth
                ? <CircularProgressMui className={classes.progress}/>
                : <CollapseMui in={open} timeout="auto" unmountOnExit>
                    {props.isAuth  && props.projects.map((item) => {
                        return (
                            <ListMui component="div" disablePadding key={item.id}>
                                <ListItemMui
                                    /*button*/
                                    className={classes.nested}
                                    onClick={() => handleSelectList(item.id)}
                                    to={'/'}
                                    component={NavLink}
                                >
                                    <ListItemIconMui>
                                        {
                                            item.id === props.selectedProjectId
                                                ? <FolderOpenIconMui/>
                                                : <FolderIconMui/>
                                        }
                                    </ListItemIconMui>
                                    <ListItemTextMui primary={item.projectName}/>
                                </ListItemMui>
                            </ListMui>
                        )
                    })}
                </CollapseMui>
            }
        </div>
    );
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.projects.isFetching,
        isAuth: state.auth.isAuth,
        projects: state.projects.projects,
        myId: state.auth.id,
        selectedProjectId: state.projects.selectedProjectId,
        isInitialized: state.app.isInitialized
    }
}

type MapDispatchPropsType = {
    getProjects: (userIds: Array<number>) => void
    setProjects: (projects: Array<ProjectType>) => void
    setSelectedProjectId: (selectedProjectId: number) => void
    setSelectedUserId: (selectedUserId: number | null) => void
    setFilter: (filter: TaskFilterType) => void
    setSort: (sort: TaskSortType) => void
}
const mapDispatchToProps = {
    getProjects,
    setProjects,
    setSelectedProjectId,
    setSelectedUserId,
    setFilter,
    setSort
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)