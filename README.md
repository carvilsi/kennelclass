# kennelclass
Una aplicación sencilla para gestionar una peluquería de animales (¿Perros?)       

								  / \__           
 								 (    @\___      
								  /         O     
								 /   (_____/      
								/_____/   U       


Demo de [kennelclass](http://5.196.11.71:1337/)


![alt img_demo](http://5.196.11.71/images/kennel_demo.png)


Basada en [Sails](http://sailsjs.org) y [mongodb](http://www.mongodb.org/)

## Backend

Para **instalar** necesitarás:

* [sails](http://sailsjs.org/#/getStarted)
* [mongodb](http://www.mongodb.org/downloads)

Después clona kennelclass e instala los paquetes que faltan:

```
$ git clone https://github.com/carvilsi/kennelclass.git
$ cd kennelclass/backend
$ sudo npm install
```

Para ejecutar:

`$ sails lift`

## Frontend

El frontend se encuentra en la carpeta "frontend".

Para **instalar** las dependecias con bower, carpeta "src".

```
$ cd frontend/src/
$ bower install
```


Se le ha añadido [gulp](http://gulpjs.com/) para ponerlo en marcha, bajo el directorio "frontend".

`$ npm install`

Se han generado dos tareas principales:

* Desarrollo: `$ gulp`
* Producción: `$ gulp prod`

Que generan la carpeta "dist" en la que se encuentra el frontend listo para dejar caer en el servidor.

Y ya está :)

--
