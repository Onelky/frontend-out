import { createTheme, TextInput, Title } from '@mantine/core'

export const customColors = {
  secondary: '#cce2d7',
  gray: '#eff4f4',
}

const theme = createTheme({
  defaultRadius: 'sm',
  // Breakpoints
  breakpoints: {
    xs: '360px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1440px',
  },

  // Colors
  black: '#11151C',
  defaultGradient: { from: 'primary.5', to: 'primary.3' },
  primaryShade: 5,
  colors: {
    primary: [
      '#d8ffdc',
      '#cbffd0',
      '#b1ffb9',
      '#97ffa1',
      '#7dff8a',
      '#64cc6e',
      '#64cc6e',
      '#4b9953',
      '#326637',
      '#0c190e',
    ],
  },
  primaryColor: 'primary',
  components: {
    Title: Title.extend({ defaultProps: { c: 'primary.8' } }),
    TextInput: TextInput.extend({
      defaultProps: {
        color: 'primary',
        styles: {
          label: { color: 'gray' },
        },
      },
    }),
  },
  other: {
    colors: customColors,
  },
})

declare module '@mantine/core' {
  export interface MantineThemeOther {
    colors: typeof customColors
  }
}

export default theme
