import React, {useEffect} from 'react'
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
import {getTasks, setFetching} from "../../redux/tasksReducer"
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

    useEffect(() => {
        props.usersIsFetching && props.setFetching(true)
    }, [props.usersIsFetching])

    useEffect(() => {
        props.selectedUserId !== null && props.selectedProjectId !== null
            ? props.getTasks([props.selectedProjectId], [props.selectedUserId])
            : props.selectedProjectId !== null &&
            props.getTasks([props.selectedProjectId], [], {status: null, content: ''})
    }, [props.selectedUserId, props.selectedProjectId])

    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const userNickNameByUserId = (users: Array<UserType>, item: TaskType) => {
        let userNicknams = props.users.filter((u) => u.id === item.author)
        return userNicknams.length > 0 && userNicknams[0].nickname
    }

    return (
        <ContainerMui maxWidth={"sm"}>
            <ListMui className={classes.root}>
                {props.isFetching && props.isAuth
                    ? <CircularProgress className={classes.progress} size={50}/>
                    : props.isAuth && props.tasks.map((item) => {
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
        myId: state.auth.id
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    setFetching: (isFetching: boolean) => void,
    getTasks: (projectIds: Array<number> | null, userIds: Array<number> | null, filter?: TaskFilterType) => void
}
const mapDispatchToProps = {
    setFetching,
    getTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList)