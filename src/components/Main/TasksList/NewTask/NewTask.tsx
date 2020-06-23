import React from 'react'
import {connect} from "react-redux"
import {Form, Formik} from "formik"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import ListItemMui from '@material-ui/core/ListItem'
import ListItemSecondaryActionMui from '@material-ui/core/ListItemSecondaryAction'
import ListItemTextMui from '@material-ui/core/ListItemText'
import IconButtonMui from '@material-ui/core/IconButton'
import FormControl from "@material-ui/core/FormControl"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {AppStateType} from "../../../../redux/store"
import {newTask} from "../../../../redux/tasksReducer"
import {TaskType} from "../../../../types/types"
import {hendleKeyDownOnTextarea} from "../../../../utils/wrapStringForTextarea"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textFieldWrapper_marginRight_20px: {
            marginRight: '20px',
        },
    }),
)

const NewTask: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    const classes = useStyles();

    const handleNewTask = (id: number, project: number, author: number, date: number, title: string, isDone: boolean) => {
        props.newTask({id, project, author, date, title, isDone})
    }

    return (
        <Formik
            initialValues={{title: ''}}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    props.selectedProjectId !== null && props.myId !== null && handleNewTask(
                        props.idCounter, props.selectedProjectId, props.myId, Date.now(), values.title, false
                    )
                    values.title=''
                    setSubmitting(false)
                }, 0)
            }}
        >
            {({values, handleChange, handleSubmit}) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <ListItemMui role={undefined}>
                            <ListItemTextMui primary={
                                <div className={classes.textFieldWrapper_marginRight_20px}>
                                    <FormControl variant="outlined" fullWidth>
                                        <OutlinedInput
                                            name="title"
                                            type="title"
                                            multiline
                                            placeholder='Новая задача...'
                                            value={values.title}
                                            onChange={handleChange}
                                            onKeyDown={
                                                hendleKeyDownOnTextarea(
                                                    handleSubmit, handleChange, navigator.userAgent
                                                )}
                                        />
                                    </FormControl>
                                </div>
                            }
                            />
                            <ListItemSecondaryActionMui>
                                <IconButtonMui
                                    onClick={() => {handleSubmit()}}
                                    edge="end"
                                >
                                    <AddCircleIcon fontSize='large'/>
                                </IconButtonMui>
                            </ListItemSecondaryActionMui>
                        </ListItemMui>
                    </Form>
                )
            }}
        </Formik>
    )
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        idCounter: state.tasks.idCounter,
        selectedProjectId: state.projects.selectedProjectId,
        myId: state.auth.id
    }
}

type MapDispatchProps = {
    newTask: (task: TaskType) => void
}
const mapDispatchToProps = {
    newTask
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask)