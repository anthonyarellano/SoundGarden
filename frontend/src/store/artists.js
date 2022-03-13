import { csrfFetch } from './csrf';

const GET_ARTISTS = 'artists/getArtists';

const loadArtists = (artists) => {
    return {
        type: GET_ARTISTS,
        artists
    };
};

export const searchArtists = (term) => async (dispatch) => {
    const urlTerm = term.replace(/\s/g, "-");
    const response = await csrfFetch(`/api/artists/${urlTerm}`);

    if (response.ok) {
        const res = await response.json();
        const { realArtists } = res;
        if (realArtists) {
            dispatch(loadArtists(realArtists));
            return realArtists;
        }
    }
};

export const getArtists = () => async (dispatch) => {
    const response = await csrfFetch('/api/artists');

    if (response.ok) {
        const artists = await response.json();
        const { realArtists } = artists;
        dispatch(loadArtists(realArtists));
        return artists;
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
