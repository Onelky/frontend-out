import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { LoginForm, loginSchema } from './Login.utils'
import { TextInputController } from '@components/form'
import { Alert, Button, Stack, Title } from '@mantine/core'
import { useAuth } from '@/providers/authProvider.tsx'

export const Login = () => {
  const { login, error } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    shouldFocusError: true,
    defaultValues: { email: '', password: '' },
    mode: 'all',
  })
  const onSubmit = (values: LoginForm) => login(values.email, values.password)

  return (
    <Stack>
      <Title>ProLogin</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputController
          control={control}
          name={'email'}
          textInputProps={{
            label: 'Email',
            required: true,
            placeholder: 'Email',
          }}
        />
        <TextInputController
          control={control}
          name={'password'}
          textInputProps={{
            label: 'Password',
            required: true,
            type: 'password',
            placeholder: 'Password',
          }}
        />
        {error && <Alert color={'red'}>{error}</Alert>}

        <Button type={'submit'} disabled={!isValid}>
          Login
        </Button>
      </form>
    </Stack>
  )
}
