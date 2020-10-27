import a from 'axios';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){   
        try{
               const res = await a(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
                this.result = res.data.recipes;
               //console.log(recipes); 
               //return result;
                
        }catch (err){
            alert(err);
        }
    
    } 
}