//이미지 업로드 기능을 처리할 JavaScript 파일.

function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const imageContainer = document.getElementById('imageContainer');
    const resultContainer = document.getElementById('resultContainer');

    // 파일이 선택되었는지 확인
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    // 선택된 파일 가져오기
    const file = fileInput.files[0];

    // FileReader를 사용하여 이미지를 읽고 화면에 표시
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(imageElement);
    };
    reader.readAsDataURL(file);

    // 선택된 파일을 FormData로 만들어 서버에 전송
    const formData = new FormData();
    formData.append('image', file);

    // 서버로 전송하고 결과 받아오기 (이 부분은 서버와의 통신이 필요하므로 예시로만 작성합니다.)
    fetch('/recognize', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // 서버에서 받은 결과를 화면에 표시
        resultContainer.innerText = data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
