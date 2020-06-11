import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuItemMui from '@material-ui/core/MenuItem'
import FormControlMui from '@material-ui/core/FormControl'
import SelectMui from '@material-ui/core/Select'
import InputAdornmentMui from '@material-ui/core/InputAdornment'
import SortIconMui from '@material-ui/icons/Sort'

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

const ByStatusSort: React.FC<any> = () => {

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

export default ByStatusSort