import { useState, useEffect, useRef } from 'react';
import AWS from 'aws-sdk'
import './style/upload-page.css';
import { useSelector, useDispatch } from 'react-redux';
import { uploadSong, getSongs } from '../../store/songs';
import { useHistory, Redirect } from 'react-router-dom';
import { colors, codes } from '../../Data/data.js';

export const UploadPage = ({setAllActive}) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g
  const history = useHistory();
  const dispatch = useDispatch();
  const fileRef = useRef();

  const S3_BUCKET = process.env.REACT_APP_BUCKET;
  const REGION = process.env.REACT_APP_REGION;

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  })


  useEffect(() => {
    const errors = [];
    if (!title) errors.push('Please provide a value for Song Title.');
    if (!imgUrl) errors.push('Please provide a value for Cover Art URL.');
    if (!selectedFile) errors.push('Please select a song to upload.')
    if (selectedFile) {
      if (selectedFile.type !== "audio/wav" && selectedFile.type !== "audio/mpeg") {
        errors.push('Unsupported file type.')
      };
    };
    if (imgUrl) {
      if (!imgUrl.match(urlRegex)) errors.push('Please provide a valid URL.');
    };
    setErrors(errors);
  }, [title, imgUrl]);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (file) => {
    setHasSubmitted(true);
    if (errors.length === 0) {

      if (file) {
        if (file.type === "audio/wav" || file.type === "audio/mpeg") {
          const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
          };
          myBucket.upload(params)
            .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err, data) => {
              if (err) return console.log(err);
              if (data) {
                const { Location, key } = data;
                const song = {
                  userId: sessionUser.id,
                  title: title,
                  url: Location,
                  imgUrl: imgUrl
                };
                dispatch(uploadSong(song));
                dispatch(getSongs(sessionUser.id))
                setProgress(0);
                setSelectedFile(null);
                setHasSubmitted(false); 
                if (setAllActive) {
                  setAllActive('all')
                }
                return history.push(`/users/${sessionUser.id}`)
              };
            });
        };
      };
      return;
    };
    return;
  };

  if (!sessionUser) {
    return <Redirect to="/login" />
  }

  return (
    <div
      className='upload-page-container'
      style={{
        backgroundColor: colors[progress % colors.length],
        transition: 'background-color .4s'
      }}>
      {!sessionUser &&
        <Redirect to="/signup" />}
      {hasSubmitted &&
        errors?.map((error) => (
          <p
            key={error}
            style={{margin: "0px", marginBottom: "5px", marginTop: "5px"}}>
            {error}
          </p>
        ))}
      <div>{progress}%</div>
      <div>
        <div
          className='upload-page-upload-button'
          onClick={() => fileRef.current.click()}>
          Select Song File
        </div>
        <p>{selectedFile?.name}</p>
        <input
          ref={fileRef}
          className="fileInput"
          type="file"
          onChange={handleFileInput}
          hidden
        />
      </div>
      <label htmlFor="title">Song Title</label>
      <input
        type="text"
        name="title"
        className='upload-page-text-input'
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="imgUrl">Cover Art URL</label>
      <input
        type="text"
        name="imgUrl"
        className='upload-page-text-input'
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <div
        className='upload-page-upload-button'
        onClick={() => uploadFile(selectedFile)}
      >
      Upload Song
      </div>
    </div>
  )

};
