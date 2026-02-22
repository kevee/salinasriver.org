import fs from 'fs'
import path from 'path'
import Typography from 'typography'

/**
 * Renders a well-formatted typography CSS string
 * with self-hosted font declarations.
 */
const getTypography = (): { fontImport: string; typography: string } => {
  const typography = Typography({
    baseFontSize: '20px',
    baseLineHeight: 1.666,
    headerFontFamily: ['Poppins', 'sans-serif'],
    bodyFontFamily: ['Open Sans', 'serif'],
  })

  const fontImport = fs
    .readFileSync(path.join('./src/assets/fonts/fonts.css'), 'utf8')
    .toString()

  return { fontImport, typography: typography.toString() }
}

export default getTypography
