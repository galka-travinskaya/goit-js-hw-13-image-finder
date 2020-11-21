import './css/styles.css';
import imageListTpl from './templates/imageCard.hbs';
import HitsApiService from './js/Api/api-service';
import LoadMoreBtn from './js/loadMoreBtn';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

alert({
  text: 'Notice me, senpai!'
});

const refs ={
    searchForm: document.querySelector('.search-form'),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    galleryList: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
});
const hitsApiService = new HitsApiService();
console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    hitsApiService.query = e.currentTarget.elements.query.value;
    
    if(hitsApiService.query === '') {
        return alert('Введите корректное слово');
    }

    hitsApiService.resetPage();
    hitsApiService.fetchHits().then(hits => {
        calearHitsContainer();
        addHitsMarkup(hits);
    });
}

function onLoadMore(e) {
    hitsApiService.fetchHits().then(addHitsMarkup);
}

function addHitsMarkup(hits) {
    refs.galleryList.insertAdjacentHTML('beforeend', imageListTpl(hits));
}

function calearHitsContainer() {
 refs.galleryList.innerHTML = '';    
}

// Саши скрол 1
// function scrollTo(st) {
//     window.scrollTo(0,st - 40)
//   }
//   function onLoadMore(e) {
//     const st = window.pageYOffset + window.innerHeight;
//     if (!imagesApiServer.query) return;
  
//     imagesApiServer.incrementPage();
//     imagesApiServer.fetchGallery()
//       .then(renderImagesGallery)
//       .then(() => scrollTo(st))
//     .catch(error => console.log(error));
//   }
  