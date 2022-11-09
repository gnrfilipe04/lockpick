import { extendTheme } from 'native-base'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

// extend the theme
export const theme = extendTheme({ 
  config,
  colors: {
    primary: {
      '50': '#F8FAFC',
      '500': '#64748B',
      '900': '#0F172A',
    },
    secondary: {
      '400':'#1A91FF',
    },
  },
})

  type MyThemeType = typeof theme;
  
  declare module 'native-base' {
    type ICustomTheme = MyThemeType
  }
