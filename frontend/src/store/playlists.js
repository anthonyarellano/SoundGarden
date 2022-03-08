import { csrfFetch } from './csrf';

const ADD_PLAYLIST = 'playlists/addPlaylist'
const GET_PLAYLISTS = 'playlists/getPlaylists'

const addPlaylist = (playlist) => {
    return {
        type: ADD_PLAYLIST,
        playlist
    }
};

const loadPlaylists = (playlists) => {
    return {
        type: GET_PLAYLISTS,
        playlists
    }
};

export const getPlaylists = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists/${userId}`);
    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadPlaylists(playlists));
        return playlists; 
    }
}


export const createPlaylist = (playlist) => async (dispatch) => {
    const response = await csrfFetch('/api/playlists', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({playlist})
    });
    if (response.ok) {
        const playlist = await response.json();
        dispatch(addPlaylist(playlist));
        return playlist;
    }
}

const initialState = { playlists: null }

const sessionReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PLAYLIST: {
            const newState = {...state};
            newState[action.playlist.id] = action.playlist;
            return newState;
        }
        case GET_PLAYLISTS: {
            const newState = {};
            action.playlists.forEach((playlist) => (newState[playlist.id] = playlist));
            return newState;
        }
        default:
            return state;
    };
};

export default sessionReducer;
