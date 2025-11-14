const divTransacoes = document.getElementById("transacoes");

async function carregarHistorico() {
    const email = localStorage.getItem("user_email");

    if (!email) {
        divTransacoes.innerHTML = "<p class='text-warning'>Faça login novamente.</p>";
        return;
    }

    try {
        const respostaUsuarios = await fetch("https://projeto-eso-1.onrender.com/usuarios");
        const dataUsuarios = await respostaUsuarios.json();
        const usuarios = dataUsuarios.usuarios || [];

        const usuario = usuarios.find(u => u.email === email);

        if (!usuario) {
            divTransacoes.innerHTML = "<p class='text-danger'>Usuário não encontrado.</p>";
            return;
        }

        const resposta = await fetch(`https://projeto-eso-1.onrender.com/transacoes/${usuario.id}`);
        const data = await resposta.json();

        if (!data.transacoes || data.transacoes.length === 0) {
            divTransacoes.innerHTML = "<p class='text-info'>Nenhuma transação registrada.</p>";
            return;
        }

        let html = `
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.transacoes.forEach(t => {
            html += `
                <tr>
                    <td>${t.cosmetico}</td>
                    <td>${t.tipo_operacao}</td>
                    <td>${t.valor} créditos</td>
                    <td>${t.data_hora}</td>
                </tr>
            `;
        });

        html += "</tbody></table>";

        divTransacoes.innerHTML = html;

    } catch (error) {
        divTransacoes.innerHTML = "<p class='text-danger'>Erro ao carregar histórico.</p>";
        console.error(error);
    }
}

carregarHistorico();

document.getElementById("btnVoltar").addEventListener("click", () => {
    window.location.href = "shop.html";
});
