const API = "https://loja-backend-jmci.onrender.com";

let carrinho = JSON.parse(localStorage.getItem("cart")) || [];

// ================= NAV =================
function goCart() {
  window.location.href = "cart.html";
}

function goHome() {
  window.location.href = "index.html";
}

function goCheckout() {
  window.location.href = "checkout.html";
}

// ================= PRODUTOS =================
const produtos = [
  {nome:"Tênis Nike", preco:199, imagem:"https://via.placeholder.com/200"},
  {nome:"Camisa", preco:99, imagem:"https://via.placeholder.com/200"}
];

function renderProdutos() {
  const div = document.getElementById("produtos");
  if (!div) return;

  produtos.forEach(p => {
    div.innerHTML += `
      <div class="card">
        <img src="${p.imagem}">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco}</p>
        <button class="btn" onclick='addToCart(${JSON.stringify(p)})'>
          Comprar
        </button>
      </div>
    `;
  });
}

// ================= CARRINHO =================
function addToCart(p) {
  carrinho.push(p);
  localStorage.setItem("cart", JSON.stringify(carrinho));
  alert("Adicionado ao carrinho");
}

function renderCart() {
  const div = document.getElementById("cart");
  if (!div) return;

  let total = 0;
  div.innerHTML = "";

  carrinho.forEach(p => {
    total += p.preco;
    div.innerHTML += `<p>${p.nome} - R$ ${p.preco}</p>`;
  });

  div.innerHTML += `<h3>Total: R$ ${total}</h3>`;
}

// ================= PIX =================
async function pagarPix() {
  const total = carrinho.reduce((a,b)=>a+b.preco,0);

  document.getElementById("total").innerText = "R$ " + total;

  const res = await fetch(API + "/payment/pix", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      total: total,
      email:"teste@email.com"
    })
  });

  const data = await res.json();

  document.getElementById("pix").innerHTML = `
    <h3>Escaneie o QR</h3>
    <img src="data:image/png;base64,${data.qr}" width="250"/>
    <p>${data.copiaecola}</p>
  `;
}

// ================= INIT =================
window.onload = () => {
  renderProdutos();
  renderCart();
};