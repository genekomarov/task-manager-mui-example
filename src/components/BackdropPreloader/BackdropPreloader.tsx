import React from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import CircularProgressMui from '@material-ui/core/CircularProgress'
import BackdropMui from '@material-ui/core/Backdrop'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
)

const BackdropPreloader: React.FC<OwnPropsType> = (props) => {

    const classes = useStyles()

    return (
            <BackdropMui className={classes.backdrop} open={props.open}>
                <CircularProgressMui color='inherit'/>
            </BackdropMui>
    )
}

type OwnPropsType = {
    open: boolean
}

export default BackdropPreloader