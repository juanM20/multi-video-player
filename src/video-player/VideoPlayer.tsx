import ReactPlayer from 'react-player'

interface VideoPlayerProps {
    play: boolean
    playBackRate: number
}


export const VideoPlayer = ({play, playBackRate}: VideoPlayerProps) => {
    return (
        <>
            <ReactPlayer playing={play} playbackRate={playBackRate} url="https://www.youtube.com/watch?v=Eu_DeFKc0oc"></ReactPlayer>
        </>
    )
}