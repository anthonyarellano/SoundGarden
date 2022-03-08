import { csrfFetch } from './csrf';

const GET_SONGS = 'songs/getSongs'
const ADD_SONG = 'songs/addSong'
const UPDATE_SONG = 'songs/updateSong'
const DELETE_SONG = 'songs/deleteSong'

const loadSongs = (songs) => {
    return {
        type: GET_SONGS,
        songs
    };
};

const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
};

const updateSong = (song) => {
    return {
        type: UPDATE_SONG,
        song
    }
};

const removeSong = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
};

export const putSong = (song) => async (dispatch) => {
    const response = await csrfFetch('/api/songs', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({song})
    });
    if (response.ok) {
        const song = await response.json();
        dispatch(updateSong(song.dbSong));
        return song;
    }
};

export const getSongs = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${userId}`);
    const data = await response.json();
   const { user } = data;
   console.log(user.Songs);
    dispatch(loadSongs(user.Songs));
    return data;
};

export const uploadSong = (song) => async (dispatch) => {
    const response = await csrfFetch('/api/songs', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({song})
    });
    if (response.ok) {
        const song = await response.json();
        // console.log(song.createdSong);
        dispatch(addSong(song.createdSong));
        return song.createdSong;
        // dispatch(getSongs(song.userId));
    }
};

export const deleteSong = (songId) => async (dispatch) => {
    const response = await csrfFetch('/api/songs', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({songId})
    });
    if(response.ok) {
        dispatch(removeSong(songId));
        return;
    }
};

const initialState = { songs: null };

const sessionReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_SONGS: {
            const newState = {};
            action.songs.forEach((song) => (newState[song.id] = song));
            return newState;
        }
        case ADD_SONG: {
            const newState = {...state};
            newState[action.song.id] = action.song;
            return newState;
        }
        case UPDATE_SONG: {
            const newState = {...state};
            newState[action.song.id] = action.song;
            return newState;
        }
        case DELETE_SONG: {
            const newState = {...state};
            delete newState[action.songId];
            return newState;
        }
        default:
            return state;
    }
}

export default sessionReducer;
