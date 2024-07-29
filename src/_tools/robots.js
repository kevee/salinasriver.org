const axios = require('axios')
const fs = require('fs-extra')

;(async () => {
  const robots = await axios
    .post(
      'https://api.darkvisitors.com/robots-txts',
      {
        agent_types: [
          'AI Data Scraper',
          'Undocumented AI Agent',
          'AI Assistant',
          'AI Search Crawler',
        ],
        disallow: '/',
      },
      {
        headers: {
          Authorization: 'Bearer ' + process.env.DARK_VISITOR_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    )
    .catch((err) => {
      console.log(err)
    })
  fs.writeFileSync('public/robots.txt', robots.data)
})()
