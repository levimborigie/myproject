/* ---------------- HERO SLIDESHOW ---------------- */
const heroEl = document.querySelector('.hero-slideshow');
const heroImages = [
  "Images/Explore Menu/arturrro-GdTLaWamFHw-unsplash.jpg",
  "Images/Explore Menu/chad-montano--GFCYhoRe48-unsplash.jpg",
  "Images/Explore Menu/chad-montano-MqT0asuoIcU-unsplash.jpg",
  "Images/Explore Menu/monika-grabkowska-_y6A9bhILkM-unsplash.jpg"
];
// Preload images
heroImages.forEach(src => { const i=new Image(); i.src=src; });

let slideIndex = 0;
const fadeDuration = 1000; // ms
function showHeroImage(i){
  heroEl.style.backgroundImage = `url('${heroImages[i]}')`;
  // heroEl opacity transition is handled by CSS via transition on background change
}
function startHeroSlideshow(){
  showHeroImage(slideIndex);
  slideIndex = (slideIndex + 1) % heroImages.length;
  setInterval(()=> {
    showHeroImage(slideIndex);
    slideIndex = (slideIndex + 1) % heroImages.length;
  }, 4000);
}
startHeroSlideshow();

/* ---------------- CART LOGIC ---------------- */
let cart = [];

// add item (or increase quantity if exists)
function addToCart(name, price){
  const found = cart.find(it => it.name === name);
  if(found) found.qty++;
  else cart.push({ name, price, qty: 1 });
  renderCart();
  // open drawer when item added (optional)
  document.getElementById('cartDrawer').classList.add('open');
}

// render cart items into drawer
function renderCart(){
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('grandTotal');
  container.innerHTML = '';
  let total = 0;
  cart.forEach((it, idx) => {
    total += it.price * it.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <h4>${it.name}</h4>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="controls">
          <button onclick="decreaseQty(${idx})">−</button>
          <span>${it.qty}</span>
          <button onclick="increaseQty(${idx})">+</button>
        </div>
        <div style="min-width:72px;text-align:right;font-weight:700;">₹${it.price * it.qty}</div>
        <button style="background:#ff4d4d;color:#fff;border:none;padding:6px 8px;border-radius:6px;cursor:pointer;" onclick="removeItem(${idx})">×</button>
      </div>
    `;
    container.appendChild(div);
  });
  totalEl.textContent = `₹${total}`;
}

// quantity handlers
function increaseQty(i){ cart[i].qty++; renderCart(); }
function decreaseQty(i){
  if(cart[i].qty > 1) cart[i].qty--;
  else cart.splice(i,1);
  renderCart();
}
function removeItem(i){ cart.splice(i,1); renderCart(); }

/* ---------------- DRAWER & MODAL ---------------- */
const cartDrawer = document.getElementById('cartDrawer');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const orderModal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModal');

openCartBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  cartDrawer.classList.add('open');
});
closeCartBtn.addEventListener('click', ()=> cartDrawer.classList.remove('open'));

// Place order -> show modal, clear cart
document.getElementById('placeOrderBtn').addEventListener('click', ()=>{
  if(cart.length === 0){ alert('Your cart is empty!'); return; }
  cartDrawer.classList.remove('open');
  orderModal.classList.add('show');
  orderModal.setAttribute('aria-hidden','false');
  cart = [];
  renderCart();
  // auto hide modal after 3s
  setTimeout(()=> {
    orderModal.classList.remove('show');
    orderModal.setAttribute('aria-hidden','true');
  }, 3000);
});

closeModalBtn.addEventListener('click', ()=> {
  orderModal.classList.remove('show');
  orderModal.setAttribute('aria-hidden','true');
});

orderModal.addEventListener('click', (e)=> {
  if(e.target === orderModal){
    orderModal.classList.remove('show');
    orderModal.setAttribute('aria-hidden','true');
  }
});

/* ---------------- COPYRIGHT YEAR ---------------- */
document.getElementById('copyYear').textContent = new Date().getFullYear();
