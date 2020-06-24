import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {Form, Formik} from "formik"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"
import ListItemMui from '@material-ui/core/ListItem'
import ListItemIconMui from '@material-ui/core/ListItemIcon'
import ListItemSecondaryActionMui from '@material-ui/core/ListItemSecondaryAction'
import ListItemTextMui from '@material-ui/core/ListItemText'
import CheckboxMui from '@material-ui/core/Checkbox'
import IconButtonMui from '@material-ui/core/IconButton'
import InputBaseMui from "@material-ui/core/InputBase"
import DeleteOutlineIconMui from '@material-ui/icons/DeleteOutline'
import {TaskType, UserType} from "../../../../types/types"
import {AppStateType} from "../../../../redux/store"
import {changeTask, deleteTask} from "../../../../redux/tasksReducer"
import {getDateString} from "../../../../utils/dateHelper"
import {hendleKeyDownOnTextarea} from "../../../../utils/wrapStringForTextarea"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        checkbox_cursor_default: {
            cursor: 'default',
        },
    }),
)

const Task: React.FC<MapStatePropsType & MapDispatchPropsType & OwnType> = (props) => {

    const classes = useStyles();

    const task: TaskType = props.task

    useEffect(() => {
        console.log(task.title)
    },[task])

    const userById = (users: Array<UserType>, authorId: number): UserType => {
        let filteredUsers = users.filter(u => u.id === authorId)
        return filteredUsers[0]
    }

    const handleChangeStatus = () => {
        task.author === props.myId && props.changeTask({...task, isDone: !task.isDone, title: task.title})
    }

    const handleChangeTitle = (title: string) => {
        task.author === props.myId && props.changeTask({...task, isDone: task.isDone, title})
    }

    const handleDelete = () => {
        props.deleteTask(task.id)
    }

    // Содержание задачи. Если автор авторизованный пользователь, выводим редактируемое поле
    const taskTitle = task.author === props.myId
            ? <Formik
                    enableReinitialize={true}
                    initialTouched={{title: false}}
                    initialValues={{
                        title: task.title,
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            if (values.title === '') values.title = task.title
                            else {
                                handleChangeTitle(values.title)
                            }
                            setSubmitting(false)
                        }, 0)
                    }}
                >
                    {({values, handleChange, handleSubmit}) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <InputBaseMui
                                    name="title"
                                    type="title"
                                    id="title"
                                    fullWidth
                                    multiline
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={() => {
                                        handleSubmit()
                                    }}
                                    onKeyDown={
                                        hendleKeyDownOnTextarea(
                                            handleSubmit, handleChange, navigator.userAgent
                                        )
                                    }
                                />
                            </Form>
                        )
                    }}
                </Formik>
            : task.title

    // Второстепенный текст под задачей
    const taskSecondaryText = `${
                getDateString(new Date(task.date))} - ${
                userById(props.users, task.author) && userById(props.users, task.author).nickname}`

    return (
        <ListItemMui role={undefined}>
            <ListItemIconMui onChange={handleChangeStatus}>
                <CheckboxMui
                    className={task.author !== props.myId ? classes.checkbox_cursor_default : ''}
                    color='secondary'
                    edge="start"
                    checked={task.isDone}
                    tabIndex={-1}
                    disableRipple
                    disabled={task.author !== props.myId}
                />
            </ListItemIconMui>
            <ListItemTextMui
                primary={taskTitle}
                secondary={taskSecondaryText}
            />
            {task.author === props.myId && (
                <ListItemSecondaryActionMui>
                    <IconButtonMui
                        onClick={handleDelete}
                        edge="end">
                        <DeleteOutlineIconMui/>
                    </IconButtonMui>
                </ListItemSecondaryActionMui>
            )}
        </ListItemMui>
    );
}

type OwnType = {
    task: TaskType
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.users.users,
        myId: state.auth.id,
    }
}

type MapDispatchPropsType = {
    deleteTask: (taskId: number) => void
    changeTask: (task: TaskType) => void
}
const mapDispatchToProps = {
    deleteTask,
    changeTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)