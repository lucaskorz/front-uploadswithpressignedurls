import { useState } from 'react';
import MultipartUploads from './components/MultipartUploads';
import UploadByPresignedURLs from './components/UploadByPresignedURLs';

function App() {
  const [uploadBy] = useState<'multipart' | 'presigned'>('multipart')

  return (
    <>
      {uploadBy === 'multipart' && <MultipartUploads />}
      {uploadBy === 'presigned' && <UploadByPresignedURLs />}
    </>
  )
}


export default App
