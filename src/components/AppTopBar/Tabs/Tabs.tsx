import React from 'react'
import {NavLink} from "react-router-dom"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

const TabsPanel: React.FC = () => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Tabs value={value} onChange={handleChange}>
            <Tab label={'Все пользователи'} href={'/'} to={'/'} component={NavLink}/>
            <Tab label={'Только мои задачи'} href={'/my-tasks'} to={'/my-tasks'} component={NavLink}/>
        </Tabs>
    )
}

export default TabsPanel