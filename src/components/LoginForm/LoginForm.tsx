import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Typography} from "@material-ui/core"
import {AppStateType} from "../../redux/store"
import {appInitializing} from "../../redux/appReducer"
import {connect} from "react-redux"
import {showLoginForm} from "../../redux/authReducer"

const LoginForm: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    const handleClose = () => {
        props.showLoginForm(false)
    };

    const handleLogin = () => {

    }

    return (
        <div>
            <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='caption'>
                            test user data. email: 'testuser@email.com' password: 'testuser_pass'
                        </Typography>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        /*autoFocus*/
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogin} color="primary">
                        Войти
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {

    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    showLoginForm: (loginFormShown: boolean) => void
}
const mapDispatchToProps = {
    showLoginForm
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)