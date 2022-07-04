from pydantic import BaseModel

class Gatos(BaseModel):
    Id: int
    Nombre: str
    Raza:  str
    Edad: int
    Foto: str