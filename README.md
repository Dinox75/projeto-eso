🛍️ Sistema de Loja com Créditos — Desafio ESO

Este projeto foi desenvolvido para o processo seletivo da ESO e simula um sistema de economia digital inspirado em jogos, onde:

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

🏗️ 2) Criar e ativar o ambiente virtual
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
    raridade VARCHAR(50),
    imagem_url VARCHAR(255),
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

CREATE TABLE IF NOT EXISTS transacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    cosmetico_id INT NOT NULL,
    tipo_operacao VARCHAR(50) NOT NULL,
    valor INT NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (cosmetico_id) REFERENCES cosmeticos(id)
);

🔧 5) Configurar a conexão MySQL

No arquivo backend/models.py, ajuste:

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:SUA_SENHA@localhost:3306/eso_projeto"


Substitua SUA_SENHA pela sua senha do MySQL.

▶️ 6) Executar o backend
cd backend
python app.py


A API estará disponível em:
👉 http://127.0.0.1:5000

🌐 7) Executar o frontend

Abra o arquivo:

frontend/index.html


ou use a extensão Live Server do VS Code para rodar o projeto localmente.

📡 API Endpoints
🧑‍💻 Autenticação
Método	Endpoint	Descrição
GET	/	Healthcheck
POST	/register	Criar usuário
POST	/login	Login
🛒 Loja
Método	Endpoint	Descrição
GET	/loja/listar	Listar itens disponíveis
POST	/loja/comprar	Comprar item
POST	/loja/devolver	Devolver item
GET	/inventario/<id>	Ver inventário do usuário
GET	/transacoes/<id>	Ver histórico de transações
🎮 Integração Externa
Método	Endpoint	Descrição
GET	/sync/fortnite	Sincronizar itens da API Fortnite
💻 Funcionalidades do Frontend
🔐 Login (index.html)

Faz login do usuário autenticado via API

Salva sessão local (LocalStorage)

Redireciona para a loja

🛍️ Loja (shop.html)

Lista todos os cosméticos sincronizados

Exibe nome, descrição, preço, raridade e imagem

Permite comprar itens e atualiza créditos

🎒 Inventário (inventario.html)

Lista todos os itens comprados

Mostra imagens, nomes e valores

Exibe data da compra

Em breve: devolver itens com reembolso automático

📚 Sobre o Desenvolvimento e Aprendizado

Este projeto representa uma etapa prática e de aprendizado real no meu desenvolvimento como programador.

Antes dele, eu não possuía experiência com Flask, SQLAlchemy ou integração de APIs.
Durante o processo, aprendi tudo na prática:

Entendi o fluxo entre backend e frontend

Corrigi erros de integração com o banco

Modelei entidades e rotas RESTful

Implementei sincronização com uma API externa

Cada commit foi uma evolução, e o resultado é um sistema funcional que une conceitos de backend, banco de dados e web.

🤖 Uso do ChatGPT como Ferramenta Educacional

Durante o desenvolvimento, utilizei o ChatGPT (OpenAI) como ferramenta de aprendizado guiado —
não para gerar o projeto pronto, mas para entender cada parte da construção.

O ChatGPT ajudou a:

Explicar conceitos (Flask, SQLAlchemy, rotas, CORS, etc.)

Orientar correções e boas práticas

Ajudar a estruturar o código de forma organizada

Reforçar o raciocínio lógico de um projeto real

Esse processo foi essencial para aprender de forma ativa, aplicando cada conceito na prática.

🛠️ Stack Tecnológica

Backend

Python 3.10+

Flask + SQLAlchemy

MySQL + Connector

Flask-CORS

Requests (API Fortnite)

Frontend

HTML5, CSS3, Bootstrap

JavaScript (Fetch API)

LocalStorage

Ferramentas

VS Code

Git & GitHub

MySQL Workbench

Thunder Client / Postman

👤 Autor

Vinicius Lima
Estudante de Desenvolvimento de Sistemas
📍 Poços de Caldas — MG

📧 vibylima75@gmail.com

🔗 LinkedIn

💻 GitHub

🏁 Status do Projeto

✅ Backend completo
✅ Frontend funcional (Login + Loja + Inventário com imagens)
✅ Integração com API Fortnite
🚀 Sistema 100% funcional via API REST + MySQL