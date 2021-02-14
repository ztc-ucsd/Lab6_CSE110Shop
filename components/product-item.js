// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    let shadow = this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

    // Create (nested) span elements
    const item = document.createElement('li');
    item.setAttribute('class','product');

    // Insert icon
    let imgUrl;
    if(this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = '';
    }
    let altInfo;
    if(this.hasAttribute('alt')) {
      altInfo = this.getAttribute('alt');
    }
    let img = document.createElement('img');
    img.src = imgUrl;
    img.alt = altInfo;
    img.setAttribute('width', '200');

    const title = document.createElement('p');
    title.setAttribute('class', 'title');
    let titleText;
    if(this.hasAttribute('title')) {
      titleText = this.getAttribute('title');
    }
    title.innerHTML = titleText;

    const price = document.createElement('p');
    price.setAttribute('class', 'price');
    let actualPrice;
    if(this.hasAttribute('price')) {
      actualPrice = this.getAttribute('price');
    }
    price.innerHTML = actualPrice;

    let cart = localStorage.getItem('cart');
    if(cart != null) {
      cart = cart.split(',');
    }

    const btn = document.createElement('button');
    btn.setAttribute('onclick', "clicked(this);");
    if (cart) {
      if(cart.indexOf(this.getAttribute('id')) != -1) {
        btn.innerHTML = 'Remove from Cart';
      } else {
        btn.innerHTML = 'Add to Cart';
      }
    } else {
      btn.innerHTML = 'Add to Cart';
    }
    btn.setAttribute('class', 'btn');
    btn.setAttribute('id', this.getAttribute('id'));

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    // attach the created elements to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(item);
    item.appendChild(img);
    item.appendChild(title);
    item.appendChild(price);
    item.appendChild(btn);
  }
}

customElements.define('product-item', ProductItem);

/*<li class="product">
    <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
    <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
    <p class="price">$109.95</p>
    <button onclick="alert('Added to Cart!')">Add to Cart</button>
</li>*/
