import { createContext, useState, useContext } from 'react';

export const PlaylistContext = createContext();

export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = (props) => {
    const [currentPlaylist, setCurrentPlaylist] = useState(null);

    return (
        <PlaylistContext.Provider
            value={{
                currentPlaylist,
                setCurrentPlaylist
            }}
            >
                {props.children}
            </PlaylistContext.Provider>
    )
};
