from flask import Flask, request
from flask_cors import CORS
from models import init_db, User, db, Cosmetico, Inventario, Transacao  # ✅ Importar Transacao
from werkzeug.security import generate_password_hash, check_password_hash
import requests

app = Flask(__name__)
CORS(app)
init_db(app)

# ---------------------- ROTAS PRINCIPAIS ----------------------

@app.route("/")
def index():
    return {"message": "API do desafio - está rodando!"}

# ---------------------- REGISTRO ----------------------

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")

    if not nome or not email or not senha:
        return {"error": "Nome, email e senha são obrigatórios."}, 400

    usuario_existente = User.query.filter_by(email=email).first()
    if usuario_existente:
        return {"error": "Email já está em uso."}, 400

    senha_hash = generate_password_hash(senha, method='pbkdf2:sha256')
    novo_usuario = User(nome=nome, email=email, senha=senha_hash)

    db.session.add(novo_usuario)
    db.session.commit()

    return {"message": "Usuário registrado com sucesso!"}, 201

# ---------------------- LOGIN ----------------------

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    senha = data.get("senha")

    if not email or not senha:
        return {"error": "Email e senha são obrigatórios."}, 400
    
    usuario = User.query.filter_by(email=email).first()
    if not usuario or not check_password_hash(usuario.senha, senha):
        return {"error": "Credenciais inválidas."}, 401
    
    return {"message": "Login bem-sucedido!"}, 200

# ---------------------- LISTAR COSMÉTICOS ----------------------

@app.route("/loja/listar", methods=["GET"])
def listar_cosmeticos():
    itens = Cosmetico.query.all()
    resultado = []
    for item in itens:
        resultado.append({
            "id": item.id,
            "nome": item.nome,
            "descricao": item.descricao,
            "preco": item.preco,
            "tipo": item.tipo,
            "raridade": item.raridade,        
            "imagem_url": item.imagem_url     
        })
    return {"itens": resultado}, 200

# ---------------------- COMPRAR ----------------------

@app.route("/loja/comprar", methods=["POST"])
def comprar():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    cosmetico_id = data.get("cosmetico_id")

    if not usuario_id or not cosmetico_id:
        return {"error": "usuario_id e cosmetico_id são obrigatórios."}, 400
    
    usuario = User.query.get(usuario_id)
    cosmetico = Cosmetico.query.get(cosmetico_id)

    if not usuario or not cosmetico:
        return {"error": "Usuário ou cosmético não encontrado."}, 404
    if not cosmetico.ativo:
        return {"error": "Este cosmético não está disponível para compra."}, 400
    if usuario.creditos < cosmetico.preco:
        return {"error": "Créditos insuficientes."}, 400

    # Evita duplicar item no inventário
    item_existente = Inventario.query.filter_by(usuario_id=usuario.id, cosmetico_id=cosmetico.id).first()
    if item_existente:
        return {"error": "Você já possui este item."}, 400

    usuario.creditos -= cosmetico.preco
    novo_item = Inventario(usuario_id=usuario.id, cosmetico_id=cosmetico.id)
    db.session.add(novo_item)

    # Registrar transação
    transacao = Transacao(
        usuario_id=usuario.id,
        cosmetico_id=cosmetico.id,
        tipo_operacao="compra",
        valor=cosmetico.preco
    )
    db.session.add(transacao)

    db.session.commit()

    return {
        "message": "Compra realizada com sucesso!",
        "usuario_id": usuario.id,
        "cosmetico_id": cosmetico.id,
        "creditos_restantes": usuario.creditos
    }, 201

# ---------------------- DEVOLVER ----------------------

@app.route("/loja/devolver", methods=["POST"])
def devolver():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    cosmetico_id = data.get("cosmetico_id")

    if not usuario_id or not cosmetico_id:
        return {"error": "usuario_id e cosmetico_id são obrigatórios."}, 400

    item_inventario = Inventario.query.filter_by(usuario_id=usuario_id, cosmetico_id=cosmetico_id).first()
    if not item_inventario:
        return {"error": "Item não encontrado no inventário do usuário."}, 404

    cosmetico = Cosmetico.query.get(cosmetico_id)
    usuario = User.query.get(usuario_id)
    if not cosmetico or not usuario:
        return {"error": "Usuário ou cosmético não encontrado."}, 404

    usuario.creditos += cosmetico.preco
    db.session.delete(item_inventario)

    # Registrar transação 
    transacao = Transacao(
        usuario_id=usuario.id,
        cosmetico_id=cosmetico.id,
        tipo_operacao="devolucao",
        valor=cosmetico.preco
    )
    db.session.add(transacao)
    db.session.commit()

    return {"message": "Devolução realizada com sucesso!"}, 200

# ---------------------- INVENTÁRIO ----------------------

@app.route("/inventario/<int:usuario_id>", methods=["GET"])
def listar_inventario(usuario_id):
    itens = Inventario.query.filter_by(usuario_id=usuario_id).all()
    resultado = []
    for item in itens:
        resultado.append({
            "id": item.cosmetico.id,
            "nome": item.cosmetico.nome,
            "descricao": item.cosmetico.descricao,
            "preco": item.cosmetico.preco,
            "tipo": item.cosmetico.tipo,
            "imagem_url": item.cosmetico.imagem_url,  # 👈 ADICIONADO AQUI
            "data_compra": item.data_compra
        })

    return {"usuario_id": usuario_id, "inventario": resultado}, 200

# ---------------------- HISTÓRICO DE TRANSAÇÕES ----------------------

@app.route("/transacoes/<int:usuario_id>", methods=["GET"])
def listar_transacoes(usuario_id):
    transacoes = Transacao.query.filter_by(usuario_id=usuario_id).order_by(Transacao.data_hora.desc()).all()
    resultado = []
    for t in transacoes:
        resultado.append({
            "id": t.id,
            "cosmetico": t.cosmetico.nome,
            "tipo_operacao": t.tipo_operacao,
            "valor": t.valor,
            "data_hora": t.data_hora.strftime("%d/%m/%Y %H:%M")
        })
    return {"usuario_id": usuario_id, "transacoes": resultado}, 200

# ---------------------- SYNC FORTNITE ----------------------

@app.route("/sync/fortnite", methods=["GET"])
def sync_fortnite():
    url = "https://fortnite-api.com/v2/cosmetics/br"
    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "Falha ao acessar API Fortnite"}, 500

    dados = response.json()
    itens = dados.get("data", [])

    for item in itens:
        nome = item.get("name")
        descricao_raw = item.get("description", "")
        descricao = descricao_raw if isinstance(descricao_raw, str) else str(descricao_raw)

        # 🧩 Tipo
        tipo_info = item.get("type", {})
        tipo = tipo_info.get("value") if isinstance(tipo_info, dict) else tipo_info
        if not isinstance(tipo, str):
            tipo = str(tipo)

        # ⭐ Raridade
        raridade_info = item.get("rarity", {})
        raridade = raridade_info.get("value") if isinstance(raridade_info, dict) else raridade_info
        if not isinstance(raridade, str):
            raridade = str(raridade)

        # 🖼️ Imagem (corrigido e seguro)
        imagem_info = item.get("images", {})
        imagem_url = ""
        if isinstance(imagem_info, dict):
            imagem_url = (
                imagem_info.get("featured")
                or imagem_info.get("icon")
                or imagem_info.get("smallIcon")
                or ""
            )

        # 💰 Preço baseado na raridade
        precos = {
            "common": 300,
            "uncommon": 400,
            "rare": 600,
            "epic": 800,
            "legendary": 1000
        }
        preco = precos.get(raridade.lower(), 500) if isinstance(raridade, str) else 500

        # 🔍 Verifica se o cosmético já existe
        cosmetico_existente = Cosmetico.query.filter_by(nome=nome).first()

        if cosmetico_existente:
            cosmetico_existente.descricao = descricao
            cosmetico_existente.tipo = tipo
            cosmetico_existente.raridade = raridade
            cosmetico_existente.imagem_url = imagem_url  # ✅ agora sempre tem valor
            cosmetico_existente.ativo = True
        else:
            novo_cosmetico = Cosmetico(
                nome=nome,
                descricao=descricao,
                preco=preco,
                tipo=tipo,
                raridade=raridade,
                imagem_url=imagem_url,
                ativo=True
            )
            db.session.add(novo_cosmetico)

    db.session.commit()
    return {"message": "Sincronização concluída com sucesso!"}, 200



# ---------------------- USUÁRIOS ----------------------

@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
    usuarios = User.query.all()
    resultado = []
    for usuario in usuarios:
        resultado.append({
            "id": usuario.id,
            "nome": usuario.nome,
            "email": usuario.email,
            "creditos": usuario.creditos
        })
    return {"usuarios": resultado}, 200

@app.route("/initdb")
def initdb():
    from models import db
    db.create_all()
    return "Banco criado!"


# ---------------------- MAIN ----------------------

if __name__ == "__main__":
    app.run(debug=True)
