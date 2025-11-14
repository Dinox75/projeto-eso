istema de Loja com Créditos — Desafio ESO

Projeto desenvolvido por Vinicius Lima com apoio direto da IA ChatGPT (OpenAI)

Este projeto foi criado para o processo seletivo da ESO e simula um sistema completo de loja digital inspirado em jogos como Fortnite.
Ele integra backend, frontend, banco de dados, API externa e autenticação, representando um projeto real de nível profissional — desenvolvido passo a passo em parceria com a IA, sempre com foco em aprendizado e entendimento do processo.

🧩 Funcionalidades Principais
👤 Autenticação

Cadastro de usuários

Login com validação

Avatar do usuário

Créditos iniciais automáticos

🛍️ Loja Digital

Listagem de todos os cosméticos disponíveis

Integração com API pública do Fortnite

Atualização automática do estoque

Compra de itens usando créditos

Reembolso via devolução

Histórico completo de transações

🎒 Inventário do Jogador

Visualização de todos os itens adquiridos

Exibição de imagens, nomes, raridades e datas

Sistema preparado para devoluções

📄 Geração de Histórico

Inclui compras, devoluções e detalhes de inventário

🎨 Frontend Modernizado

Tema neon roxo inspirado no Fortnite

Background estilizado sem arquivos externos

UI organizada e responsiva

Telas principais:

index.html (login)

register.html (cadastro)

shop.html (loja)

inventario.html (inventário)

🤖 Desenvolvimento com IA – Transparência Total

Este projeto foi desenvolvido em parceria direta com a IA ChatGPT (OpenAI).

A IA foi utilizada como:

Guia de aprendizado

Explicadora de conceitos

Assistente de organização do backend

Suporte para correção de erros reais

Consultora para boas práticas

Auxílio no frontend e integração

Não foi apenas inspiração — foi desenvolvimento lado a lado, com o objetivo de aprender tecnologias reais e entender cada etapa com clareza.

Sou totalmente transparente sobre isso:
Este projeto representa meu aprendizado real, apoiado por tecnologia moderna.

🧠 Aprendizado Adquirido

Durante o desenvolvimento, aprendi:

Estruturação completa de backend Flask

Modelagem de banco relacional (MySQL)

Autenticação e sessões simplificadas

Consumir APIs externas (Fortnite API)

Comunicação REST usando Fetch API

Integração frontend + backend

Geração de PDFs no backend

UI moderna e responsiva no frontend

Debugging de erros reais

Deploy (Vercel + Render + Railway)

Foi minha primeira experiência full stack completa.

🛠️ Tecnologias Utilizadas
Backend

Python 3.10+

Flask

SQLAlchemy

MySQL

Flask-CORS

Requests (API Fortnite)

ReportLab (PDF)

Frontend

HTML5

CSS3

Bootstrap

JavaScript (Fetch API)

LocalStorage

Tema neon inspirado no Fortnite

Ferramentas

VS Code

Git & GitHub

MySQL Workbench

Thunder Client

🌐 Deploy do Projeto (Atualizado)

O sistema completo está rodando online:

Frontend (Vercel)

🔗 https://projeto-eso-weld.vercel.app/

Backend (Render)

🔗 https://projeto-eso-1.onrender.com/

Banco de Dados (Railway — MySQL)

Banco remoto com tabelas:
usuarios, cosmeticos, inventarios, transacoes

Toda a integração entre frontend, backend e banco já está configurada para produção.

🚀 Como Rodar o Projeto Localmente
1) Clonar o repositório
git clone https://github.com/Dinox75/projeto-eso.git
cd projeto-eso

2) Criar ambiente virtual
python -m venv .venv


Ativar (PowerShell):

.\.venv\Scripts\Activate.ps1

3) Instalar dependências
pip install -r backend/requirements.txt

4) Configurar MySQL local

Crie o banco e as tabelas (conforme README original).

5) Ajustar conexão no models.py
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:SUA_SENHA@localhost:3306/eso_projeto"

6) Rodar o backend
cd backend
python app.py


API local disponível em:

http://127.0.0.1:5000

7) Rodar o frontend

Abra manualmente:

frontend/index.html

🌐 Endpoints Principais

(mantidos exatamente como no README original)

👤 Autor

Vinicius Lima
Estudante de Desenvolvimento de Sistemas
📍 Poços de Caldas — MG

📧 vibylima75@gmail.com

🔗 https://www.linkedin.com/in/vinicius-lima-b98100308/

💻 https://github.com/Dinox75

🏁 Status do Projeto
Item	Status
Backend	✔ Completo
Frontend	✔ Login, Registro, Loja, Inventário
API Fortnite	✔ Sincronização ativa
Visual Fortnite Neon	✔ Finalizado
PDF com histórico	✔ Implementado
Sistema REST + MySQL	✔ Totalmente funcional