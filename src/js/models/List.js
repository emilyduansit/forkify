

export default class List {
    constructor (){
        this.items = [];
    }

    addItem(count,unit,ingredients){
        const item={
            id:Math.random().toString(36).substring(2, 8),
            count:count,
            unit:unit,
            ingredients:ingredients
        }

        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index= this.items.findIndex( el => el.id.localeCompare(id) === 0 ); 
        
        this.items.splice(index,1);

    }

    updateItem(id,newcount){
        this.items.find(el => el.id.localeCompare(id) === 0 ).count = newcount;
    }
}