const lojaDiv = document.getElementById('loja');
const msg = document.getElementById('msg');

async function carregarLoja() {
    try {
        const resposta = await fetch("http://127.0.0.1:5000/loja/listar");
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

carregarLoja();

document.getElementById('filtro').addEventListener('input', function () {
    const termo = this.value.toLowerCase();
    const cards = document.querySelectorAll('#loja .card');

    cards.forEach(card => {
        const nome = card.querySelector('.card-title').textContent.toLowerCase();
        const tipo = card.querySelector('em').textContent.toLowerCase();

        if (nome.includes(termo) || tipo.includes(termo)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});

async function comprarItem(cosmetico_id) {  
    const email = localStorage.getItem('user_email');

    if (!email) {
        alert("Faça login novamente.");
        window.location.href = "index.html";
        return;
    }

    try {
        const respostaUsuario = await fetch("http://127.0.0.1:5000/usuarios");
        const dataUsuarios = await respostaUsuario.json();
        const listaUsuarios = dataUsuarios.usuarios || [];
        const usuario = listaUsuarios.find(u => u.email === email);

        if (!usuario) {
            alert("Usuário não encontrado. Faça login novamente.");
            return;
        }

        const compra = {
            usuario_id: usuario.id,
            cosmetico_id: cosmetico_id
        };

        const resposta = await fetch("http://127.0.0.1:5000/loja/comprar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(compra)
        });

        const data = await resposta.json();

        if (resposta.ok) {
            msg.innerHTML = `✅ Compra realizada com sucesso!<br>💰 Créditos restantes: ${data.creditos_restantes}`;
            msg.classList.remove('text-danger');
            msg.classList.add('text-success');
        } else {
            msg.textContent = data.error || "Erro ao realizar a compra.";
            msg.classList.add('text-danger');
        }

    } catch (error) {
        msg.textContent = "Erro de conexão com o servidor.";
        msg.classList.add('text-danger');
        console.error("Erro de conexão:", error);
    }
}

document.getElementById("btnSair").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
});

document.getElementById("btnInventario").addEventListener("click", () => {
    window.location.href = "inventario.html"; 
});

window.comprarItem = comprarItem;
