import CommentCard from './CommentCard';
import './style/commentContainer.css';

const CommentContainer = () => {
    return (
        <div className='comment-container'>
            <div
                className='comment-input-container'
                >
                <textarea
                    rows={5}
                    cols={50}
                    style={{resize: "None"}}
                />
            </div>
            <h1>Comment Container!</h1>
            <CommentCard />
        </div>
    )
};

export default CommentContainer;
