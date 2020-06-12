import React, {useEffect} from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import {AppStateType} from "../../../redux/store"
import {connect} from "react-redux"
import {getProjects, setFetching, setProjects, setSelectedProjectId} from "../../../redux/projectsReducer"
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {ProjectType} from "../../../types/types"
import {setSelectedUserId} from "../../../redux/usersReducer"

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

const Projects: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    /**Активируем каскад вертушек
     * при начале инициализации*/
    useEffect(() => {
        props.initializationInProgress && props.setFetching(true)
    }, [props.initializationInProgress, props.isAuth])

    /**Получаем пользователей
     * при изменении авторизованного ID*/
    useEffect(() => {
        props.myId!==null
            ? props.getProjects([props.myId])
            : props.setProjects([])
    },[props.myId])

    const classes = useStyles()
    const [open, setOpen] = React.useState(true)

    const handleClick = () => {
        setOpen(!open)
    }

    const handleItemClick = (selectedProjectId: number) => {
        props.setSelectedProjectId(selectedProjectId)
        props.setSelectedUserId(null)
    }

    return (
        <div className={classes.root}>
            <ListItemMui button onClick={handleClick}>
                <ListItemIconMui>
                    <AccountTreeIconMui/>
                </ListItemIconMui>
                <ListItemTextMui
                    primary="Проекты"
                    primaryTypographyProps={{variant: "body1"}}/>
                {open ? <ExpandLessMui/> : <ExpandMoreMui/>}
            </ListItemMui>
            {props.isFetching && props.isAuth
                ? <CircularProgress className={classes.progress}/>
                : <CollapseMui in={open} timeout="auto" unmountOnExit>
                    {props.isAuth  && props.projects.map((item) => {
                        return (
                            <ListMui component="div" disablePadding key={item.id}>
                                <ListItemMui button className={classes.nested} onClick={() => handleItemClick(item.id)}>
                                    <ListItemIconMui>
                                        {
                                            item.id === props.selectedProjectId
                                                ? <FolderOpenIcon/>
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

const mapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.projects.isFetching,
        isAuth: state.auth.isAuth,
        projects: state.projects.projects,
        myId: state.auth.id,
        selectedProjectId: state.projects.selectedProjectId,
        initializationInProgress: state.app.initializationInProgress,
        isInitialized: state.app.isInitialized
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    getProjects: (userIds: Array<number>) => void
    setFetching: (isFetching: boolean) => void
    setProjects: (projects: Array<ProjectType>) => void
    setSelectedProjectId: (selectedProjectId: number) => void
    setSelectedUserId: (selectedUserId: number | null) => void
}
const mapDispatchToProps = {
    getProjects,
    setFetching,
    setProjects,
    setSelectedProjectId,
    setSelectedUserId,

}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)