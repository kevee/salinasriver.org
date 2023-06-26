import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  bodyGrayHue: 'warm',
  headerGrayHue: 'slate',
  headerGray: 10,
  headerWeight: 700,
  headerFontFamily: [
    'Raleway',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: [
    'Open Sans',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  googleFonts: [
    {
      name: 'Raleway',
      styles: ['700'],
    },
    {
      name: 'Open Sans',
      styles: ['400', '400i', '700', '700i'],
    },
  ],
})

export default typography
