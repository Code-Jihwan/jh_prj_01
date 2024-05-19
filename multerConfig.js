const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// 이미지를 저장할 폴더 설정
const uploadDir = path.join(__dirname, 'uploads');

// multer 설정
const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 5 * 1024 * 1024 // 최대 파일 크기: 5MB
  }
});

// 이미지 업로드를 처리할 POST 엔드포인트
app.post('/upload', upload.single('image'), (req, res) => {
  // 업로드된 파일 정보는 req.file 객체에 저장됩니다.
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // 업로드된 파일 경로를 클라이언트에 응답합니다.
  res.status(200).json({ imagePath: req.file.path });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



//위 코드에서 /upload 엔드포인트는 POST 요청을 수신하고, 업로드된 이미지를 처리합니다. 
//upload.single('image') 메서드는 하나의 파일을 업로드하고, 이를 req.file 객체에 저장합니다. 
//이후 업로드된 파일의 경로를 클라이언트에 응답으로 전달합니다.