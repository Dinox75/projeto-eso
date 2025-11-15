const lojaDiv = document.getElementById('loja');
const msg = document.getElementById('msg');

const API_URL = "https://projeto-eso-1.onrender.com";

const email = localStorage.getItem('user_email');
const estaLogado = !!email;

// ---------------------- CONTROLE DE BOTÕES ----------------------
if (!estaLogado) {
    document.getElementById("btnInventario").style.display = "none";
    document.getElementById("btnSair").style.display = "none";
    document.getElementById("btnHistorico").style.display = "none";
    document.getElementById("btnLogin").style.display = "inline-block";
} else {
    document.getElementById("btnLogin").style.display = "none";
}

// ---------------------- PEGAR USUÁRIO PELO EMAIL ----------------------
async function carregarUsuario() {
    if (!email) return null;

    const resp = await fetch(`${API_URL}/usuarios/email/${email}`);
    const data = await resp.json();

    if (resp.ok) {
        // Salva o ID do usuário para compras e inventário
        localStorage.setItem("user_id", data.id);

        // Atualiza créditos na tela
        document.getElementById("creditos-valor").textContent = data.creditos;

        return data;
    }

    return null;
}

// ---------------------- CARREGAR LOJA ----------------------
async function carregarLoja() {
    try {
        const resposta = await fetch(`${API_URL}/loja/listar`);
        const data = await resposta.json();

        lojaDiv.innerHTML = '';

        data.itens.forEach(item => {
            const card = document.createElement('div');
            card.className = "card bg-secondary text-white p-2 m-2";
            card.style.width = "200px";

            card.innerHTML = `
                <div class="card-body text-center">
                    <img src="${item.imagem_url || 'https://via.placeholder.com/150'}"
                        alt="${item.nome}"
                        class="img-fluid rounded mb-2"
                        style="max-height: 120px; object-fit: contain;">
                    <h6 class="card-title">${item.nome}</h6>
                    <p class="small">${item.descricao || "Sem descrição"}</p>
                    <p><strong>${item.preco} créditos</strong></p>
                    <p><em>${item.raridade || "Comum"}</em></p>
                    <button class="btn btn-warning btn-sm" onclick="comprarItem(${item.id})">Comprar</button>
                </div>
            `;

            lojaDiv.appendChild(card);
        });

    } catch (error) {
        msg.textContent = "Erro ao carregar a loja.";
        msg.classList.add('text-danger');
        console.error("Erro ao carregar loja:", error);
    }
}

// ---------------------- FILTRO ----------------------
document.getElementById('filtro').addEventListener('input', function () {
    const termo = this.value.toLowerCase();
    const cards = document.querySelectorAll('#loja .card');

    cards.forEach(card => {
        const nome = card.querySelector('.card-title').textContent.toLowerCase();
        const tipo = card.querySelector('em').textContent.toLowerCase();

        card.style.display = (nome.includes(termo) || tipo.includes(termo)) ? '' : 'none';
    });
});

// ---------------------- COMPRAR ITEM ----------------------
async function comprarItem(cosmetico_id) {  
    if (!estaLogado) {
        alert("É necessário fazer login para comprar itens.");
        window.location.href = "index.html";
        return;
    }

    const usuario_id = localStorage.getItem("user_id");

    if (!usuario_id) {
        alert("Erro ao identificar usuário. Faça login novamente.");
        window.location.href = "index.html";
        return;
    }

    const compra = {
        usuario_id: Number(usuario_id),
        cosmetico_id: cosmetico_id
    };

    const resposta = await fetch(`${API_URL}/loja/comprar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compra)
    });

    const data = await resposta.json();

    if (resposta.ok) {
        msg.innerHTML = `Compra realizada com sucesso!<br>Créditos restantes: ${data.creditos_restantes}`;
        msg.classList.remove('text-danger');
        msg.classList.add('text-success');

        // Atualiza créditos no topo
        document.getElementById("creditos-valor").textContent = data.creditos_restantes;

    } else {
        msg.textContent = data.error || "Erro ao realizar a compra.";
        msg.classList.add('text-danger');
    }
}

// ---------------------- BOTÕES ----------------------
document.getElementById("btnLogin").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.getElementById("btnSair").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
});

document.getElementById("btnInventario").addEventListener("click", () => {
    window.location.href = "inventario.html"; 
});

document.getElementById("btnHistorico").addEventListener("click", () => {
    window.location.href = "historico.html";
});

// ---------------------- INICIALIZAÇÃO ----------------------
window.onload = async () => {
    await carregarUsuario();   
    await carregarLoja();
};

window.comprarItem = comprarItem;
