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
   const { user } = data;
   console.log(user.Songs);
    dispatch(loadSongs(user.Songs));
    return data;
};

const initialState = { songs: null };

const sessionReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SONGS: {
            const newState = {};
            action.songs.forEach((song) => (newState[song.id] = song));
            return newState;
        }
        default:
            return state;
    }
}

export default sessionReducer;
