import React, {ChangeEvent} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextFieldMui from '@material-ui/core/TextField'
import {AppStateType} from "../../../redux/store"
import {ProjectType, TaskFilterType} from "../../../types/types"
import {getProjects, setFetching, setProjects, setSelectedProjectId} from "../../../redux/projectsReducer"
import {setSelectedUserId} from "../../../redux/usersReducer"
import {setFilter} from "../../../redux/tasksReducer"
import {connect} from "react-redux"

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

const mapStateToProps = (state: AppStateType) => {
    return {
        filter: state.tasks.filter
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    setFilter: (filter: TaskFilterType, rewrite?: boolean) => void
}
const mapDispatchToProps = {
    setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ByContentFilter)