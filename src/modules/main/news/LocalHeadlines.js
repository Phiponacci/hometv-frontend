import * as React from 'react'

import API_BASE_URL from '../../api'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import NewsTicker from 'react-advanced-news-ticker'

const UPDATE_RATE = 30 * 60 * 1000

function LocalHeadlines() {
  const [news, setNews] = React.useState(null)
  React.useEffect(() => {
    const fetchPosts = () => {
      fetch(`${API_BASE_URL}/LocalHeadline/active`)
        .then((response) => response.json())
        .then((data) => setNews(data))
        .catch((error) =>
          alert('Error fetching local headlines from the server!'),
        )
    }
    fetchPosts()
    const timer = setInterval(() => {
      fetchPosts()
    }, UPDATE_RATE)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <>
      <Box sx={{ flexGrow: 1, margin: 0 }}>
        <Box
          sx={{
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Avatar
            src="/logo.png"
            variant="square"
            sx={{ width: 45 * (4 / 3), height: 45, marginRight: 2 }}
          />
          <Grid
            sx={{
              padding: 0,
            }}
          >
            <div
              style={{
                color: 'white',
                marginRight: 20,
                padding: 0,
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              Local Headlines
            </div>
            {news != null && (
              <NewsTicker
                maxRows={1}
                duration={5000}
                style={{
                  margin: 0,
                  minHeight: 30,
                  listStyleType: 'none',
                  padding: 0,
                }}
              >
                {news.map((item) => (
                  <div key={item.id.toString()}>
                    <h4
                      className="hour"
                      style={{
                        color: 'white',
                        display: 'inline',
                      }}
                    >
                      {new Date(item.headlineDateTime).toDateString()} |{' '}
                    </h4>
                    <h4
                      style={{
                        color: 'white',
                        display: 'inline',
                      }}
                    >
                      {item.headline}
                    </h4>
                  </div>
                ))}
              </NewsTicker>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default LocalHeadlines
