import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AutocompleteMui from '@material-ui/lab/Autocomplete'
import TextFieldMui from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            '& > * + *': {
                marginTop: theme.spacing(3),
            },
        },
    }),
);

export default function Tags() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AutocompleteMui
                disableClearable
                multiple
                id="tags-outlined"
                options={users}
                getOptionLabel={(option) => option.nickname}
                defaultValue={[users[0]]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextFieldMui
                        {...params}
                        variant="standard"
                        label=""
                        placeholder="Авторы"
                    />
                )}
            />
        </div>
    );
}

const users = [
    {
        "id": 0,
        "nickname": "test-user"
    },
    {
        "id": 1,
        "nickname": "mom"
    },
    {
        "id": 2,
        "nickname": "dad"
    },
    {
        "id": 3,
        "nickname": "wife"
    },
    {
        "id": 4,
        "nickname": "son"
    },
    {
        "id": 5,
        "nickname": "daughter"
    },
    {
        "id": 6,
        "nickname": "colleague-1"
    },
    {
        "id": 7,
        "nickname": "colleague-2"
    },
    {
        "id": 8,
        "nickname": "boss"
    },
    {
        "id": 9,
        "nickname": "teacher"
    }
];
