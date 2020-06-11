import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ListMui from '@material-ui/core/List'
import ListItemMui from '@material-ui/core/ListItem'
import ListItemIconMui from '@material-ui/core/ListItemIcon'
import ListItemSecondaryActionMui from '@material-ui/core/ListItemSecondaryAction'
import ListItemTextMui from '@material-ui/core/ListItemText'
import CheckboxMui from '@material-ui/core/Checkbox'
import IconButtonMui from '@material-ui/core/IconButton'
import ContainerMui from "@material-ui/core/Container"
import DeleteOutlineIconMui from '@material-ui/icons/DeleteOutline'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 600,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const TasksList: React.FC<any> = () => {

    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <ContainerMui maxWidth={"sm"}>
            <ListMui className={classes.root}>
                {tasks.map((item) => {
                    const labelId = `checkbox-list-label-${item.id}`;
                    return (
                        <ListItemMui key={item.id} role={undefined} button onClick={handleToggle(item.id)}>
                            <ListItemIconMui>
                                <CheckboxMui
                                    edge="start"
                                    checked={item.isDone}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIconMui>
                            <ListItemTextMui id={labelId}
                                             primary={item.title}
                                             secondary={users[item.author].nickname}
                            />
                            <ListItemSecondaryActionMui>
                                <IconButtonMui edge="end" aria-label="comments">
                                    <DeleteOutlineIconMui />
                                </IconButtonMui>
                            </ListItemSecondaryActionMui>
                        </ListItemMui>
                    );
                })}
            </ListMui>
        </ContainerMui>
    );
}

const tasks = [
    {
        "id": 0,
        "project": 0,
        "author": 3,
        "date": "January 05, 2018 08:50:10",
        "title": "Заехать в магазин",
        "isDone": true
    },
    {
        "id": 1,
        "project": 0,
        "author": 0,
        "date": "January 10, 2018 09:00:20",
        "title": "Отвезти детей в школу",
        "isDone": true
    },
    {
        "id": 2,
        "project": 1,
        "author": 0,
        "date": "February 15, 2018 10:10:30",
        "title": "Сдать работу к концу недели",
        "isDone": false
    },
    {
        "id": 3,
        "project": 1,
        "author": 0,
        "date": "February 20, 2019 11:20:40",
        "title": "Предупредить коллег о предстоящем отпуске",
        "isDone": true
    },
    {
        "id": 4,
        "project": 1,
        "author": 0,
        "date": "March 25, 2019 12:30:50",
        "title": "Купить тортик",
        "isDone": false
    },
    {
        "id": 5,
        "project": 2,
        "author": 4,
        "date": "March 30, 2019 13:40:00",
        "title": "Сделать уроки",
        "isDone": false
    },
    {
        "id": 6,
        "project": 2,
        "author": 5,
        "date": "April 1, 2020 14:50:10",
        "title": "Подготовиться к экзамену",
        "isDone": true
    },
    {
        "id": 7,
        "project": 3,
        "author": 3,
        "date": "April 6, 2020 15:00:20",
        "title": "Купить солнцезащитный крем",
        "isDone": false
    },
    {
        "id": 8,
        "project": 3,
        "author": 0,
        "date": "May 11, 2020 16:10:30",
        "title": "Собрать чемоданы",
        "isDone": true
    },
    {
        "id": 9,
        "project": 3,
        "author": 0,
        "date": "May 16, 2020 17:20:40",
        "title": "Завезти собаку к родителям",
        "isDone": false
    }
]

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
]

export default TasksList