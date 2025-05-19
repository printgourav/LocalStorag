const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(evt){
    evt.preventDefault(); // Prevent Unexpected Reload
    const text = (document.querySelector('[name = item]')).value; //takes user Input
    const item = { // create item object.
        text,
        done: false
    };
    console.log(item);
    items.push(item); // adding in items array
    populateList(items,itemsList);
    localStorage.setItem('items',JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) { //Rendering List dynamically.
   platesList.innerHTML = plates.map((plate, i) => {
    return `
        <li>
        <input type = "checkbox" data-index=$ {i} id ="item${i}" ${plate.done? 'checked': ''} />
        <label for = "items${i}">${plate.text}</label>
        <button class = "remove" data-index="${i}" aria-label="Remove item"></button>
        
        </li>`;
   }).join(''); 
}

function toggleDown(evt){ //Check and Uncheck
    if(!evt.target.matches('input')) return;
    const el = evt.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDown);
itemsList.addEventListener('click',function(e){  //Event Delegation to remove items
    if (e.target.matches('.remove')){
const index = e.target.dataset.index;
  items.splice(index,1);
  populateList(items,itemsList);
  localStorage.setItem('items',JSON.stringify(items));
  }
});

populateList(items, itemsList);
