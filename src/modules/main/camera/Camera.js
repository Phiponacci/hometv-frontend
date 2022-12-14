import * as React from 'react'

import API_BASE_URL from '../../api'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

const PERIOD = 10000
const UPDATE_RATE = 30 * 60 * 1000

function Camera() {
  const [item, setItem] = React.useState(null)
  const setupSlides = (cameras) => {
    let index = 0
    setItem(cameras[index])
    setInterval(() => {
      setItem(cameras[++index % cameras.length])
    }, PERIOD)
  }
  React.useEffect(() => {
    const fetchData = () => {
      fetch(`${API_BASE_URL}/Camera/active`)
        .then((res) => res.json())
        .then((_cameras) => {
          _cameras.forEach((camera) => {
            if (camera.isImage) camera.link = `${API_BASE_URL}/${camera.link}`
          })
          setupSlides(_cameras)
        })
        .catch((error) => alert('ERROR: cannot fetch camera stream!'))
    }
    fetchData()
    const timer = setInterval(() => fetchData(), UPDATE_RATE)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      {item && (
        <Card
          square
          sx={{
            my: 1,
            height: 350,
            backgroundColor: item.isImage ? 'white' : 'transparent',
            boxShadow: 0,
          }}
        >
          <CardMedia
            component="img"
            alt="ad or camera"
            image={item.link}
            sx={{
              width: '100%',
              height: item.isImage ? '100%' : '80%',
              objectFit: 'contain',
            }}
          />
          {item.isImage === false && (
            <CardContent>
              <h5>{item.name}</h5>
            </CardContent>
          )}
        </Card>
      )}
    </>
  )
}

export default Camera
