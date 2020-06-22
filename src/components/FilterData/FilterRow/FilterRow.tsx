import React from "react"
import {connect} from "react-redux"
import ListItemMui from "@material-ui/core/ListItem/ListItem"
import ListItemSecondaryActionMui from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction"
import IconButtonMui from "@material-ui/core/IconButton/IconButton"
import BackspaceIconMui from '@material-ui/icons/Backspace'
import {TaskFilterType, TaskSortType} from "../../../types/types"
import {setFilter, setSort} from "../../../redux/tasksReducer"

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

type OwnProps = {
    children: React.ReactElement | React.ReactElement[]
    rowNumber: number
}
type MapDispatchProps = {
    setFilter: (filter: TaskFilterType) => void
    setSort: (sort: TaskSortType) => void
}
const mapDispatchToProps = {
    setFilter,
    setSort
}

export default connect(null, mapDispatchToProps)(FilterRow)