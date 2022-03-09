import { csrfFetch } from './csrf';

const ADD_PLAYLIST = 'playlists/addPlaylist';
const GET_PLAYLISTS = 'playlists/getPlaylists';
const UPDATE_PLAYLIST = 'playlists/updatePlaylist';

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

const updatePlaylist = (playlist) => {
    return {
        type: UPDATE_PLAYLIST,
        playlist
    }
}

export const getPlaylists = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists/${userId}`);
    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadPlaylists(playlists));
        return playlists;
    }
}

export const addToPlaylist = (args) => async (dispatch) => {
    console.log(args);
    const response = await csrfFetch('/api/playlists', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({args})
    })
    if (response.ok) {
        const join = await response.json();
        return join;
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

export const removeFromPlaylist = (songId, playlistId) => async (dispatch) => {
    const data = { songId, playlistId };
    const response = await csrfFetch('/api/playlists/remove', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({data})
    });
    if (response.ok) {
        const playlist = await response.json();
        dispatch(updatePlaylist(playlist))
    }
};

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
        case UPDATE_PLAYLIST: {
            const newState = {...state};
            newState[action.playlist.id] = action.playlist;
            return newState;
        }
        default:
            return state;
    };
};

export default sessionReducer;
