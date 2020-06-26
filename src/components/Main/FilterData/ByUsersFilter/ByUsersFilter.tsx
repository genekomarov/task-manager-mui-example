import React, {ChangeEvent} from 'react'
import {connect} from 'react-redux'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import TextFieldMui from '@material-ui/core/TextField'
import AutocompleteMui from '@material-ui/lab/Autocomplete'
import {AppStateType} from '../../../../redux/store'
import {TaskFilterType, UserType} from '../../../../types/types'
import {setFilter} from '../../../../redux/tasksReducer'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(3),
            },
        },
    }),
)

const ByUsersFilter: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    const classes = useStyles()

    // Получение имен пользователей по их ID
    let filteredUsers = (() =>
        {
            if (props.filter.userIds) {
                return props.filter.userIds.map( userId => {
                    return props.users.filter( user => user.id === userId)[0]
                })
            } else return []
        }
    )()

    const handleUsersChanged = (event: ChangeEvent<{}>, users: UserType[]) => {
        let usersIds = users.map( user => user.id)
        props.setFilter({userIds: usersIds, status: undefined, content: undefined}, true)
    }

    return (
        <div className={classes.root}>
            <AutocompleteMui
                onChange={handleUsersChanged}
                disableClearable
                multiple
                id='tags-outlined'
                options={
                    props.users.filter(u => props.tasks.filter(t => t.author === u.id).length > 0)
                }
                getOptionLabel={(option) => option.nickname}
                value={filteredUsers}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextFieldMui
                        {...params}
                        variant='standard'
                        label=''
                        placeholder='Авторы'
                    />
                )}
            />
        </div>
    )
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.users.users,
        filter: state.tasks.filter,
        tasks: state.tasks.tasks
    }
}

type MapDispatchProps = {
    setFilter: (filter: TaskFilterType, rewrite?: boolean) => void
}
const mapDispatchToProps = {
    setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ByUsersFilter)