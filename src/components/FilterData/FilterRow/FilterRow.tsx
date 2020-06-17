import React from "react"
import ListItemMui from "@material-ui/core/ListItem/ListItem"
import ListItemSecondaryActionMui from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction"
import IconButtonMui from "@material-ui/core/IconButton/IconButton"
import BackspaceIconMui from '@material-ui/icons/Backspace'
import {AppStateType} from "../../../redux/store"
import {appInitializing} from "../../../redux/appReducer"
import {connect} from "react-redux"
import {TaskFilterType, TaskSortType} from "../../../types/types"
import {setFilter, setSort} from "../../../redux/tasksReducer"

type OwnProps = {
    children: React.ReactElement | React.ReactElement[]
    rowNumber: number
}

const FilterRow: React.FC<OwnProps & MapDispatchProps> = (props) => {

    const handleClearFiltersInRow = () => {
        switch (props.rowNumber) {
            case 1:
                props.setSort({firstCompleted: null, firstNew: null})
                props.setFilter({userIds: undefined, status: null, content: undefined})
                break
            case 2:
                props.setFilter({userIds: null, status: undefined, content: undefined})
                break
            case 3:
                props.setFilter({userIds: undefined, status: undefined, content: null})
                break
            default: break

        }
    }

    return (
        <ListItemMui >
            {props.children}
            <ListItemSecondaryActionMui>
                <IconButtonMui onClick={handleClearFiltersInRow} edge="end" aria-label="delete">
                    <BackspaceIconMui/>
                </IconButtonMui>
            </ListItemSecondaryActionMui>
        </ListItemMui>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {

    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    setFilter: (filter: TaskFilterType) => void
    setSort: (sort: TaskSortType) => void
}
const mapDispatchToProps = {
    setFilter,
    setSort
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterRow)