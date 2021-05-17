const validate = ({ isAuth, values, errors }) => {
  const rules = {
    email: (value) => {
      if (!value) {
        errors.email = 'Введите email адрес';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = 'Неверный email!';
      }
    },

    password: (value) => {
      if (!value) {
        errors.password = 'Введите пароль';
      } else if (
        !isAuth &&
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/i.test(value)
      ) {
        errors.password = 'Слишком лёгкий пароль!';
      }
    },

    confirm__password: (value) => {
      if (!value) {
        errors.confirm__password = 'Подтвердите пароль';
      } else if (values.password !== value) {
        errors.confirm__password = 'Пароли не совпадают!';
      }
    },

    username: (value) => {
      if (!value) {
        errors.username = 'Введите никнейм';
      }
    },
  };

  Object.keys(values).forEach((key) => rules[key] && rules[key](values[key]));
};

export default validate;
