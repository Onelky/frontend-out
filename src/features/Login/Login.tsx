import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { type LoginForm, loginSchema } from './Login.utils'
import { TextInputController } from '@components/form'
import { Button, Paper, Stack, Text, Title } from '@mantine/core'
import { useAuth } from '@/providers/authProvider.tsx'
import styles from './Login.module.css'

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
    <Paper withBorder radius={'sm'} shadow={'md'} className={styles.paper}>
      <Title order={1} c={'primary.8'}>
        ProLogin
      </Title>
      <Stack
        w={'100%'}
        h={'100%'}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
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
          isPassword
          textInputProps={{
            label: 'Password',
            required: true,
            type: 'password',
            placeholder: 'Password',
          }}
        />
        {error && (
          <Text variant={'outline'} c={'red'}>
            {error}
          </Text>
        )}

        <Button type={'submit'} disabled={!isValid}>
          Login
        </Button>
      </Stack>
    </Paper>
  )
}
