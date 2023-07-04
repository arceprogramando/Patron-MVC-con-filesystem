# Entrega proyecto Coderhouse
## _Felipe Antonio Aleman Arce_
### Ejercicio 4 entregable , Router y Multer (Finalizado)
[![Coderhouse](https://res.cloudinary.com/hdsqazxtw/image/upload/v1570710978/coderhouse.jpg)](https://github.com/arceprogramando)

Estoy haciendo esto para poder tener un ejemplo de como hacer un readme de subida

- Nuevas funcionalidades de los lenguajes ECMAScritpt✔️
- Manejo de archivos en JavaScript✔️
- Servidor con Express ✔️
- ✨Router y Multer✨

## Desafio Entregable
# Router y Multer
### Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.


- Se instalarán las dependencias a partir del comando npm install ✔️
- Se echará a andar el servidor✔️
- Se creara las Rutas correspondientes
- Se revisará que el archivo YA CUENTE CON AL MENOS DIEZ PRODUCTOS CREADOS al - momento de su entrega, es importante para que los tutores no tengan que crear los productos por sí mismos, y así agilizar el proceso de tu evaluación.✔️
- Se corroborará que el servidor esté corriendo en el puerto 8080.✔️
- Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.✔️
- Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.✔️
- Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.✔️
- Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.✔️
- Se generara la creacion del upload de multer para subir imagenes

> Espero que Los ejercicios se encuentren
> resueltos de buena forma y espero 
> que lo haya solucionado de forma optima


## Herramientas

Para realizar este Ejercicio

- [Coderhouse]  - Se vieron las clases de coderhouse Correspondientes!
- [node.js] - Se uso Node Js
- [Express] - Se uso la libreria Express de Node
- [Multer] - Se instalo multer para poder manejar archivo de imagen
- [Nodemon] - Se instalo globalmente Nodemon
- [Nodemon] - Se instalo como paquete de desarrollo 

Mi repositorio publico es  [arceprogramando][arceprogramando]
en github.

## Installation

Express and nodemon requires [Node.js](https://nodejs.org/) to run.

Primero instalamos de [Node.js](https://nodejs.org/)  su pagina oficial.

```sh
npm i

```

Segundo instalamos de [Nodemon](https://nodemon.io) 
Yo lo instale como dependencia de desarrollo

```sh
npm install nodemon -D

```

Tercero instalamos [express](http://expressjs.com)

```sh
npm install express

```
Cuarto agregamos a nuestro package.json


```sh
"type": "module",
```
Quinto instalamos multer

```sh
npm install multer
```


```sh
http://localhost:8080/
http://localhost:8080/products
[http://localhost:8080/products?limit=n]
http://localhost:8080/products/:id
```



  [Coderhouse]: <https://plataforma.coderhouse.com/cursos/43335/programacion-backend>
  [arceprogramando]: <https://github.com/arceprogramando>
  [node.js]: <http://nodejs.org>
  [express]: <http://expressjs.com>
  [Nodemon]: <https://nodemon.io>
  [Multer]:<https://www.npmjs.com/package/multer>
