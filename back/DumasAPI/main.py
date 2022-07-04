from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from gatos import Gatos
import model
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import requests

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model.Base.metadata.create_all(bind=engine)
def get_db():
  try:
    db = SessionLocal()
    yield db
  finally:
    db.close()



@app.get("/")
async def holaMundo():
  return {"Hola Mundo!"}

### RUTAS PARA BD
@app.get("/ObtenerGatos/")
async def obtenerGatos(db:Session = Depends(get_db)):
  return  db.query(model.Gatos).all()

@app.get("/ObtenerGato/{id}")
async def ObtenerGato(id:int, db:Session = Depends(get_db)):
  obj = db.query(model.Gatos).filter(model.Gatos.Id == id).first()
  return obj

@app.post("/CrearGato/")
async def crearGato(gato: Gatos, db:Session = Depends(get_db)):
  obj = model.Gatos()
  obj.Nombre = gato.Nombre
  obj.Raza =gato.Raza
  obj.Edad = gato.Edad
  obj.Foto = gato.Foto
  db.add(obj)
  db.commit()
  return {'status': 201, 'transaccion': 'Successfull' }

@app.put("/ActualizarGato/")
async def actualizarGato(gato: Gatos, db:Session = Depends(get_db)):
  obj = db.query(model.Gatos).filter(model.Gatos.Id == gato.Id).first()
  obj.Nombre = gato.Nombre
  obj.Raza =gato.Raza
  obj.Edad = gato.Edad
  obj.Foto = gato.Foto
  db.add(obj)
  db.commit()
  return {'status': 201, 'transaccion': 'Successfull' }

@app.delete("/EliminarGato/{id}")
async def eliminarGato(id: int, db:Session = Depends(get_db)):
  obj = db.query(model.Gatos).filter(model.Gatos.Id == id).delete()
  db.commit()
  return {'status': 201, 'transaccion': 'Successfull' }


### RUTAS PARA IMAGENES
KEYHEADERS = {"x-api-key":"3bc5df58-5435-4ba2-89cc-66450fcb5177"}
@app.get("/ObtenerImagenes/")
async def obtenerImagenes():
  payload = {"limit" : "10"}
  r = requests.get("https://api.thecatapi.com/v1/images/search", params=payload, headers=KEYHEADERS)
  return r.text

@app.get("/ObtenerFavoritos/")
async def obtenerFavoritos():
  r = requests.get("https://api.thecatapi.com/v1/favourites", headers=KEYHEADERS)
  return r.text

@app.get("/MarcarImagenFavorito/{idImagen}")
async def marcarImagenFavorito(idImagen:str):  
  payload = {"image_id":idImagen}
  r = requests.post("https://api.thecatapi.com/v1/favourites",json=payload, headers=KEYHEADERS)
  return r.text
  
