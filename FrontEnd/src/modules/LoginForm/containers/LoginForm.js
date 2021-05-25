import { withFormik } from 'formik';

import LoginForm from '../components/LoginForm';

import validateFunc from '../../../utils/validate';
import { userActions } from '../../../redux/actions';

import store from '../../../redux/store';

const LoginFormContainer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validate: (values) => {
    let errors = {};
    validateFunc({ isAuth: true, values, errors });
    return errors;
  },

  handleSubmit: (values, { setSubmitting, props }) => {
    store
      .dispatch(userActions.fetchUserLogin(values))
      .then(({ status }) => {
        console.log(status);
        if (status === 201) {
          setTimeout(() => {
            props.history.push('/');
          }, 1000);
        }
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  },

  displayName: 'LoginForm',
})(LoginForm);

export default LoginFormContainer;
