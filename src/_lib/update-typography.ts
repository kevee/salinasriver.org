import fs from 'fs/promises'
import Typography from 'typography'

/**
 * Renders site typography using Typography.js and writes it to a CSS file.
 */
const updateTypography = async (): Promise<void> => {
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

  await fs.writeFile(
    'src/_components/layout/site-typography.webc',
    ['<style>', typography.toString(), '</style>'].join('')
  )
  await fs.writeFile(
    'src/_components/layout/site-fonts.webc',
    ['<style webc:keep>', fontImport, '</style>'].join('')
  )
}

export default updateTypography
