import ReactPlayer from 'react-player'

interface VideoPlayerProps {
    play: boolean
}


export const VideoPlayer = ({play}: VideoPlayerProps) => {
    return (
        <>
            <ReactPlayer playing={play} url="https://www.youtube.com/watch?v=Eu_DeFKc0oc"></ReactPlayer>
        </>
    )
}