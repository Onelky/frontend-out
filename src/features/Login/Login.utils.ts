import { LoginRequest } from '@/types'
import { object, ObjectSchema } from 'yup'
import * as yup from 'yup'

export type LoginForm = Partial<LoginRequest>

const passwordRules = /^(?=.*\d)(?=.*\w).{6,}$/

export const loginSchema: ObjectSchema<LoginForm> = object()
  .shape({
    email: yup
      .string()
      .email('Invalid email format')
      .trim()
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .matches(passwordRules, {
        message: 'The password must contain digits and letters',
      })
      .trim()
      .required('Password is required'),
  })
  .required()
