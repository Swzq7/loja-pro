const API = "https://loja-backend-jmci.onrender.com";

let carrinho = JSON.parse(localStorage.getItem("cart")) || [];

// NORMALIZA
carrinho = carrinho.map(p => ({
  nome: p.nome,
  preco: Number(p.preco) || 0,
  imagem: p.imagem,
  qtd: p.qtd ? Number(p.qtd) : 1
}));

localStorage.setItem("cart", JSON.stringify(carrinho));

// ================= PRODUTOS =================
const produtos = [
  {nome:"Tênis Nike", preco:199, imagem:"https://via.placeholder.com/300"},
  {nome:"Camisa Premium", preco:129, imagem:"https://via.placeholder.com/300"},
  {nome:"Boné", preco:79, imagem:"https://via.placeholder.com/300"}
];

function renderProdutos(){
  const div = document.getElementById("produtos");
  if(!div) return;

  div.innerHTML="";

  produtos.forEach((p,i)=>{
    div.innerHTML += `
      <div class="card">
        <img src="${p.imagem}">
        <div class="card-body">
          <h3>${p.nome}</h3>
          <p>R$ ${p.preco}</p>

          <button class="btn" onclick="addToCart(${i})">
            Comprar
          </button>
        </div>
      </div>
    `;
  });
}

// ================= CARRINHO =================
function addToCart(i){
  carrinho.push({...produtos[i], qtd:1});
  localStorage.setItem("cart", JSON.stringify(carrinho));
  updateCart();
}

function toggleCart(){
  document.getElementById("cartSidebar").classList.toggle("active");
}

function updateCart(){
  const div = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  const count = document.getElementById("cart-count");

  if(!div) return;

  div.innerHTML="";
  let total = 0;

  carrinho.forEach((p,i)=>{
    total += p.preco * p.qtd;

    div.innerHTML += `
      <div>
        <p>${p.nome} x${p.qtd}</p>
        <button onclick="removeItem(${i})">Remover</button>
      </div>
    `;
  });

  totalEl.innerText = "Total: R$ " + total;
  count.innerText = carrinho.length;
}

function removeItem(i){
  carrinho.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(carrinho));
  updateCart();
}

// ================= CHECKOUT =================
function goCheckout(){
  window.location.href = "checkout.html";
}

// ================= INIT =================
window.onload = ()=>{
  renderProdutos();
  updateCart();
};