🛍️ Sistema de Loja com Créditos — Desafio ESO

Este projeto foi desenvolvido para o processo seletivo da ESO e simula um sistema de economia digital simples, onde:

Usuários podem se cadastrar e fazer login

Recebem créditos iniciais

Podem comprar itens cosméticos com esses créditos

Possuem um inventário pessoal para armazenar suas compras

Podem devolver itens e recuperar créditos

Itens são sincronizados com a API pública do Fortnite

Todos os dados são armazenados em um banco relacional (MySQL)

A aplicação foi construída com Python (Flask + SQLAlchemy) no backend e HTML, CSS e JavaScript (Fetch API) no frontend.

🚀 Como rodar o projeto
✅ Pré-requisitos

Python 3.10+

MySQL / MySQL Workbench

Git

(Opcional) Thunder Client ou Postman

Navegador moderno (Google Chrome ou Edge)

📥 1) Clonar o repositório
git clone https://github.com/Dinox75/projeto-eso.git
cd projeto-eso

🏗️ 2) Criar e ativar ambiente virtual
python -m venv .venv


Windows PowerShell:

.\.venv\Scripts\Activate.ps1


Windows CMD:

.\.venv\Scripts\activate.bat


Linux / macOS:

source .venv/bin/activate

📦 3) Instalar dependências
pip install -r backend/requirements.txt

🗄️ 4) Configurar o banco de dados MySQL
CREATE DATABASE IF NOT EXISTS eso_projeto;
USE eso_projeto;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    creditos INT DEFAULT 10000,
    avatar_url VARCHAR(255),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cosmeticos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    preco INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criado DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    cosmetico_id INT NOT NULL,
    data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (cosmetico_id) REFERENCES cosmeticos(id)
);

🔧 5) Configurar conexão MySQL

No arquivo backend/models.py:

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:SUA_SENHA@localhost:3306/eso_projeto"


Substitua SUA_SENHA pela sua senha do MySQL.

▶️ 6) Executar a aplicação (backend)
cd backend
python app.py


A API estará disponível em:

http://127.0.0.1:5000

🌐 7) Executar o frontend

Abra o arquivo frontend/index.html no navegador
ou use a extensão Live Server no VS Code para executar localmente.

📡 API Endpoints
Autenticação
Método	Endpoint	Descrição
GET	/	Healthcheck
POST	/register	Criar usuário
POST	/login	Login
Loja
Método	Endpoint	Descrição
GET	/loja/listar	Listar itens disponíveis
POST	/loja/comprar	Comprar item
POST	/loja/devolver	Devolver item
GET	/inventario/<id>	Ver inventário do usuário
Integração Externa
Método	Endpoint	Descrição
GET	/sync/fortnite	Sincronizar itens da API do Fortnite
💻 Funcionalidades do Frontend
🔐 Login (index.html)

Faz login do usuário autenticado via API

Salva sessão local (localStorage)

Redireciona para a loja

🛒 Loja (shop.html)

Lista todos os cosméticos disponíveis

Permite comprar itens com créditos

Atualiza saldo em tempo real

🎒 Inventário (inventory.html)

(Em desenvolvimento) Mostra os itens comprados

Permite devolver itens e recuperar créditos

📚 Sobre o Desenvolvimento e Aprendizado

Este projeto representa uma etapa prática do meu aprendizado em desenvolvimento de sistemas.
Antes dele, eu não tinha conhecimento sobre Flask, SQLAlchemy ou integração de APIs.
Durante o processo, estudei, testei, errei, corrigi e evoluí a cada etapa — e o resultado é este sistema funcional.

Mais do que apenas cumprir o desafio, o objetivo foi aprender construindo: entender a lógica, o fluxo entre backend e frontend, e como estruturar um projeto real com banco de dados e API.

Cada parte escrita reflete meu progresso, curiosidade e dedicação em aprender desenvolvimento web na prática.

🤖 Uso do ChatGPT como Ferramenta Educacional

Durante o desenvolvimento, utilizei o ChatGPT (OpenAI) como uma ferramenta de apoio ao aprendizado.
A IA foi usada para:

Explicar conceitos passo a passo (Flask, SQLAlchemy, rotas, etc.)

Me guiar na estrutura do código

Ajudar a entender erros e boas práticas

Reforçar meu aprendizado com exemplos e comparações

Não foi uma substituição do meu esforço, mas um suporte didático, me ajudando a aprender e desenvolver um projeto funcional mesmo sem experiência prévia nessas tecnologias.

Este projeto é, portanto, um marco no meu desenvolvimento — o início da minha jornada prática em desenvolvimento backend e integração de sistemas reais.

🛠️ Stack Tecnológica

Python 3.10+

Flask + SQLAlchemy

MySQL / MySQL Workbench

HTML5, CSS3, JavaScript (Fetch API)

Thunder Client / Postman

Git & GitHub

VS Code

👤 Autor

Vinicius Lima
Estudante de Desenvolvimento de Sistemas
Poços de Caldas — MG

📧 vibylima75@gmail.com

🔗 LinkedIn

💻 GitHub

🏁 Status do Projeto

✅ Backend completo
✅ Frontend funcional (Login + Loja)
🟡 Inventário visual (em desenvolvimento)
🚀 Sistema 100% funcional via API REST + MySQL