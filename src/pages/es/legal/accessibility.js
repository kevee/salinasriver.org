import React from 'react'
import Layout from '../../../components/layout'

const EsLegalAccessibiltyPage = () => {
  return (
    <Layout language="es">
      <h1>Declaración de accesibilidad</h1>
      <p>
        Los autores de la Guía recreativa del río Salinas se comprometen a
        garantizar la accesibilidad digital a las personas con discapacidad.
        Mejoramos continuamente la experiencia del usuario para todos y
        aplicamos las normas de accesibilidad pertinentes.
      </p>
      <h2>Estado de conformidad</h2>
      <p>
        Las Pautas de Accesibilidad al Contenido en la Web (WCAG) definen los
        requisitos que deben cumplir los diseñadores y desarrolladores para
        mejorar la accesibilidad de las personas con discapacidad. Define tres
        niveles de conformidad: nivel A, nivel AA y nivel AAA. Este sitio web es
        plenamente conforme con el nivel AA de las WCAG 2.1. Plenamente conforme
        significa que el contenido se ajusta plenamente a la norma de
        accesibilidad sin ninguna excepción.
      </p>
      <h2>Especificaciones técnicas</h2>
      <p>
        La accesibilidad del sitio web depende de las siguientes tecnologías
        para funcionar con la combinación concreta de navegador web y cualquier
        tecnología de asistencia o complemento instalado en su computadora:
      </p>
      <ul>
        <li>HTML</li>
        <li>WAI-ARIA</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
      <p>
        Estas tecnologías se basan en la conformidad con las normas de
        accesibilidad utilizadas.
      </p>
      <h2>Limitaciones y alternativas</h2>
      <p>
        A pesar de nuestros esfuerzos por garantizar la accesibilidad del sitio
        web, pueden existir algunas limitaciones. A continuación se describen
        las limitaciones conocidas y las posibles soluciones. Póngase en
        contacto con nosotros si observa algún problema que no figure en la
        siguiente lista.
      </p>
      <ul>
        <li>
          Los mapas se sustituyen por tablas de datos para los usuarios de
          lectores de pantalla
        </li>
      </ul>
      <p>
        Agradecemos sus comentarios sobre la accesibilidad de este sitio web. Si
        encuentra barreras de accesibilidad, póngase en contacto con nosotros en
        hello@salinasriver.org.
      </p>
      <p>
        Intentamos responder a sus comentarios en un plazo de cinco días hábiles
        y proponer una solución en un plazo de diez días hábiles.
      </p>
    </Layout>
  )
}

export default EsLegalAccessibiltyPage
