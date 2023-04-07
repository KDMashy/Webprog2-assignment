import * as yup from "yup";

const exampleValidation = yup.object().shape({
  example_name: yup.string().required("example name is required"),
  example_number: yup.number().required("example number is required"),
});

export { exampleValidation };
