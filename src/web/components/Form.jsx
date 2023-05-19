import clsx from "clsx"

import { Formik, Form as FormikForm } from "formik"

const Form = ({ children, className, ...otherProps }) => {
  return (
    <Formik {...otherProps}>
      <FormikForm noValidate className={clsx("flex flex-col gap-4", className)}>
        {children}
      </FormikForm>
    </Formik>
  )
}

export default Form
