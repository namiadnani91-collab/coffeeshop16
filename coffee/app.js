const menuItems = [
  { id: 1, name: 'Espresso', desc: 'Rich and bold single shot', price: 99 },
  { id: 2, name: 'Cappuccino', desc: 'Espresso with steamed milk foam', price: 149 },
  { id: 3, name: 'Latte', desc: 'Creamy latte with silky milk', price: 159 },
  { id: 4, name: 'Mocha', desc: 'Chocolatey mocha for sweet cravings', price: 169 },
  { id: 5, name: 'Iced Coffee', desc: 'Chilled coffee over ice', price: 129 },
  { id: 6, name: 'Almond Croissant', desc: 'Buttery pastry with almond filling', price: 119 }
];

const itemsContainer = document.getElementById('items');
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const viewCartBtn = document.getElementById('view-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout');

let cart = [];

function renderMenu(){
  itemsContainer.innerHTML = '';
  menuItems.forEach(it => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${it.name}</h3>
      <p>${it.desc}</p>
      <div class="meta">
        <div class="price">₹${it.price}</div>
        <button class="add" data-id="${it.id}">Add</button>
      </div>
    `;
    itemsContainer.appendChild(card);
  });
}

function addToCart(id){
  const item = menuItems.find(m => m.id === id);
  const existing = cart.find(c => c.id === id);
  if(existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  updateCartUI();
}

function updateCartUI(){
  const count = cart.reduce((s,i) => s + i.qty, 0);
  cartCountEl.textContent = count;

  cartItemsEl.innerHTML = '';
  cart.forEach(i => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${i.name} × ${i.qty}</span>
      <span>₹${i.price * i.qty}</span>
    `;
    cartItemsEl.appendChild(li);
  });

  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  cartTotalEl.textContent = total;
}

function toggleCart(show){
  if(show){
    cartModal.classList.remove('hidden');
  } else {
    cartModal.classList.add('hidden');
  }
}

// events
itemsContainer.addEventListener('click', (e) => {
  if(e.target.matches('.add')){
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

viewCartBtn.addEventListener('click', () => toggleCart(true));
closeCartBtn.addEventListener('click', () => toggleCart(false));
checkoutBtn.addEventListener('click', () => {
  if(cart.length === 0) return alert('Your cart is empty');
  alert('Thanks! Your order has been placed.');
  cart = [];
  updateCartUI();
  toggleCart(false);
});

// init
renderMenu();
updateCartUI();
