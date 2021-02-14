// Script.js

let cart = [];

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('data') == null) {
    const res = fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('data', JSON.stringify(data));
    });
  } else {
    displayData();
  }
  
  let cartItems = localStorage.getItem('cart');
  if(cartItems != null) {
    cartItems = cartItems.split(',');
    document.getElementById('cart-count').innerHTML = cartItems.length;

    for(var i = 0; i < cartItems.length; i++) {
      cart.push(cartItems[i]);
    }
  }
});

function displayData(){
  let data = localStorage.getItem('data');
  data = JSON.parse(data);
  
  let item;
  let temp;
  let htmlObject;
  for(var i = 0; i < data.length; i++) {
    
    /*item = document.createElement('product-item');
    console.log(data[i].image);
    item.setAttribute('img', data[i].image);
    item.setAttribute('alt', data[i].title);
    item.setAttribute('title', data[i].title);
    item.setAttribute('price', data[i].price);*/
    item = "<product-item id=" + data[i].id + " img=" + data[i].image + " alt='" + data[i].title + "' title='" + data[i].title + "' price='$" 
            + data[i].price + "'>";
    temp = document.createElement('div');
    temp.innerHTML = item;
    htmlObject = temp.firstChild;
    document.getElementById("product-list").append(htmlObject);
  }
}

function clicked(source) {
  let count = parseInt(document.getElementById('cart-count').innerHTML);
  if(source.innerHTML == "Add to Cart") {
    count++;
    source.innerHTML = "Remove from Cart";
    cart.push(source.id);
    alert('Added to Cart!');
  } else if (source.innerHTML == "Remove from Cart") {
    count--;
    let ind = cart.indexOf(source.id);
    if (ind > -1) {
      cart.splice(ind, 1);
    }
    source.innerHTML = "Add to Cart";
    alert('Removed from Cart!');
  }
  
  document.getElementById('cart-count').innerHTML = count;
  localStorage.setItem('cart', cart);
}
