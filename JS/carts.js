let addedItems = document.querySelector("#aside-content")
let Subtotal = document.querySelector(".Subtotal")
let name_search_inpt = document.querySelector("#name-search")
let selectElement = document.getElementById("Select");
let aside = document.querySelector("#aside")
let badge = document.querySelector(".badge")
let cart_products = document.querySelector(".cart_products") ;



let Basket = localStorage.getItem("Basket")
let Product = JSON.parse(Basket)
console.log(Product)




if(Basket){ // this condition means if this variable which  called Basket has a value execute the logic
    let Product = JSON.parse(Basket)
    drawCartProducts(Product)
}


const products_row = document.querySelector(".products_row")
function drawCartProducts (products) {
    const products_row = document.querySelector(".products_row")
    let y = products.map((item) => {
        return `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 gap">
          <div class="card cart-in-carts">
            <img class="card-img-top images-height" src="${item.cartsImageUrl}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.category}</p>
              <p class="card-text">${item.price} $</p>
              <div class="remove-button-wrapper">
                <a href= "#" class = "btn btn-danger adding-btn" onClick = "removeFromCart(${item.id})">Remove From Cart</a>
                <span class="quantity-in-cart-page" data-id = "${item.id}">The Number Of Units Is ${item.numberOfUnits} Units</span>
              </div>
            </div>
          </div>
        </div>
        `;
    }).join("")
    console.log(products_row)
    products_row.innerHTML = y

}


// !* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//  !*  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function updateBasket(){
  renderCartItems()
  renderSubtotal()

  //? Save Basket to local storage to not lose the products of the user.
  localStorage.setItem("Basket" , JSON.stringify(Basket))
}
  Basket = JSON.parse(localStorage.getItem("Basket")) || [];
  updateBasket();
 
let aside_info = document.querySelector(".aside-info")
function renderCartItems() {
  addedItems.innerHTML = ""; //clear basket element
  Basket.forEach((item) => {
    addedItems.innerHTML += `
          <div class = "aside-info">
            <div class = "dragged-items">${item.title}</div>
            <div class="parent-quantity-info">
              <i class = "fas fa-trash" id = "Trash" onClick = "removingFromBasket(${item.id})"></i>
              <i  class= "fas fa-minus" onClick = "changeNumberOfUnits('minus' , ${item.id})"></i>
              <div class="quantity" id="Quantity">${item.numberOfUnits}</div>
              <i  class= "fas fa-plus Heart" onClick = "changeNumberOfUnits('plus' , ${item.id})"></i>
            </div>  
          </div>
    `;
  });
}


// ! change number of units for an item

function changeNumberOfUnits(action , id) {
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
  totalPrice()
  updateUnitsInDOM(id)

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




// * //////////////////////////////////////////////////////////////////////////////////////////////////////////]




shopingIconcart.addEventListener("click" , function openCart(){
  if(aside !== " "){
    if(aside.style.display === "block"){
      aside.style.display = "none"
      
    } else {
      aside.style.display = "block"  
    }
  }
})


function addedToCart(id) {
  if ((localStorage.getItem = "fname")) {
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
  }
}

function removingFromBasket(id){
  Basket = Basket.filter((item) => item.id !== id)
  updateBasket()  
  totalPrice()
  removeFromCart(id)  // !* this line will solve the problem of upgrading the UI products in the DOM
}

function LoadBasketFromLocalStorage() {
  const storedBasket = localStorage.getItem("Basket")
  if(storedBasket){
    Basket = JSON.parse(storedBasket)
  } 
}
document.addEventListener("DOMContentLoaded" , ()=> {
  LoadBasketFromLocalStorage()
  drawCartProducts(Basket)
  updateBasket()
  totalPrice()
})

// !* //////////////////////////////////////////////////////////////////////////////             ////////////////////////////////

// ? Function Remove Items From the Cart

function removeFromCart(id){
  Product = Product.filter((item) => item.id !== id)
  drawCartProducts(Product)
  localStorage.setItem("Basket" , JSON.stringify(Product)) //! We had an error before executed this line that when we refreshing the page the items that we removed it already remove from the dom but not removed from the local storage , after we did this line the problem had been solved successfully
  totalPrice()
}




function totalPrice(){
  const total_price_div = document.querySelector(".total-price h2");
  const Basket = localStorage.getItem("Basket") // ? this line will solve the issue of refreshing the Basket to keep the inner html dynamic 
  if (Basket && JSON.parse(Basket).length > 0) {
    z = JSON.parse(Basket);
    let totalPrice = 0,
      totalItems = 0;
    z.forEach((item) => {
      totalPrice += +(item.numberOfUnits * item.price);
      totalItems += +item.numberOfUnits;
    });
    total_price_div.innerHTML = `The Total Items are (${totalItems} items) : ${totalPrice} $`;
  } else {
    total_price_div.innerHTML = `There Is No Items In The Cart`;
  }
}

if(Basket) {
  let View_All_products = document.querySelector(".View-Products")
  View_All_products.style.display = "none"
}

window.addEventListener("load" , totalPrice) // ? We add this line to show the total price automatically within the click event




function updateUnitsInDOM(id) {
  // إيجاد العنصر الخاص بالمنتج بناءً على الـ ID
  const productUnitElement = document.querySelector(
    `.quantity-in-cart-page[data-id="${id}"]`
  );

  // إيجاد المنتج في الباسكت
  const product = Basket.find((item) => item.id === id);

  // تحديث النص بعدد الوحدات
  if (productUnitElement && product) {
    productUnitElement.textContent = `The Number of Units Is ${product.numberOfUnits}`;
  }
}

// !* //////////////////////////////////////////////////////////////////////////////////////////////////////

// !* Favourite Section 





/// !* ////////////////////////////////////////////////////////////////////////


// Removing From Favourite 



document.addEventListener("DOMContentLoaded", function() {
  // تأكد من تحميل الـ DOM بشكل كامل قبل التفاعل مع العناصر
  drawFavouriteProducts(); // رسم المنتجات المفضلة
});

// تهيئة مكتبة Swiper فقط إذا كانت الـ DOM جاهزة
function initFavouriteSwiper() {
  const swiperContainer = document.querySelector('.favorite-swiper-container');
  
  if (!swiperContainer) {
      console.error("Swiper container not found!");
      return;
  }

  try {
      // تأكد من أن العنصر موجود قبل تهيئة Swiper
      new Swiper(swiperContainer, {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: {
              nextEl: ".favorite-swiper-button-next",
              prevEl: ".favorite-swiper-button-prev",
          },
          pagination: {
              el: '.favorite-swiper-pagination',
              clickable: true,
          },
          breakpoints: {
              640: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
          },
      });
  } catch (error) {
      console.error("Error initializing Swiper: ", error);
  }
}

// رسم المنتجات في قسم المفضلة
function drawFavouriteProducts() {
  const favouriteProducts = JSON.parse(localStorage.getItem("FavProducts")) || [];
  const productsRow = document.querySelector(".favorite-swiper-wrapper");

  if (!productsRow) {
      console.error("Products row container not found!");
      return;
  }

  if (favouriteProducts.length === 0) {
      productsRow.innerHTML = "<h4 class= 'Empty'>No favourite products added yet.</h4>";
      return;
  }

  productsRow.innerHTML = favouriteProducts.map(product => 
      `<div class="favorite-swiper-slide col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
          <div class="favorite-card">
              <div class="favorite-card-img">
                  <img src="${product.cartsImageUrl}" alt="${product.title}">
              </div>
              <div class="favorite-card-body">
                  <h5>${product.title}</h5>
                  <p>${product.category}</p>
                  <i id="Heart-${product.id}" class="fa fa-heart active fav-heart" onClick="toggleFavourite(${product.id})"></i>
              </div>
          </div>
        </div>
  `).join("");

  // تهيئة Swiper بعد إضافة المنتجات
  setTimeout(() => {
      initFavouriteSwiper();
  }, 300);
}

// دالة لتبديل حالة المنتج المفضل عند النقر عليه
function toggleFavourite(productId) {
  let favouriteProducts = JSON.parse(localStorage.getItem("FavProducts")) || [];
  const productIndex = favouriteProducts.findIndex(item => item.id === productId);

  if (productIndex === -1) {
      // إضافة المنتج للمفضلة
      const product = [
        {
          id: 1,
          title: "Gta V",
          imageUrl: "pic1",
          price: 120,
          category: "Action",
          cartsImageUrl: "images/Gta.png",
        },
        {
          id: 2,
          title: "Spider Man",
          imageUrl: "pic2",
          price: 100,
          category: "Action",
          cartsImageUrl: "images/spiderman.png",
        },
        {
          id: 3,
          title: "Under City",
          imageUrl: "pic3",
          price: 150,
          category: "Action",
          cartsImageUrl: "images/under city.png",
        },
        {
          id: 4,
          title: "Fifa 24",
          imageUrl: "pic4",
          price: 170,
          category: "Sports",
          cartsImageUrl: "images/fifa2024.png",
        },
        {
          id: 5,
          title: "Red Dead",
          imageUrl: "pic5",
          price: 140,
          category: "Action",
          cartsImageUrl: "images/reddead.png",
        },
        {
          id: 6,
          title: "The Last Of Us",
          imageUrl: "pic6",
          price: 160,
          category: "Action",
          cartsImageUrl: "images/the last of us.png",
        },
        {
          id: 7,
          title: "Just Cause",
          imageUrl: "pic7",
          price: 90,
          category: "Action",
          cartsImageUrl: "images/just cause.png",
        },
        {
          id: 8,
          title: "Pubg",
          imageUrl: "pic8",
          price: 70,
          category: "Action",
          cartsImageUrl: "images/pubg.png",
        },
        {
          id: 9,
          title: "Uncharted",
          imageUrl: "pic9",
          price: 110,
          category: "Action",
          cartsImageUrl: "images/uncharted 2.png",
        },
      ];
      favouriteProducts.push(product);
  } else {
      // إزالة المنتج من المفضلة
      favouriteProducts.splice(productIndex, 1);
  }

  localStorage.setItem("FavProducts", JSON.stringify(favouriteProducts));
  drawFavouriteProducts(); // إعادة رسم المنتجات بعد التحديث
}