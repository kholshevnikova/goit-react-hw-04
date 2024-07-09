import { Formik, Form, Field } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { ErrorMessage } from "formik";
import css from "./ContactForm.module.css";

export default function ContactForm({ onAdd }) {
  const handleSumbit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    const id = nanoid();
    onAdd({ id: id, name: values.name, number: values.number });
  };

  const nameFieldId = useId();
  const numberFieldId = useId();

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{
        id: "",
        name: "",
        number: "",
      }}
      onSubmit={handleSumbit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.formContainer}>
        <div className={css.fieldContainer}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field type="text" name="name" id={nameFieldId}></Field>
          <ErrorMessage name="name" component="span" />
        </div>
        <div className={css.fieldContainer}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field type="tel" name="number" id={numberFieldId}></Field>
          <ErrorMessage name="number" component="span" />
        </div>

        <button type="submit" className={css.addButton}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
