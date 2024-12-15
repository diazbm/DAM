Web App Full Stack Base - Ionic frontend
========================================

Proyecto basado en [Web App Full Stack Base](https://github.com/gotoiot/app-fullstack-base).

En esta extensión del proyecto se utiliza el framework ionic para realizar el frontend.

## Comenzando 🚀

Esta sección es una guía con los pasos esenciales para que puedas poner en marcha la aplicación.

### Instalar las dependencias

Para correr este proyecto es necesario que instales `Docker` y `Docker Compose`. 

En [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) publicado en nuestra web están los detalles para instalar Docker y Docker Compose en una máquina Linux. Si querés instalar ambas herramientas en una Raspberry Pi podés seguir [este artículo](https://www.gotoiot.com/pages/articles/rpi_docker_installation) de nuestra web que te muestra todos los pasos necesarios.

En caso que quieras instalar las herramientas en otra plataforma o tengas algún incoveniente, podes leer la documentación oficial de [Docker](https://docs.docker.com/get-docker/) y también la de [Docker Compose](https://docs.docker.com/compose/install/).

Continua con la descarga del código cuando tengas las dependencias instaladas y funcionando.

### Ejecutar la aplicación

Para ejecutar la aplicación tenes que correr el comando `docker compose up` desde la raíz del proyecto. Este comando va a descargar las imágenes de Docker de node, de typescript, de la base datos y del admin de la DB, y luego ponerlas en funcionamiento. 

Para acceder al cliente web ingresa a a la URL [http://localhost:8100/](http://localhost:8100/) y para acceder al admin de la DB accedé a [localhost:8001/](http://localhost:8001/). 

Si pudiste acceder al cliente web y al administrador significa que la aplicación se encuentra corriendo bien. 

> Si te aparece un error la primera vez que corres la app, deteńe el proceso y volvé a iniciarla. Esto es debido a que el backend espera que la DB esté creada al iniciar, y en la primera ejecución puede no alcanzar a crearse. A partir de la segunda vez el problema queda solucionado.

### Funcionalidad y pantallas

El proyecto se encarga de listar un conjunto de sensores de IOT en la vista /home de la aplicación. Esta lista permite clicar en cada uno de sus elementos para ver los detalles del sensor.

<img width="303" alt="Captura de pantalla 2024-12-06 a la(s) 01 44 16" src="https://github.com/user-attachments/assets/dd190734-66b9-44d8-a3cc-f887c6ded30f">


Además se suma un breadcrumb para facilitar la navegación entre pantallas, que es de tres niveles:

home > detalle del dispositivo > mediciones asociadas al dispositivo.

En la pantalla de detalle del dispositivo se cuenta con la funcionalidad de permitir abrir o cerrar la electrovalvula asociada al mismo de forma remota. También se obtiene la medición de temperatura del mismo mediante una llamada client side al servicio que obtiene esas mediciones de manera virtual (simulada).

<img width="301" alt="Captura de pantalla 2024-12-06 a la(s) 01 44 27" src="https://github.com/user-attachments/assets/4e6fa37a-62dd-4f3b-a1e9-58e2f5b35e4d">

Finalmente en el listado de mediciones se cuenta con las mismas ordenadas por fecha y hora, además de detalles del valor medido

<img width="299" alt="Captura de pantalla 2024-12-14 a la(s) 22 36 19" src="https://github.com/user-attachments/assets/fa3799be-fee5-4399-818e-f9ee506adfef" />



### Backend

En el backend se cuenta con 6 endpoints que se muestran a continuación:

| **Verbo** | **Ruta** | **Body** | **Descripción** |
|---------------|---------------|---------------|---------------|
| GET    | /dispositivos    |     | Obtener lista de dispositivos    |
| GET    | /dispositivos/:id    |     | Obtener detalle de un dispositivo por id   |
| GET    | /mediciones/:id    |     | Obtener la lista de mediciones de un dispositivo por id   |
| POST    | /mediciones    |   { "fecha": "2024-11-24 13:00:00", "valor": "40", "dispositivoId": 1 }  | Crear una nueva medición para un dispositivo    |
| GET    | /log_riegos/:id    |     | Obtener logs de riego por id de electroválvula    |
| POST    | /log_riegos    | { "fecha": "2024-12-01 17:37:41", "apertura": 0, "electrovalvulaId": 1 }    | Crear un log de riego para una electroválvula    |

### Posibles mejoras

Como posibles mejoras que se pueden implementar en ese proyecto está la funcionalidad de paginado de listas y aplicar un sistema de autenticación.

## Licencia 📄

Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)). Podés ver el archivo [LICENSE.md](LICENSE.md) para más detalles sobre el uso de este material.
