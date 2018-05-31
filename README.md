
# API Rest de Epic Win Epic Fail
  EpicWinEpicFail es una aplicacion que me permite subir videos atraves de una autenticación de usuarios

## Metodos HTTP permitidos

|  Método  |              Descripción               |
| -------- | -------------------------------------- |
| `GET`    | Obtener un recurso o lista de recursos |
| `POST`   | Crear un recurso                       |
| `PUT`    | Actualizar un recurso                  |
| `DELETE` | Eliminar un recurso                    |

## Códigos de Respuesta

| Código |                         Descripción                          |
| ------ | ------------------------------------------------------------ |
| `200`  | Success                                                      |
| `201`  | Success - nuevo recurso creado.                              |
| `204`  | Success - no hay contenido para responder                    |
| `400`  | Bad Request - i.e. su solicitud no se pudo evaluar           |
| `401`  | Unauthorized - usuario no esta autenticado para este recurso |
| `404`  | Not Found - recurso no existe                                |
| `422`  | Unprocessable Entity - i.e. errores de validación            |
| `429`  | Limite de uso excedido, intente mas tarde                    |
| `500`  | Error de servidor                                            |
| `503`  | Servicio no disponible                                       |

## Autenticación de usuario

  La autenticación utiliza JWT reciviendo un token
  
## Loguearse con usuario registrado

  Solicitud [POST] /login
  
    {
      "user": {
        "email": "prueba@prueba.com",
        "password": 1234
      }
    }

  Respuesta

    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
    }
  
## Registrar un usuario

  Solicitud [POST] /register
  
    {
      "user": {
        "email": "prueba@prueba.com",
        "password": 1234,
        "name": "prueba"
      }
    }

  Respuesta

    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
    }
    
## Obtener datos de un usuario registrado

  Solicitud [GET] /user

  Respuesta

    {
      "user": {
        "id":1,
        "name":"prueba",
        "email":"prueba@prueba.com",
        "role":"user"
      }
    }


## Videos
  Recursos de tipo videos para crear o actualizar hay que estar logueados y en el caso de actualizar debe ser el usuario que lo creo

## Obtener todos los videos

  Solicitud [GET] /video

  Respuesta

    {
      "videos": [
        {
          "id": 3,
          "category": 5,
          "user": 9,
          "title": "Prof.",
          "win": 0,
          "video_id": "c88095f597cfb5aacd62457d531cfa37",
          "start": 4915805,
          "pause": 93921397,
          "stop": 934046,
          "active": 1,
          "created_at": "2015-07-08 21:55:29",
          "updated_at": "2015-07-08 21:55:29"
        },
        {
          "id": 4,
          "category": 1,
          "user": 3,
          "title": "Dr.",
          "win": 0,
          "video_id": "9ffa5aab6e92544ede1409cd716d05b1",
          "start": 82411075,
          "pause": 3,
          "stop": 5445297,
          "active": 1,
          "created_at": "2015-07-08 21:55:29",
          "updated_at": "2015-07-08 21:55:29"
        },
        {
          "id": 5,
          "category": 6,
          "user": 6,
          "title": "Mr.",
          "win": 0,
          "video_id": "4d9e9bd0512877d6949fda6dc910478f",
          "start": 2929,
          "pause": 118,
          "stop": 56580,
          "active": 1,
          "created_at": "2015-07-08 21:55:29",
          "updated_at": "2015-07-08 21:55:29"
        },
        {
          "id": 6,
          "category": 4,
          "user": 5,
          "title": "Ms.",
          "win": 0,
          "video_id": "c03f49448fa7fb380eb585f156db8d15",
          "start": 115249178,
          "pause": 71642,
          "stop": 13711,
          "active": 1,
          "created_at": "2015-07-08 21:55:29",
          "updated_at": "2015-07-08 21:55:29"
        },
        {
          "id": 7,
          "category": 2,
          "user": 5,
          "title": "Dr.",
          "win": 0,
          "video_id": "36d114b160e8648e8abe9c5bd3a25739",
          "start": 311323262,
          "pause": 4062,
          "stop": 50494,
          "active": 1,
          "created_at": "2015-07-08 21:55:29",
          "updated_at": "2015-07-08 21:55:29"
        }
        ]
    }

## Obterner un video por id

  Solicitud [GET] /video/{id}

  Respuesta
  
    {
      "video": {
        "id": 6,
        "category": 4,
        "user": 5,
        "title": "Ms.",
        "win": 0,
        "video_id": "c03f49448fa7fb380eb585f156db8d15",
        "start": 115249178,
        "pause": 71642,
        "stop": 13711,
        "active": 1,
        "created_at": "2015-07-08 21:55:29",
        "updated_at": "2015-07-08 21:55:29"
      }
    }

## Obterner un video por id de categoria

  Solicitud [GET] /video/category/{id}

  Respuesta
  
    {
      "video": {
        "id": 6,
        "category": 4,
        "user": 5,
        "title": "Ms.",
        "win": 0,
        "video_id": "c03f49448fa7fb380eb585f156db8d15",
        "start": 115249178,
        "pause": 71642,
        "stop": 13711,
        "active": 1,
        "created_at": "2015-07-08 21:55:29",
        "updated_at": "2015-07-08 21:55:29"
      }
    }
    
## Obterner un video por id de usuario
    
  Solicitud [GET] /video/user/{id}
    
  Respuesta
      
    {
      "video": {
        "id": 6,
        "category": 4,
        "user": 5,
        "title": "Ms.",
        "win": 0,
        "video_id": "c03f49448fa7fb380eb585f156db8d15",
        "start": 115249178,
        "pause": 71642,
        "stop": 13711,
        "active": 1,
        "created_at": "2015-07-08 21:55:29",
        "updated_at": "2015-07-08 21:55:29"
      }
    }
    
## Registrar un video nuevo
    
  Solicitud [POST] /video
  
    {
      "video": {
        "category": 4,
        "title": "Ms.",
        "win": 0,
        "video_id": "c03f49448fa7fb380eb585f156db8d15",
        "start": 115249178,
        "pause": 71642,
        "stop": 13711
      }
    }
        
  Respuesta
      
    {
      "video": {
        "id": 6,
        "category": 4,
        "user": 5,
        "title": "Ms.",
        "win": 0,
        "video_id": "c03f49448fa7fb380eb585f156db8d15",
        "start": 115249178,
        "pause": 71642,
        "stop": 13711,
        "active": 1,
        "created_at": "2015-07-08 21:55:29",
        "updated_at": "2015-07-08 21:55:29"
      }
    }
    
## Actualizar un video ya registrado a traves de su id
    
  Solicitud [PUT] /video/{id}
  
    {
      "video": {
        "category": 4,
        "title": "Ms.",
        "win": 1,
        "video_id": "c03f49448fa7fb380eb585f156db8d15",
        "start": 115249178,
        "pause": 71642,
        "stop": 13711
      }
    }
        
  Respuesta
      
    {
      "video": {
        "id": 6,
        "category": 4,
        "user": 5,
        "title": "Ms.",
        "win": 1,
        "video_id": "c03f49448fa7fb380eb585f156db8d15",
        "start": 115249178,
        "pause": 71642,
        "stop": 13711,
        "active": 1,
        "created_at": "2015-07-08 21:55:29",
        "updated_at": "2015-07-08 21:55:29"
      }
    }

## Borrar un video a traves de su id
    
  Solicitud [DELETE] /video/{id}
          
  Respuesta
      
    {
      "success": "true"
    }

## Categorias
  Recursos de tipo categoria para crear o actualizar hay que estar logueados y en el caso de actualizar debe ser el usuario que lo creo

## Obtener todas las categorias

  Solicitud [GET] /category

  Respuesta

    {
      "categories": [
        {
          "id": 1,
          "title": "velit",
          "description": "Dicta sunt et quaerat. Incidunt occaecati consequatur ut in non doloremque earum. Velit rerum hic quo necessitatibus quia illum. Et veritatis quidem tenetur quam vel."
        },
        {
          "id": 2,
          "title": "modi",
          "description": "Totam animi quo mollitia autem. Praesentium error porro eveniet maiores. Reprehenderit neque illo qui accusamus."
        },
      ]
    }

## Obterner una categoria por id

  Solicitud [GET] /category/{id}
  
  Respuesta
      
    {
      "category": [
        {
          "id": 1,
          "title": "velit",
          "description": "Dicta sunt et quaerat. Incidunt occaecati consequatur ut in non doloremque earum. Velit rerum hic quo necessitatibus quia illum. Et veritatis quidem tenetur quam vel."
        }
    }
    
## Registrar una categoria nueva
    
  Solicitud [POST] /category
  
    {
      "category": [
        {
          "title": "velit",
          "description": "Dicta sunt et quaerat. Incidunt occaecati consequatur ut in non doloremque earum. Velit rerum hic quo necessitatibus quia illum. Et veritatis quidem tenetur quam vel."
        }
    }
        
  Respuesta
      
    {
      "category": [
        {
          "id": 1,
          "title": "velit",
          "description": "Dicta sunt et quaerat. Incidunt occaecati consequatur ut in non doloremque earum. Velit rerum hic quo necessitatibus quia illum. Et veritatis quidem tenetur quam vel."
        }
    }
    
## Actualizar una categoria ya registrada a traves de su id
    
  Solicitud [PUT] /category/{id}
  
    {
      "category": [
        {
          "title": "velit",
          "description": "Prueba"
        }
    }
        
  Respuesta
      
    {
      "category": [
        {
          "id": 1,
          "title": "velit",
          "description": "Prueba"
        }
    }

## Borrar una categoria a traves de su id
    
  Solicitud [DELETE] /category/{id}
        
  Respuesta
      
    {
      "success": "true"
    }
