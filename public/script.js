// 🌐 URL DO BACKEND
const API = "https://loja-backend-jmci.onrender.com";

// 🛒 CARRINHO LOCAL
let carrinho = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// 🛒 ADICIONAR AO CARRINHO
// =======================
function addToCart(produto) {
  carrinho.push(produto);
  localStorage.setItem("cart", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
}

// =======================
// 🧾 MOSTRAR CARRINHO
// =======================
function renderCart() {
  const div = document.getElementById("cart");

  if (!div) return;

  div.innerHTML = "";

  let total = 0;

  carrinho.forEach((p, i) => {
    total += p.preco;

    div.innerHTML += `
      <div>
        ${p.nome} - R$ ${p.preco}
        <button onclick="removerItem(${i})">Remover</button>
      </div>
    `;
  });

  div.innerHTML += `<h3>Total: R$ ${total}</h3>`;
}

// =======================
// ❌ REMOVER ITEM
// =======================
function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(carrinho));
  renderCart();
}

// =======================
// 🔐 LOGIN
// =======================
async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, password: senha })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login realizado!");
    window.location.href = "/";
  } else {
    alert("Erro no login");
  }
}

// =======================
// 💳 PAGAR COM PIX
// =======================
async function pagarPix() {
  const total = carrinho.reduce((acc, p) => acc + p.preco, 0);

  const res = await fetch("https://loja-backend-jmci.onrender.com/payment/pix", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      total: total,
      email: "cliente@email.com"
    })
  });

  const data = await res.json();

  const div = document.getElementById("pix");

  div.innerHTML = `
    <h2>Escaneie o QR Code</h2>
    <img src="data:image/png;base64,${data.qr}" />
    <p>${data.copiaecola}</p>
    <p>Aguardando pagamento...</p>
  `;
}

// =======================
// 📦 CARREGAR PRODUTOS
// =======================
async function carregarProdutos() {
  const res = await fetch(API + "/products");
  const produtos = await res.json();

  const div = document.getElementById("produtos");

  if (!div) return;

  produtos.forEach(p => {
    div.innerHTML += `
      <div>
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>
          Comprar
        </button>
      </div>
    `;
  });
}

// =======================
// 🚀 INICIAR
// =======================
window.onload = () => {
  renderCart();
  carregarProdutos();
};