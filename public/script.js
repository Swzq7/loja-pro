const API = "https://loja-backend-jmci.onrender.com";

let carrinho = JSON.parse(localStorage.getItem("cart")) || [];

// abrir carrinho
function toggleCart() {
  document.getElementById("cartPanel").classList.toggle("open");
}

// produtos fake (pra garantir que funcione)
const produtosFake = [
  {nome:"Tênis Nike", preco:199, imagem:"https://via.placeholder.com/200"},
  {nome:"Camisa", preco:99, imagem:"https://via.placeholder.com/200"},
  {nome:"Boné", preco:59, imagem:"https://via.placeholder.com/200"}
];

// render produtos
function renderProdutos() {
  const div = document.getElementById("produtos");

  produtosFake.forEach(p => {
    div.innerHTML += `
      <div class="card">
        <img src="${p.imagem}" width="100%">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Comprar</button>
      </div>
    `;
  });
}

// carrinho
function addToCart(p) {
  carrinho.push(p);
  localStorage.setItem("cart", JSON.stringify(carrinho));
  renderCart();
}

// render carrinho
function renderCart() {
  const div = document.getElementById("cart");
  div.innerHTML = "";

  let total = 0;

  carrinho.forEach(p => {
    total += p.preco;
    div.innerHTML += `<p>${p.nome} - R$ ${p.preco}</p>`;
  });

  div.innerHTML += `<h3>Total: R$ ${total}</h3>`;
}

// PIX
async function pagarPix() {
  const total = carrinho.reduce((acc,p)=>acc+p.preco,0);

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
    <img src="data:image/png;base64,${data.qr}" width="200"/>
    <p>${data.copiaecola}</p>
  `;
}

// iniciar
window.onload = () => {
  renderProdutos();
  renderCart();
};