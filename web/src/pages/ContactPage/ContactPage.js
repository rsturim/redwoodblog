import BlogLayout from 'src/layouts/BlogLayout'
import {
  Form,
  Label,
  FieldError,
  TextAreaField,
  TextField,
  Submit,
  useMutation,
  FormError,
} from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`
const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      formMethods.reset()
      alert('thanks for the message')
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
    console.log('data: ', data)
  }

  return (
    <BlogLayout>
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        formMethods={formMethods}
        error={error}
      >
        <FormError error={error} />
        <Label name="name" errorClassName="error">
          Your name:
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error" />
        <Label name="email" errorClassName="error">
          Email address:
        </Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{
            required: true,
            pattern: { value: /[^@]+@[^.]+\..+/ },
          }}
        />
        <FieldError name="email" className="error" />
        <Label name="message" errorClassName="error">
          Please leave a message:
        </Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="message" className="error" />
        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
