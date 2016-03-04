# tocandtalk

Proyecto: Toc&Talk!

Branch: Master

Versión: 0.0.0

Equipo: * Nibaldo González Salgado
		* Fabián Da Silva Retamales
		* Felipe Mancilla Sepúlveda
		* Sebastián Torres Garfe
		* Víctor Torres Varas
		* Fernando Da Silva Retamales

Jefe de Proyecto: Sebastián Torres Garfe

Requerimientos:
	* NodeJs
	* Navegadores Google Chrome/Opera/Firefox

Herramientas utilizadas para el desarrollo:
	* NodeJs -> Entorno en tiempo de ejecución multiplataforma (de código abierto) para la capa del servidor
	* PeerJs -> API para implementar el protocolo P2P
	* Javascript -> Lenguaje utilizado en la capa de negocios
	* Express -> Framework para desarrollo web basado en javascript y utilizado en conjunto nodejs
	* HTML5 -> Lenguaje utilizado en la capa de vistas
	* CSS -> Estilos de las vistas
	* WebRTC -> Protocolo de comunicación para realizar videollamadas
	* Socket.io -> API para implementar comunicaciones entre el servidor y los clientes conectados a él a través de sockets.
	* Crosswalk -> Genera aplicación android a través de WebViews

Contenido:
	* bower_components: componentes provenientes de bower y utilizados por el servidor nodejs
	* node_modules: módulos de nodejs
	* images: imágenes de la página web
	* init: código utilizado para compilar la aplicación con crosswalk (para android)
	* modules: código javascript utilizado en la capa de negocios
	* views: vistas de la plataforma web
	* server.js: código principal para correr el servidor
	* router.js: definición de las rutas por parte del servidor (controlador del MVC de express)

Sobre lo implementado:
	* Comunicación entre el cliente y el servidor (y viceversa) a través de sockets.
	* Conexión P2P desde una peer a un servidor P2P.
	* Implementación de MVC sobre nodejs utilizando javascript
	* Generación automática de ids para los clientes que se conectan a la plataforma.
	* Identificación y separación de los usuarios que se conectan en aquellos que recibirán llamadas y aquellos que las realizarán.
	* Selección aleatoria de uno de los usuarios a la espera de una llamada por parte de un llamador.
	* Conexión de datos (paso de mensajes) entre dos peers.
	* Videollamadas entre dos usuarios, a través de un protocolo P2P.
	* Implementación de un chat entre dos usuarios conectados entre sí, a través de paso de mensajes bajo el protocolo P2P
	* Identificación y notificación de la desconexión de una peer de destino hacia una peer llamadora.
	* Implementación de realizar una búsqueda nueva, cerrando la videollamada y la conexión de datos de la peer de destino.

Ejecución:
	* Ingresar por consola a la carpeta donde se encuentra el archivo server.js
	* En la shell escribir: node server.js
	* La consola desplegará información respecto a la dirección y puerto donde están corriendo ambos servidores (servidores cliente/servidor y P2P)
	* Ingresar a través del navegador a la dirección IP que posee como puerto el puerto 3000
	* Si se abre la plataforma web desde la misma máquina donde se están corriendo los servidores, basta con ingresar a "localhost:3000/" desde el navegador

Nota:
	* Este prototipo no puede ser utilizado en otros navegadores que no sean ni Google Chrome ni Opera.
	* El diseño visual no es lo importante en este punto de nuestro desarrollo.

