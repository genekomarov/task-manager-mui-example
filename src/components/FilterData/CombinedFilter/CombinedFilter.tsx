import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuItemMui from '@material-ui/core/MenuItem'
import FormControlMui from '@material-ui/core/FormControl'
import SelectMui from '@material-ui/core/Select'
import InputAdornmentMui from '@material-ui/core/InputAdornment'
import FilterListIconMui from '@material-ui/icons/FilterList'
import {Divider} from "@material-ui/core"
import {AppStateType} from "../../../redux/store"
import {TaskFilterType, TaskSortType} from "../../../types/types"
import {setFilter, setSort} from "../../../redux/tasksReducer"
import {connect} from "react-redux"

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

const CombinedFilter: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    const classes = useStyles()

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        switch (event.target.value) {
            case 'CLOSE_FIRST':
                props.setSort({firstCompleted: true, firstNew: false})
                break
            case 'OPEN_FIRST':
                props.setSort({firstCompleted: false, firstNew: false})
                break
            case 'NEW_FIRST':
                props.setSort({firstCompleted: null, firstNew: true})
                break
            case 'OLD_FIRST':
                props.setSort({firstCompleted: null, firstNew: false})
                break
            default:
                props.setSort({firstCompleted: null, firstNew: null})
        }


    }

    return (
        <div>
            <FormControlMui className={classes.formControl}>
                <SelectMui
                    value={
                        props.sort.firstCompleted !== null
                            ? props.sort.firstCompleted === true
                                ? 'CLOSE_FIRST'
                                : 'OPEN_FIRST'
                            : props.sort.firstNew !== null
                                ? props.sort.firstNew === true
                                    ? 'NEW_FIRST'
                                    : 'OLD_FIRST'
                                : ''
                    }
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                    startAdornment={
                        <InputAdornmentMui position='start'>
                            <FilterListIconMui />
                        </InputAdornmentMui>
                    }
                >
                    <MenuItemMui value=''>
                        <em>Сортировка</em>
                    </MenuItemMui>
                    <Divider />
                    <MenuItemMui value='NEW_FIRST'>От новых к старым</MenuItemMui>
                    <MenuItemMui value='OLD_FIRST'>От старых к новым</MenuItemMui>
                    <Divider />
                    <MenuItemMui value='OPEN_FIRST'>Сначала незавершенные</MenuItemMui>
                    <MenuItemMui value='CLOSE_FIRST'>Сначала завершенные</MenuItemMui>
                </SelectMui>
            </FormControlMui>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        sort: state.tasks.sort
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    setSort: (filter: TaskSortType) => void
}
const mapDispatchToProps = {
    setSort
}

export default connect(mapStateToProps, mapDispatchToProps)(CombinedFilter)