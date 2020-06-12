const app_SET_INITIALIZED_true = {
    type: 'app/SET_INITIALIZED',
    isInitialized: true
}

const app_SET_INITIALIZED_false = {
    type: 'app/SET_INITIALIZED',
    isInitialized: false
}

const auth_SET_USER_DATA_isAuth_true = {
    type: 'auth/SET_USER_DATA',
    id: 0,
    email: 'testuser@email.com',
    nickname: 'testuser',
    isAuth: true
}

const auth_SET_USER_DATA_isAuth_false = {
    type: 'auth/SET_USER_DATA',
    id: null,
    email: null,
    nickname: null,
    isAuth: false
}

const projects_SET_FETCHING_true = {
    type: 'projects/SET_FETCHING',
    isFetching: true
}

const projects_SET_FETCHING_false = {
    type: 'projects/SET_FETCHING',
    isFetching: false
}