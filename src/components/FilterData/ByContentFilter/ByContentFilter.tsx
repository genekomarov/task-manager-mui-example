import React, {ChangeEvent} from 'react'
import {connect} from "react-redux"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import TextFieldMui from '@material-ui/core/TextField'
import {AppStateType} from "../../../redux/store"
import {TaskFilterType} from "../../../types/types"
import {setFilter} from "../../../redux/tasksReducer"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1, 0),
            },
        },
    }),
)

const ByContentFilter: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    const classes = useStyles();

    const handleContentChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setFilter({userIds: undefined, status: undefined, content: e.currentTarget.value})
    }

    return (
        <form style={{width: '100%'}} className={classes.root} noValidate autoComplete="off"
        >
            <TextFieldMui
                value={props.filter.content}
                onChange={handleContentChange}
                id="standard-basic"
                label="Искать по содержимому: "
                fullWidth
            />
        </form>
    )
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        filter: state.tasks.filter
    }
}

type MapDispatchProps = {
    setFilter: (filter: TaskFilterType, rewrite?: boolean) => void
}
const mapDispatchToProps = {
    setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ByContentFilter)