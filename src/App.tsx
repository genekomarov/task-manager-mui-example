import './App.css';
import React from 'react';
import AppBarMui from '@material-ui/core/AppBar';
import CssBaselineMui from '@material-ui/core/CssBaseline';
import DividerMui from '@material-ui/core/Divider';
import DrawerMui from '@material-ui/core/Drawer';
import HiddenMui from '@material-ui/core/Hidden';
import IconButtonMui from '@material-ui/core/IconButton';
import MenuIconMui from '@material-ui/icons/Menu';
import ToolbarMui from '@material-ui/core/Toolbar';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Menu from "./components/Menu/Menu"
import AppBarContent from "./components/AppBarContent/AppBarContent"
import FilterWrapper from "./components/FilterData/FilterWrapper"
import TasksList from "./components/TasksList/TasksList"
import './App.css'
import * as Api from '../src/api/api'
import {getCounter} from "./utils/universalCounter"
import store from "./redux/store"
import {login, logout} from './redux/authReducer'
import {getProjects} from "./redux/projectsReducer"

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}
    // @ts-ignore
    window.api = Api
    // @ts-ignore
    window.counter = getCounter
    // @ts-ignore
    window.store = store
    // @ts-ignore
    window.login = login
    // @ts-ignore
    window.logout = logout
    // @ts-ignore
    window.getProjects = getProjects

export default function App(props: Props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <DividerMui />
            <Menu />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaselineMui />
            <AppBarMui position="fixed" className={classes.appBar}>
                <ToolbarMui>
                    <IconButtonMui
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIconMui />
                    </IconButtonMui>

                    <AppBarContent/>

                </ToolbarMui>
            </AppBarMui>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <HiddenMui smUp implementation="css">
                    <DrawerMui
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </DrawerMui>
                </HiddenMui>
                <HiddenMui xsDown implementation="css">
                    <DrawerMui
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </DrawerMui>
                </HiddenMui>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />

                <FilterWrapper/>
                <TasksList/>

            </main>
        </div>
    );
}
