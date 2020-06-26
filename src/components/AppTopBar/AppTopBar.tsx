import React from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import AppBarMui from '@material-ui/core/AppBar'
import IconButtonMui from '@material-ui/core/IconButton'
import ToolbarMui from '@material-ui/core/Toolbar'
import MenuIconMui from '@material-ui/icons/Menu'
import AppBarContent from "./AppBarContent/AppBarContent"
import TabsPanel from './Tabs/Tabs'
import HideOnScroll from '../common/HideOnScroll/HideOnScroll'
import {AppStateType} from "../../redux/store"
import {connect} from "react-redux"

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
)

const AppTopBar: React.FC<MapStatePropsType> = (props) => {

    const classes = useStyles()
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    return (
        <HideOnScroll>
            <AppBarMui position='fixed' className={classes.appBar}>
                <ToolbarMui>
                    <IconButtonMui
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIconMui/>
                    </IconButtonMui>

                    {/*Основное содержимое верхней панели*/}
                    <AppBarContent/>
                </ToolbarMui>

                {/*Вкладки*/}
                {props.isAuth && <TabsPanel/>}
            </AppBarMui>
        </HideOnScroll>
    )
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(AppTopBar)