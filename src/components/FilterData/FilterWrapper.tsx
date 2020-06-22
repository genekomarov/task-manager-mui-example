import React from 'react'
import ListMui from '@material-ui/core/List'
import ListItemMui from '@material-ui/core/ListItem'
import ListItemIconMui from '@material-ui/core/ListItemIcon'
import ListItemTextMui from '@material-ui/core/ListItemText'
import CollapseMui from '@material-ui/core/Collapse'
import ExpandLessMui from '@material-ui/icons/ExpandLess'
import ExpandMoreMui from '@material-ui/icons/ExpandMore'
import SearchIconMui from '@material-ui/icons/Search'
import FilterRow from "./FilterRow/FilterRow"
import CombinedSort from "./CombinedSort/CombinedSort"
import ByStatusFilter from "./ByStatusFilter/ByStatusFilter"
import ByUsersFilter from "./ByUsersFilter/ByUsersFilter"
import ByContentFilter from "./ByContentFilter/ByContentFilter"

const FilterWrapper: React.FC<any> = () => {

    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <ListItemMui button onClick={handleClick}>
                <ListItemIconMui>
                    <SearchIconMui/>
                </ListItemIconMui>
                <ListItemTextMui
                    primary="Поиск задач"
                    primaryTypographyProps={{variant: "body1"}}/>
                {open ? <ExpandLessMui/> : <ExpandMoreMui/>}
            </ListItemMui>
            <CollapseMui in={open} timeout="auto" unmountOnExit>
                <ListMui component="div" disablePadding>
                    <ListMui disablePadding>
                        <FilterRow rowNumber={1}>
                            <CombinedSort/>
                            <ByStatusFilter/>
                        </FilterRow>
                        <FilterRow rowNumber={2}>
                            <ByUsersFilter/>
                        </FilterRow>
                        <FilterRow rowNumber={3}>
                            <ByContentFilter/>
                        </FilterRow>
                    </ListMui>
                </ListMui>
            </CollapseMui>
        </>
    )
}

export default FilterWrapper