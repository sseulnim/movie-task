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

// 영화 정보를 가져와서 화면에 표시하는 함수
const fetchMovies = async () => {
    try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        const movies = data.results;
        const inputText = document.querySelector('#searchInput').value.toLowerCase();

        movieList(movies, inputText);
    } catch (error) {
        console.error(error);
    }
};

// 영화 정보 카드 리스트 업데이트하는 함수
const movieList = (movies, inputText) => {
    const container = document.querySelector('#movieContainer');
    container.innerHTML = ''; 

    // 필터링된 영화들을 화면에 표시
    movies.forEach(movie => {
        const titleMatch = movie.title.toLowerCase().includes(inputText);

        if (titleMatch) {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
                <p>Rating : ${movie.vote_average}</p>
            `;

            // 카드를 클릭했을 때 영화 ID를 알림창으로 표시
            card.addEventListener('click', () => {
                alert(`영화 ID: ${movie.id}`);
            });

            container.appendChild(card);
        }
    });
};

// 검색 폼에 이벤트 리스너 추가
document.querySelector('#searchForm').addEventListener('submit', (e) => {
    e.preventDefault(); 
    fetchMovies();
});

// 검색어 입력란에서 Enter 키 입력 이벤트 리스너 추가
document.querySelector('#searchInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        fetchMovies();
    }
});

fetchMovies();
