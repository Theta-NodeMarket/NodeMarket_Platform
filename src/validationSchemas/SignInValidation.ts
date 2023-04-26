import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("A email is required."),
  password: yup.string().required("A password is required."),
});
