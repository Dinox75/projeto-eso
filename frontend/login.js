const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // impede o recarregamento da página

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // ✅ 1. Validação simples
    if (!email || !senha) {
        msg.textContent = 'Por favor, preencha todos os campos.';
        msg.classList.add("text-danger");
        return;
    }

    try {
        // ✅ 2. Chamada correta da API Flask
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        // ✅ 3. Se resposta 200, login OK
        if (response.ok) {
            msg.innerText = "Login realizado!";
            msg.classList.remove("text-danger");
            msg.classList.add("text-success");

            // ✅ Armazena e-mail no localStorage (sessão fake)
            localStorage.setItem("user_email", email);

            // ✅ Redireciona para a loja
            setTimeout(() => {
                window.location.href = "shop.html";
            }, 1500);
        } else {
            // ⚠️ Caso erro de autenticação
            msg.innerText = data.error || "Erro ao fazer login.";
            msg.classList.remove("text-success");
            msg.classList.add("text-danger");
        }

    } catch (error) {
        // 🚨 Erro de conexão ou servidor offline
        msg.innerText = "Falha na conexão com o servidor.";
        msg.classList.remove("text-success");
        msg.classList.add("text-danger");
        console.error("Erro de conexão:", error);
    }
});
