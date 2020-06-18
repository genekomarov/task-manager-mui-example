import React from 'react';
import {AppStateType} from "../../redux/store"
import {connect} from "react-redux"
import {login, setLoginErrorMessage, showLoginForm} from "../../redux/authReducer"
import Dialog from '@material-ui/core/Dialog';
import {Formik, Form} from 'formik';
import {Button} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {Typography} from "@material-ui/core"
import DialogActions from '@material-ui/core/DialogActions';
import {isEmail} from "../../validators/validators"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"

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
                        debugger
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
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit,
                          isSubmitting,}) => (
                        <Form onSubmit={handleSubmit}>
                            <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <Typography variant='caption'>
                                        test user data. email: 'testuser@email.com' password: 'testuser_pass'
                                    </Typography>
                                </DialogContentText>
                                <FormControl fullWidth error={!!errors.email && touched.email}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input
                                        name="email"
                                        type="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {<FormHelperText id="email-error">{errors.email && touched.email && errors.email}</FormHelperText>}
                                </FormControl>
                                <br/>
                                <FormControl fullWidth error={!!errors.password && touched.password}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {<FormHelperText id="password-error">{errors.email && touched.email && errors.email}</FormHelperText>}
                                </FormControl>
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
                                    onClick={()=>handleSubmit()}
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