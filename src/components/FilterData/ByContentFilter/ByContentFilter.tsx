import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1, 0),
            },
        },
    }),
);

export default function ByContentFilter() {
    const classes = useStyles();

    return (
        <form style={{width: '100%'}} className={classes.root} noValidate autoComplete="off"
        >
            <TextField id="standard-basic" label="Искать по содержимому: " fullWidth/>
        </form>
    );
}
