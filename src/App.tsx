import './App.css'
import { VideoPlayer } from './video-player/VideoPlayer'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { useState } from 'react';

function App() {

  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    console.log('play')
    setIsPlaying(true)
  }

  const pauseVideo = () => {
    console.log('pause')
    setIsPlaying(false)
  }

  return (
    <>
      <h1>Multi Video Player</h1>
      <div className='video-player'>
        <h2>Video Player</h2>
        <div className='controls-container'>
          <h3>Controls</h3>
          <Stack
            className='stack'
            spacing={2}
            direction="row"
            divider={<Divider orientation='horizontal' flexItem />}>
            <Button variant="contained" onClick={playVideo}>Play</Button>
            <Button variant="contained" onClick={pauseVideo}>Pause</Button>
          </Stack> 
        </div>

        <div className='videos-container'>
          <VideoPlayer play={isPlaying}></VideoPlayer>
          <VideoPlayer play={isPlaying}></VideoPlayer>
          <VideoPlayer play={isPlaying}></VideoPlayer>
          <VideoPlayer play={isPlaying}></VideoPlayer>
        </div>
      </div>
    </>
  )
}

export default App
