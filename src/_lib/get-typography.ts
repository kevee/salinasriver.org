import fs from 'fs/promises'
import Typography from 'typography'

/**
 * Renders a well-formatted typography CSS string
 * and imports the necessary Google Fonts.
 */
const getTypography = (): { fontImport: string; typography: string } => {
  const googleFonts = [
    {
      name: 'Open Sans',
      styles: ['400', '700'],
    },
    {
      name: 'Poppins',
      styles: ['400'],
    },
  ]

  const typography = Typography({
    baseFontSize: '20px',
    baseLineHeight: 1.666,
    headerFontFamily: ['Poppins', 'sans-serif'],
    bodyFontFamily: ['Open Sans', 'serif'],
    googleFonts,
  })

  const googleFontsFamilies = googleFonts
    .map((font) => {
      const escapedName = font.name.replace(/\s+/g, '+')
      const styles = font.styles.join(';')
      return `family=${escapedName}:wght@${styles}`
    })
    .join('&')

  const fontImport = `@import url('https://fonts.googleapis.com/css2?${googleFontsFamilies}&display=swap');`

  return { fontImport, typography: typography.toString() }
}

export default getTypography
