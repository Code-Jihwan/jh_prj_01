const express = require('express');
const cv = require('opencv4nodejs');
const path = require('path');
// 추가된 모듈
const fs = require('fs');
const Tesseract = require('tesseract.js'); // Tesseract 모듈 import 추가

const app = express();
const port = 3000;

// Haar Cascade 파일 경로
const cascadePath = path.resolve(__dirname, 'haarcascade_russian_plate_number.xml');

// Haar Cascade 분류기 로드
const plateCascade = new cv.CascadeClassifier(cascadePath);

// 이미지 처리 및 번호판 인식 라우트 핸들러
app.post('/recognizePlate', (req, res) => {
    const imageData = req.body.imageData; // 클라이언트에서 전송된 이미지 데이터

    // 이미지 로드
    const img = cv.imdecode(Buffer.from(imageData, 'base64'));

    // 이미지 전처리
    const processedImage = convertToGrayscale(img);

    // 번호판 영역 탐지
    const plateRegions = detectPlateRegions(processedImage);

    // 번호판 영역 추출
    const plates = extractPlateRegions(processedImage, plateRegions);

    // 번호판 인식 및 텍스트 추출
    const recognizedTexts = [];
    plates.forEach(plate => {
        const text = recognizeText(plate);
        recognizedTexts.push(text);
    });

    // 클라이언트에게 결과 반환
    res.status(200).json({ recognizedTexts: recognizedTexts });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// 이미지 전처리 함수
function convertToGrayscale(image) {
    return cv.cvtColor(image, cv.COLOR_BGR2GRAY);
}

// 번호판 영역 탐지 함수
function detectPlateRegions(image) {
    return plateCascade.detectMultiScale(image);
}

// 번호판 영역 추출 함수
function extractPlateRegions(image, plateRegions) {
    const extractedPlates = [];
    plateRegions.forEach(region => {
        const { x, y, width, height } = region;
        const plateRegion = image.getRegion(new cv.Rect(x, y, width, height));
        extractedPlates.push(plateRegion);
    });
    return extractedPlates;
}

// 번호판에서 문자 인식 함수
async function recognizeText(plateImage) {
    return new Promise((resolve, reject) => {
        // 임시 파일 저장
        cv.imwrite('plate.jpg', plateImage);
        // Tesseract 모듈을 사용하여 문자 인식
        Tesseract.recognize('plate.jpg', 'eng', { logger: m => console.log(m) })
            .then(({ data: { text } }) => resolve(text))
            .catch(error => reject(error))
            .finally(() => fs.unlinkSync('plate.jpg')); // 임시 파일 삭제
    });
}
