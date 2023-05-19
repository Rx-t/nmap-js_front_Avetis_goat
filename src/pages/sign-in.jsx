import { useAppContext } from "@/web/components/AppContext.jsx"

import Button from "@/web/components/Button.jsx"

import Form from "@/web/components/Form.jsx"

import FormField from "@/web/components/FormField.jsx"

import Page from "@/web/components/Page"

import { useRouter } from "next/router.js"

import * as yup from "yup"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().required().label("Password"),
})

const SignInPage = () => {
  const {
    actions: { signIn },
  } = useAppContext()

  const router = useRouter()

  const handleSubmit = async (values) => {
    try {
      await signIn(values)

      router.push("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Page title="Sign In" className={"mx-auto flex max-w-3xl flex-col p-2"}>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField name="email" label="E-mail" type="email" />
        <FormField name="password" label="Password" type="password" />
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </Page>
  )
}

export default SignInPage
