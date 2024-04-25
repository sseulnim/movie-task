// API 요청을 보낼 URL
const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

// API 요청에 사용될 옵션
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTE1ZGI5NjFjY2UyZDQ1YjM1N2Y1MDdmOGExMDEwYSIsInN1YiI6IjY2Mjc2ZTRkY2I2ZGI1MDE2M2FmOGRlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AumeVPf1je9qpW9jXrLZ-5ZzGR32is2q861ifuW91cY'
  }
};

// 영화 카드를 클릭했을 때 실행될 함수
const showMovieId = (movieId) => {
  alert(`영화 ID: ${movieId}`);
};

// 영화 정보를 가져와서 화면에 표시하는 함수
const fetchAndDisplayMovies = () => {
  // API 요청 보내기
  fetch(apiUrl, options)
    .then(response => response.json())
    .then(data => {
      // 영화 정보 배열
      const movies = data.results;

      // 영화 정보 카드 리스트 업데이트
      updateMovieList(movies);
    })
    .catch(err => console.error(err));
};

// 영화 정보 카드 리스트 업데이트하는 함수
const updateMovieList = (movies) => {
  // 영화 정보 카드 리스트 요소
  const container = document.querySelector('.container');
  container.innerHTML = ''; // 기존 내용 초기화

  // 입력된 영화 제목
  const inputText = document.querySelector('input').value.toLowerCase();

  // 입력된 영화 제목을 포함하는 영화들만 필터링
  const filteredMovies = movies.filter(movie => {
    const titleMatch = movie.title.toLowerCase().includes(inputText); // 제목 일치 여부
    const overviewMatch = movie.overview.toLowerCase().includes(inputText); // 요약 일치 여부
    return titleMatch || overviewMatch; // 제목 또는 요약이 일치하는 경우 필터링
  });

  // 필터링된 영화들을 화면에 표시
  filteredMovies.forEach(movie => {
    // 영화 카드 생성
    const card = document.createElement('div');
    card.classList.add('card');

    // 영화 정보 채우기
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>${movie.overview}</p>
      <p>평점: ${movie.vote_average}</p>
    `;

    // 카드를 클릭했을 때 영화 ID를 alert로 표시
    card.addEventListener('click', () => {
      showMovieId(movie.id);
    });

    // 카드를 컨테이너에 추가
    container.appendChild(card);
  });
};

// 검색 버튼 클릭 이벤트 리스너 추가
document.querySelector('button').addEventListener('click', () => {
  fetchAndDisplayMovies();
});

// 페이지 로드 시 초기 영화 정보 가져오기
fetchAndDisplayMovies();
