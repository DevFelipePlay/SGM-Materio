// ** MUI Theme Provider
import { deepmerge } from '@mui/utils'
import { PaletteMode, ThemeOptions } from '@mui/material'

// ** User Theme Options
import UserThemeOptions from 'src/layouts/UserThemeOptions'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Theme Override Imports
import palette from './palette'
import spacing from './spacing'
import shadows from './shadows'
import overrides from './overrides'
import typography from './typography'
import breakpoints from './breakpoints'

const themeOptions = (settings: Settings, overrideMode: PaletteMode): ThemeOptions => {
  // ** Vars
  const { skin, mode, direction, themeColor } = settings
  console.log('TEMA: ' + themeColor)

  // ** Create New object before removing user component overrides and typography objects from userThemeOptions
  const userThemeConfig: ThemeOptions = Object.assign({}, UserThemeOptions())

  const mergedThemeConfig: ThemeOptions = deepmerge(
    {
      breakpoints: breakpoints(),
      direction,
      components: {
        ...overrides(settings),
        MuiCssBaseline: {
          styleOverrides: (themeParam: any) => ({
            body: {
              '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                width: 3,
                height: 5
              },
              '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                background: themeParam.palette.background.default
              },
              '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                background: themeParam.palette.primary.main,
                borderRadius: 5
              },
              '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                background: themeParam.palette.primary.light
              }
            }
          })
        }
      },
      palette: palette(mode === 'semi-dark' ? overrideMode : mode, skin, themeColor),
      ...spacing,
      shape: {
        borderRadius: 6
      },
      mixins: {
        toolbar: {
          minHeight: 64
        }
      },
      shadows: shadows(mode === 'semi-dark' ? overrideMode : mode),
      typography
    },
    userThemeConfig
  )

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...(mergedThemeConfig.palette
          ? mergedThemeConfig.palette[themeColor]
          : palette(mode === 'semi-dark' ? overrideMode : mode, skin, themeColor).primary)
      }
    }
  })
}

export default themeOptions
