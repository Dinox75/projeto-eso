const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede recarregar a página

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
        msg.textContent = '⚠️ Por favor, preencha todos os campos.';
        msg.classList.add('text-warning');
        return;
    }

    try {
        const response = await fetch("https://projeto-eso-1.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            msg.innerHTML = "✅ Login realizado com sucesso!";
            msg.classList.remove("text-danger");
            msg.classList.add("text-success");

            // Armazenar o email do usuário logado
            localStorage.setItem("user_email", email);

            // Redirecionar para a loja
            setTimeout(() => {
                window.location.href = "shop.html";
            }, 1200);
        } else {
            msg.textContent = data.error || "❌ Erro ao fazer login.";
            msg.classList.add("text-danger");
        }

    } catch (error) {
        msg.textContent = "⚠️ Falha na conexão com o servidor.";
        msg.classList.add("text-danger");
        console.error("Erro no login:", error);
    }
});
