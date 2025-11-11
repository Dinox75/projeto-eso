const inventarioDiv = document.getElementById('inventario');
const msg = document.getElementById('msg');

async function carregarInventario() {
    const email = localStorage.getItem('user_email');

    if (!email) {
        msg.textContent = "⚠️ Faça login novamente.";
        msg.classList.add('text-warning');
        return;
    }

    try {
        const respostaUsuarios = await fetch("http://127.0.0.1:5000/usuarios");
        const dataUsuarios = await respostaUsuarios.json();
        const listaUsuarios = dataUsuarios.usuarios || [];

        const usuario = listaUsuarios.find(u => u.email === email);
        if (!usuario) {
            msg.textContent = "Usuário não encontrado.";
            return;
        }

        const resposta = await fetch(`http://127.0.0.1:5000/inventario/${usuario.id}`);
        const data = await resposta.json();

        inventarioDiv.innerHTML = '';

        if (!data.inventario || data.inventario.length === 0) {
            msg.textContent = "Seu inventário está vazio.";
            return;
        }

        data.inventario.forEach(item => {
            const card = document.createElement('div');
            card.className = "card bg-dark text-white p-2 m-2";
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
                    <p><em>${item.tipo}</em></p>
                    <button class="btn btn-danger btn-sm mt-2" onclick="devolverItem(${item.id})">Devolver</button>
                </div>
            `;
            inventarioDiv.appendChild(card);
        });

    } catch (error) {
        msg.textContent = "Erro ao carregar inventário.";
        msg.classList.add('text-danger');
        console.error("Erro inventário:", error);
    }
}

async function devolverItem(cosmetico_id) {
    const email = localStorage.getItem('user_email');

    if (!email) {
        alert("Faça login novamente.");
        window.location.href = "index.html";
        return;
    }

    try {
        const respostaUsuarios = await fetch("http://127.0.0.1:5000/usuarios");
        const dataUsuarios = await respostaUsuarios.json();
        const listaUsuarios = dataUsuarios.usuarios || [];

        const usuario = listaUsuarios.find(u => u.email === email);
        if (!usuario) {
            alert("Usuário não encontrado. Faça login novamente.");
            return;
        }

        const devolucao = {
            usuario_id: usuario.id,
            cosmetico_id: cosmetico_id
        };

        const resposta = await fetch("http://127.0.0.1:5000/loja/devolver", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(devolucao)
        });

        const data = await resposta.json();

        if (resposta.ok) {
            alert("Item devolvido com sucesso!");
            carregarInventario();
        } else {
            alert(data.error || "Erro ao devolver item.");
        }

    } catch (error) {
        console.error("Erro ao devolver item:", error);
        alert("Erro de conexão com o servidor.");
    }
}

carregarInventario();

document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "shop.html";
});
