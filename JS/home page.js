let log_rig = document.querySelector(".log-rig")
let parent_shopping_cart = document.querySelector(".parent_shopping_cart")
let out = document.querySelector(".out")
let greeting = document.querySelector(".greeting_name")
console.log(log_rig)
let addedItems = document.querySelector("#aside-content")
let Subtotal = document.querySelector(".Subtotal")
let name_search_inpt = document.querySelector("#name-search")
let selectElement = document.getElementById("Select");
let aside = document.querySelector("#aside")



if(localStorage.getItem("fname") && localStorage.getItem("lname")){
  log_rig.style.display = "none"
  parent_shopping_cart.style.display = "flex"
  greeting.innerHTML += `Welcome ${localStorage.getItem("fname")}`
} else {
  parent_shopping_cart.style.display = "none"
}
///////////////////////////////////////////////////////////////

out.addEventListener("click" , function(prevent){
  prevent.preventDefault()
  localStorage.clear()
  setTimeout(() => {
    window.location = "login.html"
  }, 1500)   
})

///////////////////////////////////////////////////////////////
localStorage.setItem("Products" , JSON.stringify(products))  // ! localStorage.setItem("Products" , products). We had an error here that we don't make a stringify for the var products so this line means that we store it in localstorage as an object 
let allProducts = localStorage.getItem("Products")
let DbProducts = JSON.parse(allProducts)
console.log(DbProducts);
let drawItems ;
(drawItems = function (products = []) {
  const products_row = document.querySelector(".products_row");
  let y = products
    .map((item) => {
      return `
          <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 products">
            <div class="card hover-effect">
              <div class="images-products">
                <div class="bg-problem ${item.imageUrl}"></div>
              </div>
    
              <div class="card-body">
                <p>Product : ${item.title} </p>
                <p>Price : ${item.price} $</p>
                <p class="card-text">Category : ${item.category}</p>
                <button class = "btn btn-primary adding-btn" onClick = "addedToCart(${item.id})">Add to Cart</button>
                <i id="Heart-${item.id}" class="fa fa-heart heart ${isFavourite(item.id) ? 'active' : ''}" 
                  onclick="toggleFavourite(${item.id})"></i>
              </div>
            </div>
          </div> <!-- prod1 -->
        `;
    })
    .join("");
  products_row.innerHTML = y;
})(DbProducts);



function isFavourite(id) {
  const FavouriteItem = JSON.parse(localStorage.getItem("FavProducts")) || [];
  return FavouriteItem.some((item) => item.id === id);
}

drawItems(DbProducts); // رسم المنتجات عند تحميل الصفحة

// //? ///////////////////////////////////////////////////////////////////////// !* ////////////////////////////////////////////////////



// the Feedback : 

// the first problem that you added the products into the container and thats wrong the correct logic that you have to added them in the row and the row div is already exists in the container so this was the first problem you made 

//  you were have a problem here before you made the join method the problem was : the map method returned an array and the innerhtml can not accept the array but can accept only a string so we do the join method to convert the array into string to accessing it in the innerhtml


// there is another feedback from the eventEventListener which was you should trigger the function in the EventListener by make the paranthesetis. 

// the second problem was if you make an EventListener on the <a> tag the event won't work if you don't make the sign of # in the <a> tag.

let badge = document.querySelector(".badge")

let cart_products = document.querySelector(".cart_products") ;


  function updateBasket() {
    renderCartItems();
    renderSubtotal();

    //? Save Basket to local storage to not lose the products of the user.
    localStorage.setItem("Basket", JSON.stringify(Basket));
  }



let Basket = JSON.parse(localStorage.getItem("Basket")) || [];
updateBasket();
    


let aside_info = document.querySelector(".aside-info")
function renderCartItems() {
  addedItems.innerHTML = ""; //clear basket element
  Basket.forEach((item) => {
    addedItems.innerHTML += `
          <div class = "aside-info">
            <div class = "dragged-items">${item.title}</div>
            <div class="parent-quantity-info">
              <i class = "fas fa-trash" id = "Trash" onClick = "removeFromCart(${item.id})"></i>
              <i  class= "fas fa-minus" onClick = "changeNumberOfUnits('minus' , ${item.id})"></i>
              <div class="quantity" id="Quantity">${item.numberOfUnits}</div>
              <i  class= "fas fa-plus Heart" onClick = "changeNumberOfUnits('plus' , ${item.id})"></i>
            </div>  
          </div>
    `;
  });
}


// ! change number of units for an item
function changeNumberOfUnits(action, id) {
  Basket = Basket.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateBasket();
}

//   this will check if the id of every index of products === the id in the products array or not and we do this to return all the product that the user has eneterd so the find method will return the first product that complies with spicifications. 

let shopingIconcart = document.querySelector(".icon-cart")
let cartsProducts = document.querySelector(".cart_products")
// shopingIconcart.addEventListener("click" , openCart)

// function openCart() {
//   if (cart_products.innerHTML != " ") {
//     if (cartsProducts.style.display == "block") {
//       cartsProducts.style.display = "none";
//     } else {
//       cartsProducts.style.display = "block";
//     }
//   } else {
//     if ((cart_products.innerHTML = " "))
//       if (cartsProducts.style.display == "block") {
// ?         // " " means that the thing is empty
//         cartsProducts.style.display = "none";
//       } else {
//         cartsProducts.style.display = "block";
//       }
//   }
// } 
///////////////////////////////////////////////////////////////////////////


// ? calculate and render the subtotal price
function renderSubtotal(){
  let totalPrice = 0 ,      // ! we had an error that we do this => let totalPrice , total Items = 0 and this leads us to a Nan (syntax error) so to debug this problem we should make the total price = 0 and total Items = 0
      totalItems = 0 ;  
  Basket.forEach((item) => {
    totalPrice += +(item.numberOfUnits * item.price) ; 
    totalItems += +(item.numberOfUnits);
  })
  Subtotal.innerHTML = `Subtotal (${totalItems} items) : ${totalPrice} $`
  badge.innerHTML = totalItems
  
}


function addedToCart(id) {
  if ((localStorage.getItem !== "fname")) {
      // check if product already exist in Basket array 
    if(Basket.some((element) => element.id === id )){
      changeNumberOfUnits("plus" , id)
    }else{
      // the id in the parameter is the index id which was in the y variable
      let chosenItem = products.find((item) => item.id === id); // item.id means every id in the products variable
      // we added the title items in the paragraph because the paragraph is an block element so each title will take a block (line)
      Basket.push({
        ...chosenItem , // this means that we will store the old properties and then we will add a new property called numberOfUnits
        numberOfUnits : 1,
      })       // Basket = [...Basket , chosenItem]  this is another way of how we store the chosen items in the array
    } // else

    updateBasket()
    /* this is how to make a product counter when adding products to the shoppping cart 
      the last three lines indicates the idea of the increasing in the carts badge 
      the first line recall all the paragraphs in the div because this will be the index of the products which we added 
      the second line mean when we add a product to cart it should appears
      the third line means that we will write at the badge the length of the products which we added 
    */
  } else {
    window.location = "login.html"
    console.log("ohhhhhhh")
  }
}





// ? Function Remove Items From the Cart

function removeFromCart(id){
  Basket = Basket.filter((item) => item.id !== id)
  updateBasket()
}
// * //////////////////////////////////////////////////////////////////////////////////////////////////////////]




if(localStorage.getItem("fname")){
  shopingIconcart.addEventListener("click" , function openCart(){
  if(aside !== " "){
    if(aside.style.display === "block"){
      aside.style.display = "none"
      
    } else {
      aside.style.display = "block"  
    }
  }
})
}





// ? the Logic Of how To Do the Search Filter Correctly.

// بنضيف الحدث change عشان يتنفذ الكود لما يتغير الاختيار

selectElement.addEventListener("change", function() {

  if(selectElement.value === "name"){ 
    name_search_inpt.addEventListener("keyup" , function(e){ 
 
      searchByName(e.target.value.toLowerCase(), DbProducts); 
     
      if(e.target.value.trim() === ""){ 
        drawItems(DbProducts); 
      } 
    }); 
     
  } 
  else if (selectElement.value === "category"){ 
    name_search_inpt.addEventListener("keyup" , function(e){ 
 
      searchByCategory(e.target.value.toLowerCase(), DbProducts);  
     
      if(e.target.value.trim() === ""){ 
        drawItems(DbProducts); 
      } 
    }); 
     
  } 
}); 

function searchByName(title, myArr) { 
let arr = myArr.filter((item) => item.title.toLowerCase().indexOf(title) !== -1);  
drawItems(arr); 
} 

function searchByCategory(category, myArr) { 
let arr = myArr.filter((item) => item.category.toLowerCase().indexOf(category) !== -1); 
drawItems(arr); 
}




function toggleFavourite(id) {
  let FavouriteItem = JSON.parse(localStorage.getItem("FavProducts")) || [];
  let chosenItem = DbProducts.find((item) => item.id === id);
  let heartIcon = document.querySelector(`#Heart-${id}`);
  if(localStorage.getItem("fname")){

    if (FavouriteItem.some((item) => item.id === id)) {
      FavouriteItem = FavouriteItem.filter((item) => item.id !== id);
      heartIcon.classList.remove("active"); // رجع اللون الأسود
    } else {
      FavouriteItem.push(chosenItem);
      heartIcon.classList.add("active"); // خلي اللون أحمر
    }

  } else{
    window.location = "login.html"
  }
  

  localStorage.setItem("FavProducts", JSON.stringify(FavouriteItem));
}
