const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19136435-96f0ae3906c94a349fe1f1440';

export default class apiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.renderedImg = 0;
    }

    fetchHits() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=12&page=${this.page}`;

        return fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.incrementPage();

                return data;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
        this.renderedImg = 0;
    }

    // Если убрать get и set, тогда везьде обращаемся только к searchQuery, a не query 
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}