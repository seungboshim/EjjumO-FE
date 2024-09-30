// SongItem.jsx
import styled from "styled-components";
import DeleteButtonSvg from "../assets/images/delete_button.svg?react";

const SongItemWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    width: 100%;
`
const SongItemContainer = styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 40px);
    text-decoration: none;
    color: white;
`
const Thumbnail = styled.img`
    width: 50px;
    height: 50px;
    background-color: gray;
    border-radius: 8px;
`
const SongInfo = styled.div`
    flex-direction: column;
    margin-left: 14px;
    width: calc(100% - 120px);
`;
const Title = styled.span`
    font-size: 16px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const SongDetail = styled.span`
    display: flex;
    flex-direction: row;
`
const Artist = styled.span`
    font-size: 14px;
    color: gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Duration = styled.span`
    font-size: 14px;
    color: gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Separator = styled.span`
    margin: 0 4px; // 양쪽에 8px 마진
`
const DeleteButton = styled(DeleteButtonSvg)`
    cursor: pointer;
    padding: 8px;
`

const SelectedSongItem = ({ title, artist, thumbnail, duration, onClick }) => {
    return (
        <SongItemWrapper>
            <SongItemContainer>
                <Thumbnail src={thumbnail}/>
                <SongInfo>
                    <Title> {title}</Title>
                    <SongDetail>
                        <Artist>{artist}</Artist>
                        <Separator>・</Separator>
                        <Duration>{duration}</Duration>
                    </SongDetail>
                </SongInfo>
            </SongItemContainer>
            <DeleteButton onClick={onClick} />
        </SongItemWrapper>
    );
};

export default SelectedSongItem;