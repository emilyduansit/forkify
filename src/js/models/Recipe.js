import axios from 'axios';


export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.image=res.data.recipe.image_url;
            this.publisher=res.data.recipe.publisher;
            this.title=res.data.recipe.title;
            this.ingredients=res.data.recipe.ingredients;
            this.url = res.data.recipe.source_url;

            console.log(res);

        }catch (error){
            alert(error);
        }
    }

    caltime(){
        const numItg = this.ingredients.length;
        const period = Math.ceil(numItg/3);
        this.time = period * 15;
    }

    calServer(){
        this.servering = 4 ;
    }

    parseIngredients(){

        const unitLong =['tablespoons','tablespoon','ounce','ounces','teaspoon','teaspoons','cups','cup','pounds','pound'];
        const unitShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','cup','pound','pound','tsps'];
        
     

        const newIngredients = this.ingredients.map(el =>{
            let ingredient = el;
            unitLong.forEach((unit,index) =>{
                ingredient = ingredient.replace(unit,unitShort[index]);
            } )

            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            const arringre = ingredient.split(' ');
            const unitindex = arringre.findIndex( el => unitShort.includes(el));

            let obj={};
            if(unitindex>-1){
                if(unitindex >1){                    
                    obj.count=eval(arringre.slice(0,unitindex).join('+'));
                    obj.unit = arringre[unitindex];
                    obj.ingredint = arringre.slice(unitindex+1).join(' ');                   

                }else{

                if(parseInt(arringre[0],10)){
                    obj.count = parseInt(arringre[0],10);
                    obj.unit = arringre[unitindex];
                    obj.ingredint = arringre.slice(unitindex+1).join(' ');
                }else{
                    obj.count = 1; 
                    obj.unit = '';                  
                    obj.ingredint = arringre.slice(0).join(' '); 
                }
            }


            }else{
                if(parseInt(arringre[0],10)){
                    obj.count = parseInt(arringre[0],10);   
                    obj.unit = '';                 
                    obj.ingredint = arringre.slice(1).join(' ');;
                }else{
                    obj.count = 1;         
                    obj.unit = '';          
                    obj.ingredint = arringre.slice(0).join(' ');;
                }
            }

            return obj;
            
        });

        this.ingredients = newIngredients;
        
    }

    updateRecipe(type){
        const newServering= type === 'dec' ? this.servering-1 : this.servering+1;

        this.ingredients.map( el =>{
            el.count = el.count *(newServering/this.servering);
        })

        this.servering = newServering;

    }
}