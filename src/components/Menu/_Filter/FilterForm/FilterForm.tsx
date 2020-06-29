import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ContentSearch from "./ContentSearch/ContentSearch"
import ByAuthorSearch from "./ByAuthorSearch/ByAuthorSearch"
import ByStatusSearch from "./ByStatusSearch/ByStatusSearch"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: 'auto',
            },
        },
    }),
);

export default function FilterForm() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <ContentSearch/>
            <ByAuthorSearch/>
            <ByStatusSearch/>
        </form>
    );
}