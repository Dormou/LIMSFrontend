import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(1, 'имя слишком короткое')
      .max(50, 'имя слишком длинное'),
    lastname: Yup.string()
      .min(1, 'фамилия слишком короткая')
      .max(50, 'фамилия слишком длинная'),
    email: Yup.string()
      .email('неверный формат электронной почты'),
    password: Yup.string()
      .min(5, 'слишком короткий пароль')
      .max(10, 'слишком длинный пароль'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password'), 'error'], 'пароли не совпадают')
});