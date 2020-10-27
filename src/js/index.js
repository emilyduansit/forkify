import Search from './models/Search'
import Recipe from './models/Recipe'
import List   from './models/List'
import {element, clearLoader, renderLoader} from './view/base'
import * as searchView from './view/searchView'
import * as recipeView from './view/recipeView'
import * as listView from './view/listView'
const state = {};

const controlSearch = async ()=>{
    const query =searchView.getSearchInput();
    console.log(query);

    if(query){
        state.search = new Search(query);

        searchView.clearInput();
        searchView.clearResults();

        await state.search.getResults();      

        searchView.renderResult(state.search.result);


    }
}

element.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
})

const controlList= ()=>{

    if( !state.List) state.List = new List();

    state.recipe.ingredients.forEach( el => {
        const item = state.List.addItem(el.count,el.unit, el.ingredint);

        listView.renderList(item);
    })


};


const controlRecipe= async ()=>{
    const id = window.location.hash.replace("#","");
    console.log(id);

    if(state.searchView) state.searchView.highlightSelected(id);
  

    if(id){

        recipeView.cleanRecipe();
        renderLoader(element.recipe);

        try{
            state.recipe = new Recipe(id);        
          

            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            state.recipe.caltime();
            state.recipe.calServer();


            console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        }catch (error){
            alert(error);
        }


    }
}

//window.addEventListener('hashchange',controlRecipe);
['hashchange','load'].forEach(element => window.addEventListener(element,controlRecipe));

element.recipe.addEventListener('click', e=>{

  

    if (e.target.matches('.btn-decrease, .btn-decrease *')){
       
        state.recipe.updateRecipe('dec');
    }else{ 
        if(e.target.matches('.btn-increase, .btn-increase *')){
           
            state.recipe.updateRecipe('inc');
        }else if(e.target.matches('.recipe__btn-add, .recipe__btn-add *')){
            controlList();
        }
    }

    recipeView.updateRecipe(state.recipe);

   
});

element.shopping_list.addEventListener('click', e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        listView.deleteItem(id);
        state.List.deleteItem(id);
    }
})

