const form = document.getElementById('registerForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!nome || !email || !senha) {
    msg.textContent = 'Preencha todos os campos.';
    msg.className = 'text-warning';
    return;
  }

  try {
    const res = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user_email', email);
      window.location.href = 'shop.html';
    } else {
      msg.textContent = data.error || 'Erro ao cadastrar.';
      msg.className = 'text-danger';
    }
  } catch (err) {
    msg.textContent = 'Erro de conexão.';
    msg.className = 'text-danger';
  }
});
