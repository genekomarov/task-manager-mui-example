import React from 'react'
import {connect} from "react-redux"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuItemMui from '@material-ui/core/MenuItem'
import FormControlMui from '@material-ui/core/FormControl'
import SelectMui from '@material-ui/core/Select'
import InputAdornmentMui from '@material-ui/core/InputAdornment'
import SortIconMui from '@material-ui/icons/Sort'
import {AppStateType} from "../../../redux/store"
import {TaskFilterType} from "../../../types/types"
import {setFilter} from "../../../redux/tasksReducer"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
)

const ByStatusFilter: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const classes = useStyles()

    const OPEN = 'OPEN'
    const CLOSE = 'CLOSE'

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let value = event.target.value
        props.setFilter({
            userIds: undefined,
            status: value === OPEN ? false
                : value === CLOSE ? true
                    : null,
            content: undefined})
    }

    return (
        <div>
            <FormControlMui className={classes.formControl}>
                <SelectMui
                    value={
                        props.filter.status === true ? CLOSE
                            :  props.filter.status === false ? OPEN
                                : ''
                    }
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    startAdornment={
                        <InputAdornmentMui position="start">
                            <SortIconMui />
                        </InputAdornmentMui>
                    }
                >
                    <MenuItemMui value="">
                        <em>По статусу</em>
                    </MenuItemMui>
                    <MenuItemMui value={OPEN}>Незавершенные</MenuItemMui>
                    <MenuItemMui value={CLOSE}>Завершенные</MenuItemMui>
                </SelectMui>
            </FormControlMui>
        </div>
    )
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        filter: state.tasks.filter
    }
}

type MapDispatchPropsType = {
    setFilter: (filter: TaskFilterType) => void
}
const mapDispatchToProps = {
    setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ByStatusFilter)