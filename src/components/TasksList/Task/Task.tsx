import React from 'react'
import ListItemMui from '@material-ui/core/ListItem'
import ListItemIconMui from '@material-ui/core/ListItemIcon'
import ListItemSecondaryActionMui from '@material-ui/core/ListItemSecondaryAction'
import ListItemTextMui from '@material-ui/core/ListItemText'
import CheckboxMui from '@material-ui/core/Checkbox'
import IconButtonMui from '@material-ui/core/IconButton'
import DeleteOutlineIconMui from '@material-ui/icons/DeleteOutline'
import {connect} from "react-redux"
import {TaskType, UserType} from "../../../types/types"
import {AppStateType} from "../../../redux/store"
import {changeTask, deleteTask} from "../../../redux/tasksReducer"
import {Form, Formik} from "formik"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles"
import InputBase from "@material-ui/core/InputBase"
import {keyDownOnTextarea} from "../../../utils/breakLineForTextarea"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        checkbox_cursor_default: {
            cursor: 'default',
        },
    }),
)

type OwnType = {
    task: TaskType
}

const Task: React.FC<MapStatePropsType & MapDispatchProps & OwnType> = (props) => {

    const classes = useStyles();

    console.log('task render')

    const userById = (users: Array<UserType>, authorId: number): UserType => {
        let filteredUsers = users.filter(u => u.id === authorId)
        return filteredUsers[0]
    }

    /*const taskById = (tasks: Array<TaskType>, taskId: number): TaskType => {
        let filteredTasks = tasks.filter(t => t.id === taskId)
        return filteredTasks[0]
    }*/

    const task: TaskType = props.task

    const labelId = `checkbox-list-label-${task.id}`;
    const date = new Date(task.date)
    const dateStr = `${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }.${
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }.${
        date.getFullYear()
    } ${
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    }:${
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    }`

    const handleChangeStatus = () => {
        task.author === props.myId && props.changeTask({...task, isDone: !task.isDone, title: task.title})
    }

    const handleChangeTitle = (title: string) => {
        task.author === props.myId && props.changeTask({...task, isDone: task.isDone, title})
    }

    const handleDelete = () => {
        props.deleteTask(task.id)
    }

    return (
        <ListItemMui role={undefined}>
            <ListItemIconMui
                onChange={handleChangeStatus}
            >
                <CheckboxMui
                    className={task.author !== props.myId ? classes.checkbox_cursor_default : ''}
                    edge="start"
                    checked={task.isDone}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{'aria-labelledby': labelId}}
                    color={task.author === props.myId ? 'secondary' : 'primary'}
                />
            </ListItemIconMui>
            <ListItemTextMui id={labelId}
                             primary={
                                 task.author === props.myId
                                     ? (
                                         <Formik
                                             initialValues={{
                                                 title: task.title,
                                             }}
                                             onSubmit={(values, {setSubmitting}) => {
                                                 setTimeout(() => {
                                                     handleChangeTitle(values.title)
                                                     setSubmitting(false)
                                                 }, 0)
                                             }}
                                         >
                                             {({
                                                   values,
                                                   handleChange,
                                                   handleSubmit,
                                               }) => {
                                                 return (
                                                     <Form onSubmit={handleSubmit}>
                                                         <InputBase
                                                             name="title"
                                                             type="title"
                                                             id="title"
                                                             fullWidth
                                                             multiline
                                                             value={values.title}
                                                             onChange={handleChange}
                                                             onBlur={()=>{handleSubmit()}}
                                                             onKeyDown={keyDownOnTextarea(handleSubmit, handleChange, navigator.userAgent)}
                                                         />
                                                     </Form>
                                                 )
                                             }}
                                         </Formik>
                                     )
                                     : task.title
                             }
                             secondary={`${dateStr} - ${userById(props.users, task.author) && userById(props.users, task.author).nickname}`}
            />
            {task.author === props.myId && (
                <ListItemSecondaryActionMui>
                    <IconButtonMui
                        onClick={handleDelete}
                        edge="end" aria-label="comments">
                        <DeleteOutlineIconMui/>
                    </IconButtonMui>
                </ListItemSecondaryActionMui>
            )}
        </ListItemMui>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.users.users,
        myId: state.auth.id,
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    deleteTask: (taskId: number) => void
    changeTask: (task: TaskType) => void
}
const mapDispatchToProps = {
    deleteTask,
    changeTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)