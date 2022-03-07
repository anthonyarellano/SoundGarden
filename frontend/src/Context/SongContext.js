import { createContext, useState, useContext } from 'react';

export const SongContext = createContext();

export const useSong = () => useContext(SongContext);

export const SongProvider = (props) => {
    const [currentSong, setCurrentSong] = useState(null);

    return (
        <SongContext.Provider
            value={{
                currentSong,
                setCurrentSong
            }}
            >
                {props.children}
            </SongContext.Provider>
    )
};
