# Atividade de Microsserviços
### Professor: Edilson Jesus da Silva

---

Banco de dados: MongoDB

Após inicializar o serviço do MongoDB, vá nos arquivos:
``Usuarios/src/config/servidor.js`` e ``Financeiro/src/config/servidor.js``
e altere a linha: 
```js
const db_path = "mongodb://localhost:27017/db_users?retryWrites=true&w=majority"
```
Colocando seu banco de dados local

---

Para funcionar, entre nas pastas Usuarios/Financeiro e execute os seguintes comandos:

```shell
npm install // Instalando as dependências
npm run dev // Executando o sistema 
```

---

**Usuários - Rotas:**

[POST] Cadastrar: ``http://localhost:11900/Usuario/register`` 

[POST] Autenticar: ``http://localhost:11900/auth``

[GET] Listar: ``http://localhost:11900/Usuario --header token=``

[POST] Alterar senha: ``http://localhost:11900/Usuario/update-password  --header token=``

**Financeiro - Rotas**

[POST] Cadastrar: ``http://localhost:11901/Financeiro/  --header token=``

[PUT] Alterar: ``http://localhost:11901/Financeiro/:id  --header token=``

[GET] Listar: ``http://localhost:11901/Financeiro  --header token=``
