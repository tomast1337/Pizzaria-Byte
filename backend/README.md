# Pizzaria-On BACKEND

Nesta Pasta esta o backend do projeto.

## Rodar o Backend

Para rodar o backend e necessário definir essas variáveis no arquivo `.env`:

```ini
JWT_SECRET={TOKEN_SECRET}
MONGODB_URI=mongodb://{username}:{password}@localhost:{port}/pizzariaOn?authSource=admin
```

Opcional para debugar o backend:

```ini
DEBUG=express:*
```

### Observações sobre o Banco de Dados MongoDB

Para o banco de dados, é necessário ter um servidor MongoDB. Recomendo usar o MongoDB Atlas ou Um Container Docker.

Para criar o container do MongoDB, é necessário ter o Docker instalado, e o setup ocorre dessa forma:

```bash
docker pull mongo
docker run -d -p {port}:{port} \
 --name mongo  \
 -e MONGO_INITDB_ROOT_USERNAME={username} \
 -e MONGO_INITDB_ROOT_PASSWORD={password} \
  mongo
```
Troque {port} pelo porta que deseja usar,
{username} pelo username do banco de dados,
{password} pelo password do banco de dados.

Apos isso é necessário ainda criar o banco de dados com o nome `pizzariaOn` no MongoDB.

Com o Docker:

```bash
docker exec -it mongo mongo --username {username} --password {password}

use pizzariaOn


db.createCollection("ingredientes")
db.createCollection("pedidos")
db.createCollection("pizzas")
db.createCollection("produtos")
db.createCollection("usuarios")

exit
```

Com o MongoDB Atlas: (Não Tenho Conhecimento sobre o MongoDB Atlas)
```bash
mongo --username {username} --password {password}

use pizzariaOn


db.createCollection("ingredientes")
db.createCollection("pedidos")
db.createCollection("pizzas")
db.createCollection("produtos")
db.createCollection("usuarios")

exit
```


Apos isso é possível acessar o banco de dados pelo seguinte endereço:

```bash
mongodb://{username}:{password}@localhost:{port}/pizzariaOn?authSource=admin
```