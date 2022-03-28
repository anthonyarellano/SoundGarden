import { useState } from 'react';
import CommentCard from './CommentCard';
import './style/commentContainer.css';

const CommentContainer = () => {
    const [comment, setComment] = useState("");

    return (
        <div className='comment-container'>
            <div
                className='comment-input-container'
                >
                <textarea
                    rows={5}
                    cols={50}
                    style={{resize: "None"}}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <h1>Comment Container!</h1>
            <CommentCard />
        </div>
    )
};

export default CommentContainer;
