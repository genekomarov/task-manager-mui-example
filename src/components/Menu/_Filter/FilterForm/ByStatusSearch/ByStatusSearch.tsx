import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function ByStatusSearch() {
    const [value, setValue] = React.useState('any');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Статус</FormLabel>
            <RadioGroup aria-label="status" name="status" value={value} onChange={handleChange}>
                <FormControlLabel value="active" control={<Radio />} label="Активно" />
                <FormControlLabel value="done" control={<Radio/>} label="Завершено" />
                <FormControlLabel value="any" control={<Radio/>} label="Любой" />
            </RadioGroup>
        </FormControl>
    );
}
