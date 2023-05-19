import { useAppContext } from "@/web/components/AppContext.jsx"

import Button from "@/web/components/Button.jsx"

import Form from "@/web/components/Form.jsx"

import FormField from "@/web/components/FormField.jsx"

import Page from "@/web/components/Page"

import { useRouter } from "next/router.js"

import * as yup from "yup"

const initialValues = {
  username: "",
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  username: yup.string().trim().required().label("Username"),
  email: yup.string().email().required().label("E-mail"),
  password: yup
    .string()
    .min(8)
    .matches(/^.*(?=.*[0-9]+).*$/, "Password must contain a number")
    .matches(
      /^.*(?=.*\p{Ll}+).*$/u,
      "Password must contain a lower case letter"
    )
    .matches(
      /^.*(?=.*\p{Lu}+).*$/u,
      "Password must contain a upper case letter"
    )
    .matches(
      /^.*(?=.*[^0-9\p{L}]+).*$/u,
      "Password must contain a special character"
    )
    .required()
    .label("Password"),
})

const SignUpPage = () => {
  const {
    actions: { signUp },
  } = useAppContext()

  const router = useRouter()

  const handleSubmit = async (values) => {
    try {
      await signUp(values)

      router.push("/sign-in")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Page title="Sign Up" className={"mx-auto flex max-w-3xl flex-col p-2"}>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField name="username" label="Username" />
        <FormField name="email" label="E-mail" type="email" />
        <FormField name="password" label="Password" type="password" />
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </Page>
  )
}

export default SignUpPage
