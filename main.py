from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

user_name = "Usuário"


def ai(msg):
    global user_name
    msg = msg.lower()

    if "me chame de" in msg:
        user_name = msg.split("me chame de")[1].strip()
        return f"Perfeito 👍 agora te chamo de {user_name}"

    if "oi" in msg or "olá" in msg:
        return f"Olá {user_name} 👋 Seja bem-vindo(a)"

    if any(x in msg for x in ["triste", "medo", "ansioso", "sozinho"]):
        return f"Ei {user_name} 💜 respira. Vai ficar tudo bem."

    if "znt" in msg:
        return """ZNT:

Start Code
show "Olá mundo"

let nome = "Rin"

if nome == "Rin"
    show "Bem-vindo Rin"
else
    show "Usuário"
"""

    if "codigo" in msg:
        return """function hello(){
    show "Olá mundo"
}"""

    if "quem é você" in msg:
        return "Sou a Aringe 🤖"

    return "Entendi 👀 pode explicar melhor?"


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    msg = data.get("message")

    response = ai(msg)

    return jsonify({
        "response": response
    })


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True, use_reloader=False)
