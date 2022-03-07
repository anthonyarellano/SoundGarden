import { csrfFetch } from './csrf';

const GET_SONGS = 'songs/getSongs'


const loadSongs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    };
};

export const getSongs = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${userId}`);
    const data = await response.json();
    console.log(data);
    return; 
};
