import './App.css'
import React, {useEffect} from 'react'
import {AppStateType} from "./redux/store"
import {connect} from "react-redux"
import {useSnackbar, VariantType} from "notistack"
import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles'
import AppBarMui from '@material-ui/core/AppBar'
import CssBaselineMui from '@material-ui/core/CssBaseline'
import DividerMui from '@material-ui/core/Divider'
import DrawerMui from '@material-ui/core/Drawer'
import HiddenMui from '@material-ui/core/Hidden'
import IconButtonMui from '@material-ui/core/IconButton'
import ToolbarMui from '@material-ui/core/Toolbar'
import CircularProgressMui from "@material-ui/core/CircularProgress"
import BackdropMui from "@material-ui/core/Backdrop"
import MenuIconMui from '@material-ui/icons/Menu'
import Menu from "./components/Menu/Menu"
import AppBarContent from "./components/AppBarContent/AppBarContent"
import FilterWrapper from "./components/FilterData/FilterWrapper"
import TasksList from "./components/TasksList/TasksList"
import LoginForm from "./components/LoginForm/LoginForm"
import {appInitializing} from "./redux/appReducer"

const drawerWidth = 240; //Ширина бокового меню
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
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const App: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false)

    // Запуск инициализации приложения
    useEffect(() => {
        props.appInitializing()
    }, [])

    // Добавление ошибки в Snackbar
    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
        let variant: VariantType = "error"
        props.errors.length > 0 && enqueueSnackbar(props.errors[props.errors.length - 1], {variant})
    }, [props.errors])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Боковая панель
    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <DividerMui/>

            {/*Содержимое боковой панели*/}
            <Menu/>
        </div>
    );

    return (
        <div className={classes.root}>

            {/*Затемнение с индикатором загрузки*/}
            <BackdropMui className={classes.backdrop} open={!props.isInitialized}>
                <CircularProgressMui color="inherit"/>
            </BackdropMui>

            {/*Форма логина*/}
            {props.loginFormShown && <LoginForm/>}

            <CssBaselineMui/>

            {/*Верхняя панель*/}
            <AppBarMui position="fixed" className={classes.appBar}>
                <ToolbarMui>
                    <IconButtonMui
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIconMui/>
                    </IconButtonMui>
                    <AppBarContent/>
                </ToolbarMui>
            </AppBarMui>

            {/*Обертка над боковой панелью для управления режимом отображения*/}
            <nav className={classes.drawer} aria-label="menu folders">
                <HiddenMui smUp implementation="css">
                    <DrawerMui
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{paper: classes.drawerPaper,}}
                        ModalProps={{keepMounted: true,}}
                    >
                        {drawer}
                    </DrawerMui>
                </HiddenMui>
                <HiddenMui xsDown implementation="css">
                    <DrawerMui
                        classes={{paper: classes.drawerPaper,}}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </DrawerMui>
                </HiddenMui>
            </nav>

            {/*Отображение основного контента*/}
            {
                props.isAuth && <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <FilterWrapper/>
                    <TasksList/>
                </main>
            }
        </div>
    )
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        isInitialized: state.app.isInitialized,
        isAuth: state.auth.isAuth,
        loginFormShown: state.auth.loginFormShown,
        errors: state.app.errors
    }
}

type MapDispatchPropsType = {
    appInitializing: () => void
}
const mapDispatchToProps = {
    appInitializing
}

export default connect(mapStateToProps, mapDispatchToProps)(App)