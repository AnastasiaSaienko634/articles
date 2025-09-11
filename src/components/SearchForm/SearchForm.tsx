import { ErrorMessage, Formik } from "formik";
import { Field, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./SearchForm.module.css";

interface SearchFormProps {
  onSubmit: (topic: string) => void;
}

interface initialValuesProps {
  topic: string;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const initialValues: initialValuesProps = {
    topic: "",
  };

  const Schema = Yup.object().shape({
    topic: Yup.string()
      .min(2, "Topic too short")
      .max(50, "Topic too long")
      .required("Topic is required"),
  });
  const handleSubmit = (
    values: initialValuesProps,
    formikHelpers: FormikHelpers<initialValuesProps>
  ) => {
    const topic = values.topic;
    formikHelpers.resetForm();
    if (topic === "") {
      alert("Please enter search topic!");
      return;
    }

    onSubmit(topic);
  };

  return (
    <Formik
      validationSchema={Schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <Field
          className={css.fieldset}
          type="text"
          name="topic"
          placeholder="Write here something..."
        />
        <button className={css.button} type="submit">
          Search
        </button>
        <ErrorMessage name="topic" component="span" className={css.schema} />
      </Form>
    </Formik>
  );
}
