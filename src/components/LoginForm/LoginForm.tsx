import React from 'react';
import {AppStateType} from "../../redux/store"
import {connect} from "react-redux"
import {Formik, Form} from 'formik';
import DialogMui from '@material-ui/core/Dialog';
import ButtonMui from '@material-ui/core/Button';
import DialogTitleMui from '@material-ui/core/DialogTitle';
import DialogContentMui from '@material-ui/core/DialogContent';
import DialogContentTextMui from '@material-ui/core/DialogContentText';
import TypographyMui from "@material-ui/core/Typography"
import DialogActionsMui from '@material-ui/core/DialogActions';
import FormHelperTextMui from "@material-ui/core/FormHelperText"
import FormControlMui from "@material-ui/core/FormControl"
import InputLabelMui from "@material-ui/core/InputLabel"
import InputMui from "@material-ui/core/Input"
import {login, setLoginErrorMessage, showLoginForm} from "../../redux/authReducer"
import {isEmail} from "../../validators/validators"

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
            <DialogMui open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit,
                          isSubmitting,}) => (
                        <Form onSubmit={handleSubmit}>
                            <DialogTitleMui id="form-dialog-title">Авторизация</DialogTitleMui>
                            <DialogContentMui>
                                <DialogContentTextMui>
                                    <TypographyMui variant='caption'>
                                        test user data. email: 'testuser@email.com' password: 'testuser_pass'
                                    </TypographyMui>
                                </DialogContentTextMui>
                                <FormControlMui fullWidth error={!!errors.email && touched.email}>
                                    <InputLabelMui htmlFor="email">Email</InputLabelMui>
                                    <InputMui
                                        name="email"
                                        type="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {<FormHelperTextMui id="email-error">{errors.email && touched.email && errors.email}</FormHelperTextMui>}
                                </FormControlMui>
                                <br/>
                                <FormControlMui fullWidth error={!!errors.password && touched.password}>
                                    <InputLabelMui htmlFor="password">Password</InputLabelMui>
                                    <InputMui
                                        name="password"
                                        type="password"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {<FormHelperTextMui id="password-error">{errors.email && touched.email && errors.email}</FormHelperTextMui>}
                                </FormControlMui>
                            </DialogContentMui>
                            {
                                props.loginErrorMessage && <DialogContentMui>
                                    <FormHelperTextMui id="my-helper-text" error={true}>
                                        {props.loginErrorMessage}
                                    </FormHelperTextMui>
                                </DialogContentMui>
                            }
                            <DialogActionsMui>
                                <ButtonMui
                                    onClick={()=>handleSubmit()}
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    Войти
                                </ButtonMui>
                                <ButtonMui
                                    onClick={handleClose}
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    Отмена
                                </ButtonMui>
                            </ DialogActionsMui>
                        </Form>
                    )}
                </Formik>
            </DialogMui>
        </div>
    );
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: AppStateType) => {
    return {
        loginErrorMessage: state.auth.loginErrorMessage
    }
}

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