# Paginas utilizadas

## `React Router`
https://www.w3schools.com/react/react_router.asp

## `Axios`
https://www.freecodecamp.org/espanol/news/como-usar-axios-con-react/

## `Axios Docs`
https://axios-http.com/es/docs/intro



## `Paleta de colores`
https://coolors.co/553d2a-5f4633-69503c-735945-7e634e-907761-ab9680-c7b69f-e3d7bf-fff9e1

--caf-noir: #553d2aff;
--coffee: #5f4633ff;
--coffee-2: #69503cff;
--coffee-3: #735945ff;
--coyote: #7e634eff;
--chamoisee: #907761ff;
--beaver: #ab9680ff;
--khaki: #c7b69fff;
--pearl: #e3d7bfff;
--cornsilk: #fff9e1ff;

## `endpoints`
**baseurl -> http://localhost:8000/public ( no pude sacar public :/ )**

| GENEROS | JUEGOS | PLATAFORMAS |
| ------------- | ------------- | -------------
| get(/generos) | get(/juegos) | get(/generos) |
| post(/generos) | post(/juegos) | post(/generos) |
| delete(/generos/{id}) | delete(/juegos/{id}) | delete(/generos/{id}) |
| patch(/generos/{id}) | patch(/juegos/{id}) | patch(/generos/{id}) |

_Nota: El get de juegos se trabaja con parametros , los mismo al estar todos vacios obtenemos todos los datos._ 

### Rutas para cargar los datos 
Estas rutas fueron implementadas para cargar datos predefinidos, los mismos se encuentran en archivos JSON en la API.
| GENEROS | JUEGOS | PLATAFORMAS |
| ------------- | ------------- | -------------
| post(/generos/todos) | post(/juegos/todos) | post(/generos/todos) |

_Nota: Los campos de **id_plataforma** y **id_juegos** del JSON Juegos estan predefinidos segun los id de los datos de los JSON Generos y Plataformas, debido a esto simpre es necesario tener las tablas Genero y Plataformas vacias con su autoincremental en 0, si no la consulta de carga del JSON Juegos no funcionara._\
**_En resumen primero ejecutar "Vaciar Data" para asegurarse que se carguen los datos de "Cargar Data"_**



### Rutas para cargar los datos 
Estas rutas fueron implementadas para eliminar todos los datos de las tablas **generos**, **plataformas** y **juegos**.
| GENEROS | JUEGOS | PLATAFORMAS |
| ------------- | ------------- | -------------
| delete(/generos/{id}) | delete('/juegos/{id} | delete(/generos/{id}) |

_Nota: En este caso no enviaremos el id como argumento si no un alias 'todos', el cual nos permite ejecutar el metodo vaciar del modelo_\
***IMPORTANTE: Luego de vaciar las tablas se reinicia el autoincremental de las mismas.***


## TODO
