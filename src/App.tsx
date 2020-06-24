import './App.css'
import React, {useEffect} from 'react'
import {AppStateType} from "./redux/store"
import {connect} from "react-redux"
import {useSnackbar, VariantType} from "notistack"
import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles'
import CssBaselineMui from '@material-ui/core/CssBaseline'
import DividerMui from '@material-ui/core/Divider'
import DrawerMui from '@material-ui/core/Drawer'
import HiddenMui from '@material-ui/core/Hidden'
import Menu from "./components/Menu/Menu"
import LoginForm from "./components/LoginForm/LoginForm"
import {appInitializing} from "./redux/appReducer"
import BackdropPreloader from "./components/BackdropPreloader/BackdropPreloader"
import AppTopBar from "./components/AppTopBar/AppTopBar"
import Main from "./components/Main/Main"

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

        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
    }),
);

const App: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const classes = useStyles();
    const theme = useTheme();

    //Управление показом боковой панели в мобильном режиме
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const handleDrawerToggle = () => {setMobileOpen(!mobileOpen)}

    // Запуск инициализации приложения
    let {appInitializing} = props
    useEffect(() => {
        appInitializing()
    }, [appInitializing])

    // Добавление ошибки в Snackbar
    const {enqueueSnackbar} = useSnackbar()
    let {errors} = props
    useEffect(() => {
        let variant: VariantType = "error"
        errors.length > 0 && enqueueSnackbar(errors[errors.length - 1], {variant})
    }, [errors, enqueueSnackbar])

    // Содержимое боковой панели
    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <DividerMui/>
            <Menu/>
        </div>
    );

    return (
        <div className={classes.root}>

            {/*Затемнение и прелодер при инициализации*/}
            <BackdropPreloader open={!props.isInitialized}/>

            {/*Форма логина*/}
            {props.loginFormShown && <LoginForm/>}

            <CssBaselineMui/>

            {/*Верхняя панель*/}
            <AppTopBar/>

            {/*Обертка над боковой панелью для управления режимом отображения*/}
            <nav className={classes.drawer}>
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

            {/*Основное содержимое*/}
            {props.isAuth && <Main/>}
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