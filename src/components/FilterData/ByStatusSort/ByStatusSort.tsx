import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuItemMui from '@material-ui/core/MenuItem'
import FormControlMui from '@material-ui/core/FormControl'
import SelectMui from '@material-ui/core/Select'
import InputAdornmentMui from '@material-ui/core/InputAdornment'
import SortIconMui from '@material-ui/icons/Sort'
import {AppStateType} from "../../../redux/store"
import {getTasks, setCountOfShownTasks, setFetching, setFilter} from "../../../redux/tasksReducer"
import {connect} from "react-redux"
import {TaskFilterType} from "../../../types/types"

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

const ByStatusSort: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    const classes = useStyles()

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let value = event.target.value
        props.setFilter({
            userIds: undefined,
            status: value === 'OPEN' ? false
                : value === 'CLOSE' ? true
                    : null,
            content: undefined})
    }

    return (
        <div>
            <FormControlMui className={classes.formControl}>
                <SelectMui
                    value={
                        props.filter.status === true ? 'CLOSE'
                            :  props.filter.status === false ? 'OPEN'
                                : ''
                    }
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                    startAdornment={
                        <InputAdornmentMui position="start">
                            <SortIconMui />
                        </InputAdornmentMui>
                    }
                >
                    <MenuItemMui value="">
                        <em>По статусу</em>
                    </MenuItemMui>
                    <MenuItemMui value='OPEN'>Незавершенные</MenuItemMui>
                    <MenuItemMui value='CLOSE'>Завершенные</MenuItemMui>
                </SelectMui>
            </FormControlMui>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        filter: state.tasks.filter
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    setFilter: (filter: TaskFilterType) => void
}
const mapDispatchToProps = {
    setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ByStatusSort)