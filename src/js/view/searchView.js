import { element } from './base'

export const getSearchInput = () => {
    
    return element.searchField.value;
}

/**image_url: "http://forkify-api.herokuapp.com/images/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg"
publisher: "Closet Cooking"
publisher_url: "http://closetcooking.com"
recipe_id: "35169"
social_rank: 100
source_url: "http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html"
title: "Buffalo Chicken Chowder" */

const renderRec= (recipe) =>{
    
    const mark=`<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src=${recipe.image_url} alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
    element.searchResultList.insertAdjacentHTML('beforeend',mark);

}

export const clearInput = () =>{
    element.searchField.value='';
}

export const clearResults = ()=>{
    element.searchResultList.innerHTML = '';
}

export const renderResult = recipe =>{
    recipe.forEach(element => {
        renderRec(element);
    });
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};