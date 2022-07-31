# Pizzaria-On BACKEND

Nesta Pasta esta o backend do projeto.

## Rodar o Backend

Para rodar o backend e necessário definir essas variáveis no arquivo `.env`:

```ini
JWT_SECRET={TOKEN_SECRET}
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.kjdieka.mongodb.net/?retryWrites=true&w=majority
MONGODB_USERNAME={username do banco}
MONGODB_PASSWORD={password do banco}
```

Opcional para debugar o backend:

```ini
DEBUG=express:*
```
