import * as yup from "yup";

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("A email is required."),
  password: yup.string().min(6).max(18).required("A password is required."),
});
