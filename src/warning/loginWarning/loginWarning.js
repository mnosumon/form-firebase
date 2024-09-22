import * as Yup from "yup";

export const loginWarning = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter a valide email"),
  password: Yup.string().min(6).required("Please enter a valide password"),
});
