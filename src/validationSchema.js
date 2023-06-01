import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required(),
  phone: Yup.number().required(),
  email: Yup.string().email().required(),
  address: Yup.string().required(),
});
