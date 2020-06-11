import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextFieldMui from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1, 0),
            },
        },
    }),
)

const ByContentFilter: React.FC<any> = () => {

    const classes = useStyles();

    return (
        <form style={{width: '100%'}} className={classes.root} noValidate autoComplete="off"
        >
            <TextFieldMui id="standard-basic" label="Искать по содержимому: " fullWidth/>
        </form>
    )
}

export default ByContentFilter