// ** Type Imports
import { Palette } from '@mui/material'
import { Skin, ThemeColor } from 'src/@core/layouts/types'

const DefaultPalette = (mode: Palette['mode'], skin: Skin, themeColor: ThemeColor): Palette => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '58, 53, 65'
  const darkColor = '231, 227, 252'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#F58991'
    } else if (themeColor === 'secondary') {
      return '#9C9FA4'
    } else if (themeColor === 'success') {
      return '#93DD5C'
    } else if (themeColor === 'error') {
      return '#FF8C90'
    } else if (themeColor === 'warning') {
      return '#FFCF5C'
    } else {
      return '#6ACDFF'
    }
  }

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return '#161616'
    } else if (mode === 'light') {
      return '#F4F5FA'
    } else return '#161616'
  }

  const tableHeaderGradient = () => {
    if (themeColor === 'primary') {
      return '#DF3B67'
    } else if (themeColor === 'secondary') {
      return '#8A8D93'
    } else if (themeColor === 'success') {
      return '#56CA00'
    } else if (themeColor === 'error') {
      return '#FF4C51'
    } else if (themeColor === 'warning') {
      return '#FFB400'
    } else {
      return '#16B1FF'
    }
  }

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      primaryGradient: primaryGradient(),
      bodyBg: mode === 'light' ? '#F4F5FA' : '#28243D', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#F0F2F8' : '#404040',
      avatarBg: mode === 'light' ? '#F0EFF0' : '#202020',
      darkBg: skin === 'bordered' ? '#202020' : '#161616',
      lightBg: skin === 'bordered' ? whiteColor : '#F4F5FA',
      tableHeaderBg: mode === 'light' ? primaryGradient() : tableHeaderGradient()
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: '#F58991',
      main: '#DF3B67',
      dark: '#A01D5A',
      contrastText: whiteColor
    },
    secondary: {
      light: '#9C9FA4',
      main: '#8A8D93',
      dark: '#777B82',
      contrastText: whiteColor
    },
    error: {
      light: '#FF6166',
      main: '#FF4C51',
      dark: '#E04347',
      contrastText: whiteColor
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: whiteColor
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: whiteColor
    },
    success: {
      light: '#6AD01F',
      main: '#56CA00',
      dark: '#4CB200',
      contrastText: whiteColor
    },

    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : '#303030',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  } as Palette
}

export default DefaultPalette
