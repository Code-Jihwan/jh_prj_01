//이미지 업로드 기능을 처리할 JavaScript 파일.

function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    //html에서 id가 fileInput 찾아서, fileInput 변수 할당
    //사용자가 이미지 파일을 선택하는 파일 업로드 필드.

    const imageContainer = document.getElementById('imageContainer');
    //html에서 id가 imageContainer 찾아서, imageContainer 변수 할당
    //업로드된 이미지를 화면에 표시하는 컨테이너.

    const resultContainer = document.getElementById('resultContainer');
    //html에서 id가 resultContainer 찾아서, resultContainer 변수 할당
    //번호판 인식 결과를 화면에 표시하는 컨테이너.


    // 파일이 선택되었는지 확인
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }
    //파일 선택 X, 파일이 없는경우 -> 경고메세지를 표기하고 함수 종료.

    // 선택된 파일 가져오기, file 변수에 할당
    const file = fileInput.files[0];

    // FileReader를 사용하여 이미지를 읽고 화면에 표시
    const reader = new FileReader();    //객체 생성

    //파일 읽기가 완료 되었을 떄 실행할 콜백 함수를 정의.
    //파일을 읽고 이미지 URL을 생성하고, 해당 URL을 사용하여 이미지 요소 생성, 화면표시
    reader.onload = function(event) {
        const imageUrl = event.target.result;
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(imageElement);
    };
    reader.readAsDataURL(file);
    //FileReader 객체를 사용하여 파일을 읽습니다.
    //이 경우에는 데이터 URL 형식으로 읽습니다.


    // 선택된 파일을 FormData로 만들어 서버에 전송
    const formData = new FormData(); //FormData 객체 생성.

    formData.append('image', file);
    //FormData에 선택된 파일 추가, image 라는 이름으로 추가.

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
    
    //에러 발생시, 에러 메세지를 콘솔에 출력
    .catch(error => {
        console.error('Error:', error);
    });
}
