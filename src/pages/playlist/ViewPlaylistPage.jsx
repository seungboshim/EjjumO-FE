// ViewPlaylistPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongItem from "../../components/SongItem";
import PlaylistItem from "../../components/PlaylistItem";
import styled from "styled-components";
import { getPlaylistById, updatePlaylistThumbs } from "../../apis/playlist";
import { googleLogin } from "../../apis/auth";
import { getGoogleToken } from "../../utils/token";
import { addSongToPlaylist, createYoutubePlaylist } from "../../apis/provider";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const PlayListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 16px;
`

const ViewPlaylistPage = () => {
    const {playlistId} = useParams();
    const [playlistData, setPlaylistData] = useState({
      "playlist": {},
      "songs": []
    });

    useEffect(() => {
      getPlaylistById({playlistId: playlistId, setData: setPlaylistData});
    }, [playlistId]);

    const handleThumbsup = async () => {
      const response = await updatePlaylistThumbs({
        playlistId: playlistId,
        userId: 3
      });
      console.log(response)
      setPlaylistData(prev => ({
        ...prev,
        playlist: {
          ...prev.playlist,
          isThumbsup: response.isThumbsUp,
          thumbs: response.thumbs
        }
      }))
    }
    
    const handlePlayClick = async () => {
      const googleAccessToken = getGoogleToken();
      if (googleAccessToken) {
        const response = await createYoutubePlaylist({
          googleAccessToken: googleAccessToken,
          playlistData: {
              playlistName: playlistData.playlist.playlistName,
              description: playlistData.playlist.description
          }
        })

        const youtubePlaylistId = response.id;

        for (const song of playlistData.songs) {
          await addSongToPlaylist({
            googleAccessToken: googleAccessToken,
            youtubePlaylistId: youtubePlaylistId,
            videoId: song.videoId
          })
        }

        const playlistUrl = `https://www.youtube.com/playlist?list=${youtubePlaylistId}`;
        window.location.href = playlistUrl;
      } else {
          googleLogin();
      }
  }

    return (
        <Wrapper>
          {playlistData && (
            <>
              <PlayListWrapper>
                <PlaylistItem
                  playlistId={playlistData.playlist.playlistId}
                  userName={playlistData.playlist.userName}
                  playlistName={playlistData.playlist.playlistName}
                  description={playlistData.playlist.description}
                  thumbs={playlistData.playlist.thumbs}
                  isThumbsup={playlistData.playlist.isThumbsup}
                  comments={playlistData.playlist.comments}
                  thumbnail={playlistData.playlist.thumbnail}
                  comment={false}
                  handleThumbsClick={handleThumbsup}
                  handlePlayClick={handlePlayClick}
                />
              </PlayListWrapper>
              <SongContainer>
                {playlistData.songs.map((item) => (
                  <SongItem 
                    key={item.songId}
                    title={item.title}
                    artist={item.artist}
                    duration={item.duration}
                    thumbnail={item.thumbnail}
                    videoId={item.videoId}
                  />
                ))}
              </SongContainer>
            </>
          )}
        </Wrapper>
    );
  };
  
export default ViewPlaylistPage;