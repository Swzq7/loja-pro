const API = "https://loja-backend-jmci.onrender.com";

let carrinho = JSON.parse(localStorage.getItem("cart")) || [];

// NAV
function goCart(){ location.href="cart.html"; }
function goHome(){ location.href="index.html"; }
function goCheckout(){ location.href="checkout.html"; }

// PRODUTOS
const produtos = [
  {nome:"Tênis Nike", preco:199, imagem:"https://via.placeholder.com/300"},
  {nome:"Camisa Premium", preco:129, imagem:"https://via.placeholder.com/300"},
  {nome:"Moletom", preco:249, imagem:"https://via.placeholder.com/300"}
];

function renderProdutos(){
  const div = document.getElementById("produtos");
  if(!div) return;

  produtos.forEach((p,i)=>{
    div.innerHTML += `
      <div class="card">
        <img src="${p.imagem}">
        <div class="card-body">
          <h3>${p.nome}</h3>
          <div class="price">R$ ${p.preco}</div>

          <input type="number" id="qtd-${i}" value="1" min="1">

          <button class="btn" onclick="addToCart(${i})">
            Comprar
          </button>
        </div>
      </div>
    `;
  });
}

// CARRINHO
function addToCart(i){
  const qtd = parseInt(document.getElementById(`qtd-${i}`).value);
  carrinho.push({...produtos[i], qtd});
  localStorage.setItem("cart", JSON.stringify(carrinho));
  alert("Adicionado!");
}

function renderCart(){
  const div = document.getElementById("cart");
  if(!div) return;

  let total=0;
  div.innerHTML="";

  carrinho.forEach((p,i)=>{
    total += p.preco*p.qtd;

    div.innerHTML += `
      <p>${p.nome} x${p.qtd} - R$ ${p.preco*p.qtd}</p>
    `;
  });

  div.innerHTML += `<h3>Total: R$ ${total}</h3>`;
}

// PIX
async function pagarPix(){
  const total = carrinho.reduce((t,p)=>t+(p.preco*p.qtd),0);
  document.getElementById("total").innerText="R$ "+total;

  const res = await fetch(API+"/payment/pix",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({total,email:"teste@email.com"})
  });

  const data = await res.json();

  document.getElementById("pix").innerHTML = `
    <img src="data:image/png;base64,${data.qr}" width="250"/>
    <textarea id="pixCode">${data.copiaecola}</textarea>
    <button onclick="copiarPix()">Copiar PIX</button>
  `;
}

function copiarPix(){
  const text = document.getElementById("pixCode");
  navigator.clipboard.writeText(text.value);
  alert("Copiado!");
}

// SCROLL
function scrollToProducts(){
  document.getElementById("produtos").scrollIntoView({behavior:"smooth"});
}

// INIT
window.onload=()=>{
  renderProdutos();
  renderCart();
};