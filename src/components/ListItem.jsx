// ListItem.jsx
import React from "react";
import styled from "styled-components";
import ThumbsUpSvg from "../assets/images/thumb_up.svg?react";
import { useNavigate } from "react-router-dom";

const ListItemContainer = styled.div`
    display: flex;
    margin-bottom: 8px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    cursor: pointer;
    width: 100px;
`
const Thumbnail = styled.img`
    width: 100px;
    height: 100px;
    background-color: gray;
    margin-top: 16px;
`
const PlaylistName = styled.span`
    font-size: 16px;
    color: white;
    margin-top: 16px;
    text-align: center;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const Thumbs = styled.span`
    font-size: 16px;
    color: white;
    margin-left: 8px;
`
const ThumbsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`
const ListItem = ({ playlistId, thumbnail, playlistName, thumbs }) => {
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate(`/playlist/${playlistId}`);
    };

    return (
        <ListItemContainer onClick={handleItemClick}>
            <Thumbnail src={thumbnail} />
            <PlaylistName>{playlistName}</PlaylistName>
            <ThumbsContainer>
                <ThumbsUpSvg />
                <Thumbs>{thumbs}</Thumbs>
            </ThumbsContainer>
        </ListItemContainer>
    );
};

export default ListItem;