const lojaDiv = document.getElementById('loja');
const msg = document.getElementById('msg');

async function carregarLoja() {
    try {
        const resposta = await fetch("http://127.0.0.1:5000/loja/listar");
        const data = await resposta.json();

        lojaDiv.innerHTML = ''; // Limpa o conteúdo existente antes de atualizar

        // 🔧 Corrigido: data.itens (antes estava data.item)
        data.itens.forEach(item => {
            const card = document.createElement('div');
            card.className = "card bg-secondary text-white p-2 m-2";
            card.style.width = "200px";

            card.innerHTML = `
                <div class="card-body text-center">
                    <h6 class="card-title">${item.nome}</h6>
                    <p class="small">${item.descricao || "Sem descrição"}</p>
                    <p><strong>${item.preco} créditos</strong></p>
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

// Chama a função assim que a página carrega
carregarLoja();

async function comprarItem(cosmetico_id) {  
    const email = localStorage.getItem('user_email');

    if (!email) {
        alert("Faça login novamente.");
        window.location.href = "index.html";
        return;
    }

    try {
        // Buscar ID real do usuário via backend
        const respostaUsuario = await fetch("http://127.0.0.1:5000/usuarios");
        const dataUsuarios = await respostaUsuario.json();

        // Garante que acessamos o array interno "usuarios"
        const listaUsuarios = dataUsuarios.usuarios || [];
        const usuario = listaUsuarios.find(u => u.email === email);

        if (!usuario) {
            alert("Usuário não encontrado. Faça login novamente.");
            return;
        }

        //  Nomes exatos esperados pelo Flask
        const compra = {
            usuario_id: usuario.id,
            cosmetico_id: cosmetico_id
        };

        //  Adicionado log para debug
        console.log("Enviando compra:", compra);

        const resposta = await fetch("http://127.0.0.1:5000/loja/comprar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(compra)
        });

        const data = await resposta.json();

        if (resposta.ok) {
            //  Mostra créditos restantes
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
    window.location.href = "inventory.html";
});
window.comprarItem = comprarItem;
