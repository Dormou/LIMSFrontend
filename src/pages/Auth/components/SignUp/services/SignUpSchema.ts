import * as Yup from 'yup';

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/


export const SignUpSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(11, 'имя слишком короткое')
      .max(50, 'имя слишком длинное'),
    lastname: Yup.string()
      .min(1, 'фамилия слишком короткая')
      .max(50, 'фамилия слишком длинная'),
    addtionalname: Yup.string()
      .min(1, 'отчество слишком короткое')
      .max(50, 'отчество слишком длинное'),
    orgname: Yup.string()
      .min(1, 'наименование организации слишком короткое')
      .max(150, 'отчество слишком длинное'),
    orgaddress: Yup.string()
      .min(1, 'адрес слишком короткий')
      .max(150, 'адрес слишком длинный'),
    dolgnost: Yup.string()
      .min(1, 'должность слишком короткая')
      .max(100, 'должность слишком длинная'),
    phone: Yup.string()
      .matches(phoneRegExp,'неверный формат номера телефона'),
    email: Yup.string()
      .email('неверный формат электронной почты'),
});