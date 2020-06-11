import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuItemMui from '@material-ui/core/MenuItem'
import FormControlMui from '@material-ui/core/FormControl'
import SelectMui from '@material-ui/core/Select'
import InputAdornmentMui from '@material-ui/core/InputAdornment'
import FilterListIconMui from '@material-ui/icons/FilterList'
import {Divider} from "@material-ui/core"

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

const CombinedFilter: React.FC<any> = () => {

    const classes = useStyles()
    const [age, setAge] = React.useState('')

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string)
    }

    return (
        <div>
            <FormControlMui className={classes.formControl}>
                <SelectMui
                    value={age}
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

export default CombinedFilter