# Delilah
Último proyecto del curso de desarrollo web Full-stack de Acámica. Delilah es una API para un restaurante donde se utiliza mySQL como base de datos. 
Esta API permite, crear, editar y eliminar: usuarios, productos y pedidos. Existen dos roles. El rol de administrador y el de usuario. 
#### El administrador puede: #### 
  - Ver un listado de todos los usuarios
  - Ver un listado de todos los pedidos
  - Editar, crear y eliminar productos
  - Editar los pedidos
#### El usuario puede: #### 
  - Ver un listado de todos los productos
  - Crear un pedido
  - Ver todos los pedidos que hizo
  - Editar sus datos
  
## Instrucciones de inicio ##
1. Descargar el repositorio
2. Abrir en el editor de código (ej: Visual Studio Code), iniciar npm e instalar las dependencies listadas en el package.json
3. Abrir su administrador de base de datos de mySQL local y crear una nueva base de datos. (Recomendado nombrarla Delilah)
4. Una vez dentro de la base de datos, correr las queries que aparecen en la carpeta "tables" del repositorio, en el orden en el cual aparecen.
5. En la terminal ingresar el comando npm run start para iniciar el servidor. Si todo esta correcto debería aparecer en la terminal "server is ready".
6. Haga click en el boton que dice "Run in Postman" naranja que esta abajo para poder acceder a la colección de requests.
#### [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/948ef356b0dcdb2c4c1c) ####

## Recomendaciones para Postman ##
Empiece por la request "/register" y registre un usuario administrador ("admin": 1) y un usuario común (borrar la key "admin" o darle valor 0) para poder probar la API de forma completa.
Luego haga log in con la cuenta administrador para crear productos, editarlos o eliminarlos y ver la lista de usuarios.
Luego haga log in con el usuario no-administrador para poder crear pedidos.
Recuerde que para algunas request necesita tener permisos (ser administrador o ser usuario no-administrador)