import React from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import TasksList from './TasksList/TasksList'
import FilterWrapper from './FilterData/FilterWrapper'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,

        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
)

const Main: React.FC = () => {

    const classes = useStyles()

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <div className={classes.toolbar}/>
            <FilterWrapper/>
            <TasksList/>
        </main>
    )
}

export default Main