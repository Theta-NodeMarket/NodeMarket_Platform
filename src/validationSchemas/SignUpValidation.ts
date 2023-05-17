import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("A email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(18, "Password must be less than 18 characters")
    .required("A password is required."),
  role: yup.string().required("A role is required."),
});
