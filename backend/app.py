from flask import Flask, request
from models import init_db, User, db, Cosmetico, Inventario
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

app = Flask(__name__)
init_db(app)

@app.route("/")
def index():
    return {"message": "API do desafio - esta rodando!"}

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

    new_user = User(nome=nome, email=email, senha=senha_hash)

    db.session.add(new_user)
    db.session.commit()

    return {"message": "Usuário registrado com sucesso!"}, 201

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
        "tipo": item.tipo
    })
    return {"itens": resultado}, 200  

@app.route("/loja/comprar", methods=["POST"])
def comprar():
    data = request.get_json()

    usuario_id = data.get("usuario_id")
    cosmetico_id = data.get("cosmetico_id")

    # Validação de campos obrigatórios
    if not usuario_id or not cosmetico_id:
        return {"error": "usuario_id e cosmetico_id são obrigatórios."}, 400
    
    # Buscar usuário e cosmético no banco
    usuario = User.query.get(usuario_id)
    cosmetico = Cosmetico.query.get(cosmetico_id)

    if not usuario or not cosmetico:
        return {"error": "Usuário ou cosmético não encontrado."}, 404

    # Verificar se o cosmético está ativo
    if not cosmetico.ativo:
        return {"error": "Este cosmético não está disponível para compra."}, 400
    
    # Verificar créditos suficientes
    if usuario.creditos < cosmetico.preco:
        return {"error": "Créditos insuficientes."}, 400
    
    # Deduz créditos
    usuario.creditos -= cosmetico.preco

    # Registrar item no inventário
    novo_item = Inventario(usuario_id=usuario.id, cosmetico_id=cosmetico.id)
    db.session.add(novo_item)

    # Salvar alterações
    db.session.commit()

    return {
        "message": "Compra realizada com sucesso!",
        "usuario_id": usuario.id,
        "cosmetico_id": cosmetico.id,
        "creditos_restantes": usuario.creditos
    }, 201

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
    db.session.commit()

    return {
        "message": "Devolução realizada com sucesso!",}, 200

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
            "data_compra": item.data_compra
        })
    return {"usuario_id": usuario_id, "inventario": resultado}, 200


if __name__ == "__main__":
    app.run(debug=True)
