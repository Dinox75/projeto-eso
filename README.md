🛍️ Sistema de Loja com Créditos — Desafio ESO
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

Integração completa com API pública do Fortnite

Atualização automática do estoque

Compra de itens usando créditos

Reembolso via devolução (refund)

Histórico de transações completo

🎒 Inventário do Jogador

Visualização de todos os itens adquiridos

Exibição de imagens, nomes, raridades e datas

Código preparado para devolução dos itens

📄 Geração de Histórico em PDF 

O usuário pode baixar um relatório em PDF

Inclui todas as compras, devoluções e detalhes do inventário

🎨 Frontend Modernizado 

Tema neon roxo inspirado no Fortnite

Background estilizado sem arquivos externos

Efeitos e UI melhorada

Três telas principais:

index.html (login)

register.html (cadastro)

shop.html (loja)

inventario.html (inventário)

🤖 Desenvolvimento com IA – Sem Amenizar
Este projeto foi desenvolvido em parceria direta com a IA ChatGPT (OpenAI).

Durante todo o processo, utilizei a IA como:

Guia de aprendizado

Explicação de conceitos do zero

Ajudante para estruturar rotas, modelos e banco

Suporte técnico para resolver erros reais

Auxílio para organizar o frontend e melhorar a experiência do usuário

Consultor para aplicar boas práticas

Não foi apenas inspiração — foi desenvolvimento lado a lado.
A IA participou diretamente da construção do projeto, sempre com foco educacional e com explicações detalhadas para que eu entendesse cada etapa.

Quero deixar isso totalmente claro e transparente, pois este projeto representa meu aprendizado real com apoio de tecnologia moderna.

🧠 Aprendizado Adquirido

Durante o desenvolvimento, aprendi:

Como funciona o Flask na prática

Como estruturar um backend completo

Como modelar banco de dados relacional

JWT / sessões simplificadas

Comunicação REST com Fetch API

Como consumir APIs externas

Como integrar frontend + backend corretamente

Como gerar PDFs no backend

Como criar interfaces modernas no frontend

Como trabalhar com erros reais e debug

Foi minha primeira experiência full stack real.

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

Tema neon roxo inspirado no Fortnite

Ferramentas

VS Code

Git & GitHub

MySQL Workbench

Thunder Client / Postman

🚀 Como Rodar o Projeto
1) Clonar o repositório
git clone https://github.com/Dinox75/projeto-eso.git
cd projeto-eso

2) Criar ambiente virtual
python -m venv .venv

Ativar ambiente

PowerShell:

.\.venv\Scripts\Activate.ps1

3) Instalar dependências
pip install -r backend/requirements.txt

4) Configurar MySQL

Crie o banco e as tabelas (já incluídas no README original).

5) Ajustar a conexão em models.py
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:SUA_SENHA@localhost:3306/eso_projeto"

6) Rodar o backend
cd backend
python app.py


API disponível em:
http://127.0.0.1:5000

7) Rodar o frontend

Abra frontend/index.html

🌐 Endpoints Principais

(sem alterações — conforme README original)

# 👤 Autor

**Vinicius Lima**  
Estudante de Desenvolvimento de Sistemas  
📍 Poços de Caldas — MG  

📧 vibylima75@gmail.com  

🔗 [LinkedIn](https://www.linkedin.com/in/vinicius-lima-b98100308/)  
💻 [GitHub](https://github.com/Dinox75)

🏁 Status do Projeto
Item	Status
Backend	✔ Completo
Frontend	✔ Login, Registro, Loja, Inventário
API Fortnite	✔ Sincronização ativa
Visual Fortnite Neon	✔ Finalizado
PDF com histórico	✔ Implementado
Sistema REST + MySQL	✔ Totalmente funcional

[def🔗 [LinkedIn](https://www.linkedin.com/in/vinicius-lima-b98100308/)]: https://www.linkedin.com/in/vinicius-lima-b98100308/