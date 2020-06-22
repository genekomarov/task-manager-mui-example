import React, {useEffect} from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import {connect} from "react-redux"
import IconButtonMui from '@material-ui/core/IconButton'
import TypographyMui from '@material-ui/core/Typography'
import MenuItemMui from '@material-ui/core/MenuItem'
import MenuMui from '@material-ui/core/Menu'
import ButtonMui from "@material-ui/core/Button"
import AccountCircleIconMui from '@material-ui/icons/AccountCircle'
import MoreIconMui from '@material-ui/icons/MoreVert'
import {AppStateType} from "../../redux/store"
import {logout, showLoginForm} from "../../redux/authReducer"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        authorizedUserNickname__typography: {
            marginRight: theme.spacing(2),
            alignSelf: 'center',
        },
    }),
)

const AppBarContent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const countOfShownTasks = props.isAuth ? props.countOfShownTasks : 0

    useEffect(()=>{
        document.title = `(${countOfShownTasks}) Менеджер задач`
    },[countOfShownTasks])

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleLogin = () => {
        props.showLoginForm(true)
    }

    const handleExit = () => {
        handleMenuClose()
        props.logout()
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <MenuMui
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItemMui onClick={handleExit}>Выйти</MenuItemMui>
        </MenuMui>
    )

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <MenuMui
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {
                !props.isAuth ? <MenuItemMui onClick={handleLogin}>Войти</MenuItemMui>
                    : <MenuItemMui onClick={handleProfileMenuOpen}>
                        <IconButtonMui
                            color="inherit"
                        >
                            <AccountCircleIconMui/>
                        </IconButtonMui>
                        <p>{props.myNickname}</p>
                    </MenuItemMui>
            }
        </MenuMui>
    )

    return (
        <>

            {/*Заголовок приложениия*/}
            <TypographyMui className={classes.title} variant="h6" noWrap>
                {`Менеджер задач (${countOfShownTasks})`}

                {/*Установка текста заголовка в название вкладки браузера*/}
                {}
            </TypographyMui>

            <div className={classes.grow}/>

            {/*Десктопный вариант отображения кнопки открытия меню*/}
            {
                !props.isAuth
                    ?
                    <div className={classes.sectionDesktop}>
                        <ButtonMui color="inherit" onClick={handleLogin}>Войти</ButtonMui>
                    </div>
                    :
                    <div className={classes.sectionDesktop}>
                        <TypographyMui className={classes.authorizedUserNickname__typography}
                                       variant='body1'>{props.myNickname}</TypographyMui>
                        <IconButtonMui
                            edge="end"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircleIconMui/>
                        </IconButtonMui>
                    </div>
            }

            {/*Мобильный вариант отображения кнопки открытия меню*/}
            <div className={classes.sectionMobile}>
                <IconButtonMui
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIconMui/>
                </IconButtonMui>
            </div>
            {renderMobileMenu}
            {renderMenu}
        </>
    )
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        countOfShownTasks: state.tasks.countOfShownTasks,
        myNickname: state.auth.nickname,
        isAuth: state.auth.isAuth
    }
}

type MapDispatchPropsType = {
    logout: () => void,
    showLoginForm: (loginFormShown: boolean) => void
}
const mapDispatchToProps = {
    logout,
    showLoginForm
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarContent)