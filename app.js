

// Storage controller


const StorageCtrl = (function (){
 
// Public methods
  return{

    storeItemInLocalStorage : function (item){
     
      let items;

      if(localStorage.getItem('items') === null){
      
      items = [];

      }else{
        items = JSON.parse(localStorage.getItem('items'));
      }
      
      items.push(item);
      
      localStorage.setItem('items', JSON.stringify( items));
    },

    getItemsFromLocalStorage : function (){
      let items;

      if(localStorage.getItem('items') === null){
      
        items = [];
  
      }else{
        items = JSON.parse(localStorage.getItem('items'));
      }  

      return items;

    },

    updateItemInLocalStorage : function (item){

        

        const itemsLocalStorage =JSON.parse( localStorage.getItem('items'));
        const currentItem = ItemCtrl.logData().currentItem;

        
      
        const ids = itemsLocalStorage.map(function(item){
          return item.id
        });

       
        const currItemIndex = ids.indexOf(currentItem.id);

       

        itemsLocalStorage.splice(currItemIndex, 1, currentItem);

        localStorage.setItem('items', JSON.stringify( itemsLocalStorage));

    },

    deleteItemFromLocalStorage : function (){
      

       const itemsLocalStorage =JSON.parse( localStorage.getItem('items'));
       const currentItem = ItemCtrl.logData().currentItem;

       const ids = itemsLocalStorage.map(function(item){
        return item.id
      });

       const currItemIndex = ids.indexOf(currentItem.id);

       itemsLocalStorage.splice(currItemIndex, 1);

       localStorage.setItem('items', JSON.stringify( itemsLocalStorage));

    },

    clearAllFromLocalStorage : function(){
        console.log(' All as been cleared')
        localStorage.removeItem('items')
    }

  }
})();



// Item controller

const ItemCtrl = function(){

  // Item constructor
  const item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;

  }

  // Data strcutre/state

  const data = {
    // items : [
    //   {id : 0, name:'egg', calories:155 },
    //   {id : 1, name:'milk', calories:42 },
    //   {id : 2, name:'banana', calories:89 }
    // ],
    items : StorageCtrl.getItemsFromLocalStorage(),
    currentItem : null,
    totalCalories : 0 
  }
  

  // Public methods

  return{
    addInputItemToState : function (name, calories) {
       
        // Convert calories string to number
        calories = parseInt(calories)

        // Generate ID
        let ID;
        if(data.items.length > 0){
          ID = data.items[data.items.length -1].id +1 
        }else{
          ID = 0;
        }
           
        // Create new item
        const newItem = new item(ID, name, calories);

        // push new item into array
        data.items.push(newItem);

        return newItem;
      
       
    },
    getItemsInState : function(){
      return data.items;
    },

    getTotalCalories : function(){
      let calories = 0;

      data.items.forEach(function (item){
       
      calories += item.calories;

      

      })

      data.totalCalories = calories

      return data.totalCalories;
    },

    setCurrentItem : function (id){
       
          id = parseInt(id);

          let found ;
                 
          data.items.forEach(function(item){
        
            if(item.id == id){
              found = item;
            }
          })

         data.currentItem = found;
      return data.currentItem;

    },

    UpdateItemInState : function(input){
        
      let found;

      
      data.items.forEach(function(item){
          if(item.id === data.currentItem.id){
            item.name = input.name;

            calories = parseInt(input.calories)
            item.calories = calories;
            found = item;
          }
      
      })
      return found;
   
    },

    deleteItemFromState : function (){
   
      // Get ids in new array using map 
      const ids = data.items.map(function (item){
                    return  item.id
                })

      //Get index of current item using id
       const indexOfCurrentItem =  ids.indexOf(data.currentItem.id)
       
      // Remove current item from array using its index via splice 
      data.items.splice(indexOfCurrentItem, 1)
      

      return data.currentItem
    },

    clearAllInState : function(){
      data.items = [];

    },

    logData : function(){
      return data;
    }
  }

}();































// UI controller

const UICtrl = (function (){

  const UISelectors = {
    addBtn : '.add-btn',
    itemName : '#item-name',
    itemCalories : '#item-calories',
    backBtn : '.back-btn',
    clearAllBtn : '.clear-btn ',
    itemList : '#item-list',
    totalCalories : '.total-calories',
    updateBtn : '.update-btn',
    deleteBtn : '.delete-btn',
    listItems : '#item-list li'
  }

  // Public methods

  return{

  getItemInput : function (){

    return{
      name : document.querySelector(UISelectors.itemName).value,
      calories : document.querySelector(UISelectors.itemCalories).value
    }
   
  },

  populateList : function(items){
       
  
    items.forEach(function(item){

      // Create li
      const li = document.createElement('li');

      // Add class
        li.className = "collection-item";
        
      // Add Id
        li.id = `item-${item.id}`;

      // Add inner html content to li

      li.innerHTML = `
           <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
           <a href="#" class="secondary-content">
           <i class="fa fa-pencil"></i>
           </a>

      `
      // Apoend lis to ul

      document.querySelector(UISelectors.itemList).appendChild(li);

      // get total calories 

      document.querySelector(UISelectors.totalCalories).textContent = ItemCtrl.getTotalCalories();



      // <li class="collection-item" id="item-0">
      //   <strong>Eggs: </strong> <em>300 Calories</em>
      //   <a href="#" class="secondary-content">
      //     <i class="fa fa-pencil"></i>
      //   </a>
      // </li>
      

    })

  },

  addItemsToUIList : function(item){

     // Create li
     const li = document.createElement('li');

     // Add class
       li.className = "collection-item";
       
     // Add Id
       li.id = `item-${item.id}`;

    
       li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="fa fa-pencil"></i>
            </a>

        `

       // Apoend li to ul

      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li); 
    
  },

  clearInputFields : function (){
    document.querySelector(UISelectors.itemName).value = '';
    document.querySelector(UISelectors.itemCalories).value = '';
  },

  displayTotalCaloriesInUI : function(totalCalories){

    document.querySelector(UISelectors.totalCalories).textContent = `${totalCalories}`;
    

  },

  clearEditState : function (){
    this.clearInputFields();   
    document.querySelector(UISelectors.addBtn).style.display = 'inline';
    document.querySelector(UISelectors.updateBtn).style.display = 'none';
    document.querySelector(UISelectors.deleteBtn).style.display = 'none';
    document.querySelector(UISelectors.backBtn).style.display = 'none';
  },

  setEditState : function (){
   
    document.querySelector(UISelectors.addBtn).style.display = 'none';
    document.querySelector(UISelectors.updateBtn).style.display = 'inline';
    document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
    document.querySelector(UISelectors.backBtn).style.display = 'inline';
  },

  getItemToEditID : function (e){
   
    let found;

    if(e.target.parentElement.parentElement.classList.contains('collection-item')){
     const itemID  = e.target.parentElement.parentElement.id

    const idArr = itemID.split('-');

         found = idArr[1];
         return found;
    }
    

    
  },

  displayCurrentItemInUIInput : function (item){
   
    document.querySelector(UISelectors.itemName).value = item.name;
    document.querySelector(UISelectors.itemCalories).value = item.calories;
  }, 

  updateItemInUIListItems : function (UpdatedItem){

      

      // Get all lis under the ul
      const listItems = document.querySelectorAll(UISelectors.listItems)

       // Covert li node list into array
      listItemsArr = Array.from(listItems);

      listItemsArr.forEach(function(listItem){
        
          if(listItem.id === `item-${UpdatedItem.id}`){
           

        document.querySelector(`#${listItem.id}`).innerHTML = `
               <strong>${UpdatedItem.name}: </strong> <em>${UpdatedItem.calories} Calories</em>
               <a href="#" class="secondary-content">
               <i class="fa fa-pencil"></i>
               </a>
        `

      
          }
      })
      
  },

  deleteItemFromUI : function (deletedItem) {
  
    // Get all lis under the ul
    let listItems = document.querySelectorAll(UISelectors.listItems)

     // Covert li node list into array
     listItemsArr = Array.from(listItems);

    listItemsArr.forEach(function(item){
     

      if(item.id === `item-${deletedItem.id}`){
        
       document.querySelector(`#${item.id}`).remove();
      }

      
    })
    

  },

  goBackInUI : function (){

    this.clearEditState();

  },

  clearAllInUI : function (){
    document.querySelector(UISelectors.itemList).innerHTML ='';
  },
  hideItemList : function(){

    document.querySelector(UISelectors.itemList).style.display = 'none';

  },
  showItemList : function(){

    document.querySelector(UISelectors.itemList).style.display = 'block';

  },

  getSelectors : function(){
    return UISelectors;
  }

  }

})();



































// App controller

const AppCtrl = (function (ItemCtrl,StorageCtrl, UICtrl){

  const UISelectors = UICtrl.getSelectors();

  // Load all event handlers
  const loadEvents = function(){

    document.querySelector(UISelectors.addBtn).addEventListener('click', addItemOnSubmit);

    document.addEventListener('keypress', enterKeyPressed);

    document.querySelector(UISelectors.itemList).addEventListener('click', editItemOnSubmit);

    document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItemOnSubmit);

    document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItemOnSubmit);

    document.querySelector(UISelectors.backBtn).addEventListener('click', goBackOnSubmit);

    document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAllOnSubmit)
    
  };




  // Add item on submit 

  const addItemOnSubmit = function (e){
   
    // Get Item input

    
    const input = UICtrl.getItemInput();
    

    if(input.name !== '' && input.calories !==''){

      // Display List item border line

      UICtrl.showItemList();

      // Add item to state/ Data structure
     const item =  ItemCtrl.addInputItemToState(input.name, input.calories);

     // Store item in local storage
      StorageCtrl.storeItemInLocalStorage(item);
      
      
      // Add item to UI list
      UICtrl.addItemsToUIList(item);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //dislpay total calories in UI
      UICtrl.displayTotalCaloriesInUI(totalCalories);

      // clear input fields
      UICtrl.clearInputFields();


    }
    

    e.preventDefault();
  }



  // Enter key pressed

  const enterKeyPressed = function (e){
    
    if(e.keyCode === 13){
       e.preventDefault()
      return false;

    }

  }





  // Edit item on submit

  const editItemOnSubmit = function (e){


    // Get id of item to edit
    const id =  UICtrl.getItemToEditID(e);

    if (id){
       // Set current item using itemID
    const currentItem = ItemCtrl.setCurrentItem(id);

      // Display current item in UI input

    UICtrl.displayCurrentItemInUIInput(currentItem);

    // enter edit state
  
    UICtrl.setEditState();



    }
    
   
    e.preventDefault();
  }





  // Update item on submit

  const updateItemOnSubmit = function (e){

    // Get Item input
   const input = UICtrl.getItemInput();

   

    // Update item in state
    const  UpdatedItem = ItemCtrl.UpdateItemInState(input);

      // Update item in Local storage
    StorageCtrl.updateItemInLocalStorage(input);

   

    // Update item in UI list items
    UICtrl.updateItemInUIListItems(UpdatedItem);

     // Get total calories
     const totalCalories = ItemCtrl.getTotalCalories();

     //dislpay total calories in UI
     UICtrl.displayTotalCaloriesInUI(totalCalories);

     UICtrl.clearEditState();

    e.preventDefault();
  }





  // Delete item on submit

  const deleteItemOnSubmit = function (e){
  
    // Delete item from state
    const deletedItem = ItemCtrl.deleteItemFromState();
    
    // Delete item from local storage

    StorageCtrl.deleteItemFromLocalStorage();

    // Delete item for UI
    UICtrl.deleteItemFromUI(deletedItem)

    // Get total calories
     const totalCalories = ItemCtrl.getTotalCalories();

    //dislpay total calories in UI
     UICtrl.displayTotalCaloriesInUI(totalCalories);


    UICtrl.clearEditState()




    e.preventDefault();
  } 




  // Go back on submit

  const goBackOnSubmit = function (e){

   UICtrl.goBackInUI();

    e.preventDefault();
  }




const clearAllOnSubmit = function (e) {

  // Clear all in  state
  ItemCtrl.clearAllInState();

  // Clear all in local storage

  StorageCtrl.clearAllFromLocalStorage();

   // Get total calories
   const totalCalories = ItemCtrl.getTotalCalories();

   //dislpay total calories in UI
    UICtrl.displayTotalCaloriesInUI(totalCalories);

    // Clear all in Ui

    UICtrl.clearAllInUI();
    
    UICtrl.clearEditState();

  e.preventDefault();
}












  // Public methods

  return{
    init: function(){
       
        // Clear edit state
        UICtrl.clearEditState();
      
       // Get items in state
       const items = ItemCtrl.getItemsInState();

       // polulate UI list

       if(items.length > 0){
        UICtrl.populateList(items);
        
       }else{
          // hide List item border line
         UICtrl.hideItemList();
       }
       
     
        
      
      loadEvents();
          
    }
  }


})(ItemCtrl,StorageCtrl, UICtrl);


AppCtrl.init();