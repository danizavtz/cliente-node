[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)
## cliente-node
Esse projeto é um par com o [cliente-drf](https://github.com/danizavtz/client-drf) , existe equivalente a esse projeto que está implementada em python usando django e django rest framework. Fiz esse projeto com a finalidade de ter uma análise comparativa e ter parâmetros de comparação na hora da implementação de restful api.

No caso existem duas implementações: cliente-drf (feito em python django) e cliente-node (node express).

Steps for running:<br>
1. Clone project from git<br>
2. create a database "cliente" in your postgres database instance.
3. create table
```
npm run create
```
4. Install dependencies
```
npm install
```
5. Start the application
```
npm start
```
6. Should see a msg in console: Microsservice login listening at http://localhost:3002

# Tests
1. npm t (unit tests)<br>
2. npm run coverage (coverage)<br>
