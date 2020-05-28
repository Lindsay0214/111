// import Item1 from '../../assets/images/item_.jpeg'
// import Item2 from '../../assets/images/item_1.jpeg'
// import Item3 from '../../assets/images/item_2.jpeg'
// import Item4 from '../../assets/images/item_3.jpeg'
// import Item5 from '../../assets/images/item_4.jpeg';
// import Item6 from '../../assets/images/item_.jpeg';
import * as types from '../actions/action-types/cart-actions';


const initState = {
    items: [
    //     {id:1, desc: "紫帽踢", price:110,img:Item1},
    //     {id:2, desc: "英倫風褲", price:80,img: Item2},
    //     {id:3, desc: "字母帽踢",price:120,img: Item3},
    //     {id:4, desc: "撞色踢", price:260,img:Item4},
    //     {id:5, desc: "咖啡吊帶褲", price:160,img: Item5},
    //     {id:6, desc: "紫帽踢",price:90,img: Item6}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === types.ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === types.REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== types.ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== types.SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== types.ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 60
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 60
        }
  }
    
  else{
    return state
    }
}

export default cartReducer;

