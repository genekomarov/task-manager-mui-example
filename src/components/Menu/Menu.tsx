import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ListSubheaderMui from '@material-ui/core/ListSubheader'
import ListMui from '@material-ui/core/List'
import DividerMui from "@material-ui/core/Divider/Divider"
import Projects from "./Projects/Projects"
import Team from "./Users/Users"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        /** Для отступа между блоками в меню*/
        verticalSpacing: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(2, 1),
            justifyContent: 'flex-end',
        },
    }),
)

const Menu: React.FC<any> = () => {    

    const classes = useStyles()

    return (
        <ListMui
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheaderMui component="div" id="nested-list-subheader">
                    Меню
                </ListSubheaderMui>
            }
            className={classes.root}
        >
            <DividerMui />
            <Projects/>

            <div className={classes.verticalSpacing} />
            <Team/>

            <DividerMui />
        </ListMui>
    )
}

export default Menu