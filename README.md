# Proyecto de Gestión de Docentes Universitarios

## Descripción

Este proyecto consiste en el desarrollo de una aplicación web para la gestión de docentes universitarios utilizando React en el frontend, Node.js con Express en el backend y MySQL como sistema gestor de base de datos.

La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los registros de docentes, proporcionando una interfaz sencilla y amigable para la administración de información académica.

---

## Objetivo

Desarrollar una aplicación web que permita gestionar la información de docentes universitarios mediante una arquitectura cliente-servidor, implementando buenas prácticas de desarrollo web y conexión con bases de datos relacionales.

---

## Tecnologías Utilizadas

### Frontend

* React JS
* JavaScript ES6
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* CORS

### Base de Datos

* MySQL

---

## Funcionalidades Implementadas

* Registro de docentes.
* Consulta de docentes almacenados.
* Edición de información existente.
* Eliminación de registros.
* Validación de campos obligatorios.
* Comunicación mediante API REST.
* Persistencia de datos en MySQL.

---

## Estructura General del Sistema

El sistema está dividido en dos componentes principales:

### Frontend

Responsable de la interacción con el usuario mediante formularios y tablas de visualización.

### Backend

Responsable de procesar las solicitudes enviadas desde el frontend y realizar las operaciones correspondientes en la base de datos.

---

## Funcionamiento de la Aplicación

### 1. Registro de Docentes

El usuario diligencia un formulario con la siguiente información:

* Nombre
* Correo institucional
* Teléfono
* Título académico
* Área académica
* Dedicación
* Años de experiencia

Al presionar el botón "Registrar Docente", la aplicación envía una petición POST al servidor para almacenar la información en la base de datos.

---

### 2. Consulta de Docentes

Cuando la aplicación inicia, React ejecuta automáticamente una consulta al backend para obtener todos los docentes registrados.

Esta operación se realiza mediante el hook useEffect(), que invoca la función encargada de consumir el endpoint GET /docentes.

Los registros obtenidos son almacenados en un estado y posteriormente mostrados en una tabla.

---

### 3. Actualización de Docentes

Al seleccionar la opción "Editar", la información del docente es cargada nuevamente en el formulario.

El usuario puede modificar los campos necesarios y posteriormente guardar los cambios.

La actualización se realiza mediante una petición PUT enviada al endpoint correspondiente.

---

### 4. Eliminación de Docentes

Al seleccionar la opción "Eliminar", el sistema envía una petición DELETE al servidor para remover el registro de la base de datos.

Posteriormente la tabla es actualizada automáticamente para reflejar los cambios realizados.

---

## Explicación del Código Frontend

### Manejo de Estados

Se utilizó el hook useState() para almacenar los datos ingresados por el usuario y controlar el comportamiento de la interfaz.

Ejemplos de estados utilizados:

* nombre
* correo
* telefono
* titulo
* areaAcademica
* dedicacion
* aniosExperiencia
* registros
* editIndex

Estos estados permiten actualizar dinámicamente la interfaz sin necesidad de recargar la página.

---

### Hook useEffect()

El hook useEffect() se utiliza para ejecutar la carga inicial de docentes cuando el componente es renderizado por primera vez.

Su función principal es consultar la información almacenada en la base de datos y mostrarla en pantalla.

---

### Consumo de API

La comunicación entre el frontend y el backend se realiza utilizando fetch().

Se implementaron los siguientes métodos HTTP:

GET: Obtiene los docentes registrados.

POST: Registra un nuevo docente.

PUT: Actualiza la información de un docente existente.

DELETE: Elimina un docente de la base de datos.

---

## Explicación del Código Backend

El backend fue desarrollado utilizando Express.js.

Se implementaron diferentes rutas para gestionar las operaciones CRUD sobre la tabla docentes.

### GET /docentes

Obtiene todos los docentes registrados en la base de datos.

### POST /docentes

Recibe la información enviada desde el formulario y registra un nuevo docente.

### PUT /docentes/:id

Actualiza la información de un docente específico utilizando su identificador único.

### DELETE /docentes/:id

Elimina un docente específico de la base de datos.

---

## Base de Datos

La aplicación utiliza una tabla denominada docentes.

Campos principales:

* id
* nombre
* correo
* telefono
* titulo
* area_academica
* dedicacion
* anios_experiencia

Cada registro representa un docente almacenado dentro del sistema.

---

## Resultados Obtenidos

Durante el desarrollo del proyecto se logró:

* Implementar una aplicación web funcional.
* Conectar React con un servidor Node.js.
* Realizar operaciones CRUD completas.
* Integrar una base de datos MySQL.
* Aplicar conceptos de programación web moderna.
* Implementar validaciones básicas de entrada de datos.

---

## Conclusiones

El desarrollo de este proyecto permitió comprender el funcionamiento de una arquitectura Full Stack basada en React, Node.js y MySQL.

Asimismo, se fortalecieron conocimientos relacionados con el consumo de APIs REST, manejo de estados en React, validación de información y persistencia de datos en bases de datos relacionales.

La aplicación cumple satisfactoriamente con los requerimientos planteados para la gestión de docentes universitarios, proporcionando una solución funcional, escalable y fácil de utilizar.

---

## Autor

Miguel Angel Herrera

Proyecto académico desarrollado para la asignatura de Frameewor - Full Stack.
