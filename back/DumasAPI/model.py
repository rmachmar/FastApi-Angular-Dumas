from operator import index
from sqlalchemy import Column, Integer, String
from database import Base


class Gatos(Base):
    __tablename__  = "gatos"

    Id = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String)
    Raza = Column(String)
    Edad = Column(Integer)
    Foto = Column(String)