import { csrfFetch } from './csrf';

const GET_ARTISTS = 'artists/getArtists';

const loadArtists = (artists) => {
    return {
        type: GET_ARTISTS,
        artists
    };
};

export const getArtists = () => async (dispatch) => {
    const response = await csrfFetch('/api/artists');

    if (response.ok) {
        const artists = await response.json();
        console.log(artists);
    }
};

const initialState = { artists: null };

const sessionReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ARTISTS: {
            const newState = {};
            action.artists.forEach((artist) => (newState[artist.id] = artist));
            return newState;
        }
        default:
            return state;
    }
}

export default sessionReducer;
