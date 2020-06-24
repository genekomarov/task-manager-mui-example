import React from 'react'
import {NavLink} from "react-router-dom"
import Tab from "@material-ui/core/Tab"
import {selectMyTasks} from "../../../redux/tasksReducer"
import {AppStateType} from "../../../redux/store"
import {connect} from "react-redux"
import {setSelectedProjectId} from "../../../redux/projectsReducer"
import {ROUTE} from "../../../redux/appReducer"

const TabsPanel: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    return (
        <div>
                <Tab selected={props.route === ROUTE.ROOT}
                    onClick={() => props.setSelectedProjectId(props.projects[0].id)}
                    label={'Задачи по проектам'} href={'/'} to={'/'} component={NavLink}/>
                <Tab selected={props.route === ROUTE.MY_TASKS}
                    onClick={() => props.selectMyTasks()} label={'Мои задачи (Все)'} href={'/my-tasks'} to={'/my-tasks'}
                     component={NavLink}/>
        </div>
    )
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        projects: state.projects.projects,
        route: state.app.route
    }
}

type MapDispatchPropsType = {
    selectMyTasks: () => void,
    setSelectedProjectId: (selectedProjectId: number | null) => void
}
const mapDispatchToProps = {
    selectMyTasks,
    setSelectedProjectId
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsPanel)