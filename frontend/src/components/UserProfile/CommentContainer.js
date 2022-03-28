import { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import './style/commentContainer.css';

const CommentContainer = () => {
    const [comment, setComment] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let errors = [];
        if (hasSubmitted) {
            if (comment.length === 0) errors.push('Please enter a value for comment.')
        }
        setErrors(errors);
    }, [comment, hasSubmitted])

    const handleSubmit = () => {
        setHasSubmitted(true);

    };

    return (
        <div className='comment-container'>
            {errors && errors.map((error) => (
                <p key={error}>{error}</p>
            ))}
            <div
                className='comment-input-container'
            >
                <textarea
                    rows={5}
                    cols={50}
                    style={{resize: "None",
                            fontFamily: "Interstate Light Cond",
                            margin: "0px",
                            padding: "0px"}}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div
                    style={{border: "1px solid #F5F5F5",
                            margin: "0px",
                            cursor: "pointer"}}
                    onClick={handleSubmit}>
                    Submit
                </div>
            </div>
            <h1>Comment Container!</h1>
            <CommentCard />
        </div>
    )
};

export default CommentContainer;
