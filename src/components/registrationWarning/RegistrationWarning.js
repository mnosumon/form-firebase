import * as Yup from "yup";

export const registrationWarning = Yup.object({
  fullName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Please enter a valide name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter a valide email"),
  password: Yup.string()
    .min(6)
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
      "please atleast one special character"
    )
    .required("Please enter a valide password"),
  gender: Yup.string().required("select your gender"),
});
