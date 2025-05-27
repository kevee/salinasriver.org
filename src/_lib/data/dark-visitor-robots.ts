import Fetch from '@11ty/eleventy-fetch'

const getDarkVisitorRobots = async (): Promise<string> => {
  const robots = await Fetch('https://api.darkvisitors.com/robots-txts', {
    duration: '1d',
    type: 'text',
    fetchOptions: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.DARK_VISITOR_TOKEN,
      },
      body: JSON.stringify({
        agent_types: [
          'AI Data Scraper',
          'Undocumented AI Agent',
          'AI Assistant',
          'AI Search Crawler',
        ],
        disallow: '/',
      }),
    },
  })

  return robots
}

export default getDarkVisitorRobots
