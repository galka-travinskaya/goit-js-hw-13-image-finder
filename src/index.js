import './css/styles.css';
import imageListTpl from './templates/imageList.hbs';
import HitsApiService from './js/Api/apiService';
import infiniteScroll from 'infinite-scroll';
import LoadMoreBtn from './js/loadMoreBtn';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

var debounce = require('lodash.debounce');

const refs ={
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery'),
    input: document.querySelector('.search-input'),
    sentinel: document.querySelector('#sentinel'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

refs.input.addEventListener('input', debounce(onSearch, 500));
// loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.galleryList.addEventListener('click', onGalleryElClick); 

function onSearch(e) {
    e.preventDefault();

    hitsApiService.query = e.target.value.trim();
    if(hitsApiService.query.length === 0) {
        return clearHitsContainer();
    }
    // Прячем кнопку
    // loadMoreBtn.show();
    hitsApiService.resetPage();
    clearHitsContainer();
    onLoadMore(); 
}

function onLoadMore() {
    loadMoreBtn.disable();
    hitsApiService.fetchHits().then(hits => {
        addHitsMarkup(hits);
        // scrollPage();
        loadMoreBtn.enable();
    });
}

function addHitsMarkup(hits) {
    refs.galleryList.insertAdjacentHTML('beforeend', imageListTpl(hits));
}

function clearHitsContainer() {
 refs.galleryList.innerHTML = '';    
}

// function scrollPage() {
//       try {
//         setTimeout(() => {
//           window.scrollTo({
//             top: document.body.scrollHeight,
//             left: 0,
//             behavior: 'smooth',
//           });
//         }, 1000);
//       } catch (error) {
//         console.log(error);
//       }
//     }

    const hitsApiService = new HitsApiService();

    const onEntry = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && hitsApiService.query !== '') {
                console.log("LOADING...");
                hitsApiService.fetchHits().then(hits => {
                    addHitsMarkup(hits);
                    hitsApiService.incrementPage();
                });
            }
        });
    }
    const options = {
        rootMargin: '100px'
    }
    const observer = new IntersectionObserver(onEntry, options);
    observer.observe(refs.sentinel);

function onGalleryElClick(event) {
        if (event.target.nodeName !== 'IMG') {
          return;
        }
        
        const changeModalImage = `<img src=${event.target.dataset.source} alt="icon" />`;
        const instance = basicLightbox.create(changeModalImage);
        instance.show();
 }