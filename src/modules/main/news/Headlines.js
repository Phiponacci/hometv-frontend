import * as React from 'react'

import API_BASE_URL from '../../api'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import NewsTicker from 'react-advanced-news-ticker'

const UPDATE_RATE = 30 * 60 * 1000

function Headlines() {
  const [news, setNews] = React.useState(null)

  React.useEffect(() => {
    const fetchData = () => {
      fetch(`${API_BASE_URL}/News/rss`)
        .then((res) => res.json())
        .then((_links) => {
          if (_links.length === 0) {
            setNews([
              {
                guid: 0,
                pubDate: '',
                title: {
                  cdataSection: 'Headlines are not available for the moment',
                },
              },
            ])
          } else setNews(_links)
        })
        .catch((_) => alert('ERROR: news links not found!'))
    }
    fetchData()
    const timer = setInterval(() => {
      fetchData()
    }, UPDATE_RATE)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <>
      <Box sx={{ flexGrow: 1, width: '100%', marginTop: 1 }} id="news-bar">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              color: 'white',
              marginRight: 20,
              padding: 0,
              marginTop: -15,
              fontSize: 35,
              fontWeight: 'bold',
            }}
          >
            News
          </div>
          <Grid>
            {news != null && (
              <NewsTicker
                maxRows={1}
                duration={5000}
                style={{
                  minHeight: 30,
                  listStyleType: 'none',
                  padding: 0,
                  marginTop: 5,
                }}
              >
                {news.map((item) => (
                  <div key={item.guid.toString()}>
                    <h4
                      className="hour"
                      style={{
                        color: 'white',
                        display: 'inline',
                      }}
                    >
                      {new Date(item.pubDate).toDateString()} |{' '}
                    </h4>
                    <h4
                      style={{
                        color: 'white',
                        display: 'inline',
                      }}
                    >
                      {item.title.cdataSection}
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

export default Headlines
