const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// 위 코드는 루트 URL('/')에 대한 GET 요청이 오면 
// 'Hello World!'를 응답하는 간단한 Express.js 서버를 만듭니다.