import * as React from 'react'

import API_BASE_URL from '../../api'
import Box from '@mui/material/Box'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const PERIOD = 5000
const UPDATE_RATE = 30 * 60 * 1000

function SportsWidget() {
  const [scores, setScores] = React.useState([])
  const [currentScore, setCurrentScore] = React.useState(null)

  React.useEffect(() => {
    const fetchData = () => {
      fetch(`${API_BASE_URL}/Scores/active`)
        .then((res) => res.json())
        .then((_scores) => {
          setScores(_scores)
        })
        .catch((_) => alert('ERROR: scores not available!'))
    }
    fetchData()
    const timer = setInterval(() => {
      fetchData()
    }, UPDATE_RATE)
    return () => {
      clearInterval(timer)
    }
  }, [])

  React.useEffect(() => {
    let index = 0
    if (scores.length > 0) {
      const firstItem = scores[0]
      firstItem.sportImg = `${API_BASE_URL}/sports/images/${firstItem.sport_title}.png`
      setCurrentScore(firstItem)
    }
    const timer = setInterval(() => {
      if (scores.length > 0) {
        const item = scores[++index % scores.length]
        item.sportImg = `${API_BASE_URL}/sports/images/${item.sport_title}.png`
        setCurrentScore(item)
        if (item.completed) {
        } else {
        }
      }
    }, PERIOD)
    return () => {
      clearInterval(timer)
    }
  }, [scores])

  return (
    <>
      {currentScore && (
        <Card
          square
          sx={{
            my: 0.5,
            py: 5,
          }}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)), url('${currentScore.sportImg}')`,
            backgroundPosition: 'center',
            backgroundSize: '40% 100%',
            backgroundRepeat: 'no-repeat',
            height: 230,
          }}
        >
          <CardContent
            sx={{
              p: 0.25,
              '&:last-child': { pb: 0 },
            }}
          >
            <Grid container>
              <Grid item xs={5} sm={5} md={5} align="center">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', p: 1 }} align="center">
                  {currentScore.completed? currentScore.scores[0].name: currentScore.home_team}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <Typography variant="h6" sx={{ mt: 3 }} align="center">
                  VS
                </Typography>
              </Grid>
              <Grid item xs={5} sm={5} md={5} align="center">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', p: 1 }} align="center">
                    {currentScore.completed? currentScore.scores[1].name: currentScore.away_team}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6} sm={6} md={6} align="center">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h4" align="center">
                    {currentScore.completed ? (
                      <>{currentScore.scores[0].score}</>
                    ) : (
                      '-'
                    )}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6} align="center">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h4" align="center">
                    {currentScore.completed ? (
                      <>{currentScore.scores[1].score}</>
                    ) : (
                      '-'
                    )}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            {
              <Grid align="center">
                <Typography
                  sx={{ fontWeight: 'bold', p: 1 }}
                  align="center"
                  variant="h5"
                >
                  {new Date(currentScore.commence_time).toDateString()}
                </Typography>
              </Grid>
            }
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default SportsWidget
