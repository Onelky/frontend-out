import type { CommonControllerProps } from './form.types'
import { type ChangeEvent, useMemo, useState } from 'react'
import { type FieldValues, useController } from 'react-hook-form'
import {
  ActionIcon,
  TextInput,
  type TextInputProps,
  useMantineTheme,
} from '@mantine/core'
import { IconEye, IconEyeClosed, Icon } from '@tabler/icons-react'

interface TextFieldControllerProps<T extends FieldValues>
  extends CommonControllerProps<T> {
  textInputProps?: Omit<TextInputProps, 'value' | 'onChange' | 'name' | 'error'>
  isPassword?: boolean
}

/**
 * Component that uses React hook form to handle state of Mantine's TextInput input.
 */
export const TextInputController = <T extends FieldValues>(
  props: TextFieldControllerProps<T>,
) => {
  const { control, name, textInputProps, isPassword } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    field: { value, onBlur, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  })

  const inputProps = useMemo(() => {
    const Icon: Icon = showPassword ? IconEyeClosed : IconEye

    if (!isPassword) return { ...textInputProps }

    return {
      ...textInputProps,
      rightSection: (
        <ActionIcon
          variant={'transparent'}
          color={'gray'}
          onClick={() => setShowPassword((value) => !value)}
        >
          <Icon />
        </ActionIcon>
      ),
      type: showPassword ? 'text' : 'password',
    }
  }, [isPassword, showPassword, textInputProps])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => onChange(e)

  return (
    <TextInput
      size="sm"
      value={value}
      onBlur={onBlur}
      error={errors[name]?.message as string}
      onChange={handleChange}
      {...inputProps}
    />
  )
}
