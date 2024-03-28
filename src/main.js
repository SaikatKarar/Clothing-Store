let shop = document.getElementById('shop')


let ShopItemData = [{
  id: 'ohgyc',
  name: 'casual shirt',
  price: '45',
  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
  img: 'images/img-1.jpg'
}, {
  id: 'dsdndfhohgyc',
  name: 'office shirt',
  price: '99',
  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
  img: 'images/img-2.jpg'
}, {
  id: 'eifjohgyc',
  name: 't shirt',
  price: '25',
  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
  img: 'images/img-3.jpg'
}, {
  id: 'gjuoohgyc',
  name: 'mens suit',
  price: '245',
  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
  img: 'images/img-4.jpg'
}]

let basket = JSON.parse(localStorage.getItem("MyData")) || [];

//  Es6 arrow function
let generateShop = () => {
  return (shop.innerHTML = ShopItemData.map((x) => {
    let { id, name, price, desc, img } = x;
    let sec = basket.find(idNum => idNum.id === id) || [];
    return `
      <div id=product-id-${id} class="item">
        <img width="220ppx" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
              <h2>$ ${price}</h2>
              <div class="buttons">
                <i onclick='decrement(${id})' class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${sec.item === undefined ? 0 : sec.item}</div>
                <i onclick='increment(${id})' class="bi bi-plus-lg"></i>
              </div>
          </div>
        </div>
      </div>
    `
  }).join(''));
}

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    })
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);

  localStorage.setItem("MyData", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }


  update(selectedItem.id)
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);

  localStorage.setItem("MyData", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  console.log(search.item)

  calculation()
};

const calculation = () => {
  const cartIcon = document.querySelector('#cartAmount');
  cartIcon.innerHTML = basket.map(x => x.item).reduce((x, y) => x + y, 0); s
}
calculation()
