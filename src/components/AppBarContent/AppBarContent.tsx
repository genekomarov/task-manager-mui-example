import React from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import IconButtonMui from '@material-ui/core/IconButton'
import TypographyMui from '@material-ui/core/Typography'
import MenuItemMui from '@material-ui/core/MenuItem'
import MenuMui from '@material-ui/core/Menu'
import AccountCircleIconMui from '@material-ui/icons/AccountCircle'
import MoreIconMui from '@material-ui/icons/MoreVert'
import {AppStateType} from "../../redux/store"
import {appInitializing} from "../../redux/appReducer"
import {connect} from "react-redux"
import {Helmet} from "react-helmet"
import Typography from "@material-ui/core/Typography"
import {logout, showLoginForm} from "../../redux/authReducer"
import {Button} from "@material-ui/core"

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
        typography__authorizedUserNickname: {
            marginRight: theme.spacing(2),
            alignSelf: 'center',
        },
    }),
)

const AppBarContent: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {


    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleExit = () => {
        handleMenuClose()
        props.logout()
    }

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleLogin = () => {
        props.showLoginForm(true)
    }

    const countOfShownTasks = props.isAuth ? props.countOfShownTasks : 0

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
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
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
            <TypographyMui className={classes.title} variant="h6" noWrap>
                {`Менеджер задач (${countOfShownTasks})`}
                <Helmet title={`(${countOfShownTasks}) Менеджер задач`}/>
            </TypographyMui>
            <div className={classes.grow}/>
            {
                !props.isAuth ? <div className={classes.sectionDesktop}>
                        <Button color="inherit" onClick={handleLogin}>Войти</Button>
                    </div>
                    : <div className={classes.sectionDesktop}>

                        <TypographyMui className={classes.typography__authorizedUserNickname}
                                       variant='body1'>{props.myNickname}</TypographyMui>
                        <IconButtonMui
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircleIconMui/>
                        </IconButtonMui>
                    </div>
            }
            <div className={classes.sectionMobile}>
                <IconButtonMui
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
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

const mapStateToProps = (state: AppStateType) => {
    return {
        countOfShownTasks: state.tasks.countOfShownTasks,
        myNickname: state.auth.nickname,
        isAuth: state.auth.isAuth
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    logout: () => void,
    showLoginForm: (loginFormShown: boolean) => void
}
const mapDispatchToProps = {
    logout,
    showLoginForm
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarContent)