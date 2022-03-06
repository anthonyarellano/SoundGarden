import { useState } from 'react';
import AWS from 'aws-sdk'
import './style/upload-page.css';

export const UploadPage = () => {
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

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (file) => {
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
                url: Location,
                awsKey: key
              }
              console.log(song);
              setProgress(0);
              setSelectedFile(null);
            }
          })
        return;
      }
    }
    alert('File type not supported')
    return;
  }


  return (
    <div className='upload-page-container'>
      <div> Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <input type="text" />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
  )

};
