import React from 'react';
import {AppStateType} from "../../redux/store"
import {connect} from "react-redux"
import {login, setLoginErrorMessage, showLoginForm} from "../../redux/authReducer"
import Dialog from '@material-ui/core/Dialog';
import {Formik, Form, Field} from 'formik';
import {Button, LinearProgress} from '@material-ui/core';
import {TextField} from 'formik-material-ui';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {Typography} from "@material-ui/core"
import DialogActions from '@material-ui/core/DialogActions';
import {isEmail} from "../../validators/validators"
import FormHelperText from "@material-ui/core/FormHelperText"

type Values = {
    email: string;
    password: string;
}

const LoginForm: React.FC<MapStatePropsType & MapDispatchProps> = (props) => {

    const handleClose = () => {
        props.showLoginForm(false)
    };

    return (
        <div>
            <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validate={values => {
                        const errors: Partial<Values> = {}

                        if (!values.email) errors.email = 'Обязательно для заполнения'
                        else if (!isEmail(values.email)) errors.email = 'Неправильный формат адреса'

                        if (!values.password) errors.password = 'Обязательно для заполнения'

                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(async () => {
                            props.setLoginErrorMessage(null)
                            await props.login(values.email, values.password)
                            setSubmitting(false);
                        }, 0);
                    }}
                >
                    {({submitForm, isSubmitting}) => (
                        <Form>
                            <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <Typography variant='caption'>
                                        test user data. email: 'testuser@email.com' password: 'testuser_pass'
                                    </Typography>
                                </DialogContentText>
                                <Field
                                    component={TextField}
                                    name="email"
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                />
                                <br/>
                                <Field
                                    component={TextField}
                                    name="password"
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                />
                                <br/>
                            </DialogContent>
                            {
                                props.loginErrorMessage && <DialogContent>
                                    <FormHelperText id="my-helper-text" error={true}>
                                        {props.loginErrorMessage}
                                    </FormHelperText>
                                </DialogContent>
                            }
                            <DialogActions>
                                <Button
                                    onClick={submitForm}
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    Войти
                                </Button>
                                <Button
                                    onClick={handleClose}
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    Отмена
                                </Button>
                            </ DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        loginErrorMessage: state.auth.loginErrorMessage
    }
}
type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchProps = {
    showLoginForm: (loginFormShown: boolean) => void
    login: (email: string, password: string) => void
    setLoginErrorMessage: (loginErrorMessage: string | null) => void
}
const mapDispatchToProps = {
    showLoginForm,
    login,
    setLoginErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)