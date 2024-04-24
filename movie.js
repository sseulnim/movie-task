const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTE1ZGI5NjFjY2UyZDQ1YjM1N2Y1MDdmOGExMDEwYSIsInN1YiI6IjY2Mjc2ZTRkY2I2ZGI1MDE2M2FmOGRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AumeVPf1je9qpW9jXrLZ-5ZzGR32is2q861ifuW91cY'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

    alert(`영화id: ${영화id}`)

    // 검색 구현
    // 1. 영화카드리스트 선택하기
    // ~~~ 코딩
    // 2. 입력값에 따라서 포함여부 확인
   
    // 2. 영화카드리스트 클릭하면 영화상세페이지로 이동
    // 3. 영화상세페이지에서 영화정보 출력