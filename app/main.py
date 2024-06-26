from datetime import date
from fastapi import FastAPI, Depends, HTTPException
from starlette.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models
from . import schemas
from . import crud
from . import database
import os

models.database.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = [
    "http://localhost:3000"  # Адрес вашего React-приложения
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/mood_entries/", response_model=schemas.MoodEntry)
def create_mood_entry(
    mood_entry: schemas.MoodEntryCreate, db: Session = Depends(get_db)
):
    return crud.create_mood_entry(db=db, mood_entry=mood_entry)


@app.get("/mood_entries/", response_model=list[schemas.MoodEntry])
def read_mood_entries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    mood_entries = crud.get_mood_entries(db, skip=skip, limit=limit)
    return mood_entries


@app.get("/mood_entries/{date}", response_model=list[schemas.MoodEntry])
def read_mood_entries_by_date(date: date, db: Session = Depends(get_db)):
    mood_entries = crud.get_mood_entries_by_date(db, date=date)
    if not mood_entries:
        raise HTTPException(
            status_code=404, detail="No mood entries found for this date"
        )
    return mood_entries

# Mount the static files directory
app.mount("/static/build", StaticFiles(directory="app/static/build/static"), name="js & css")
app.mount("/static", StaticFiles(directory="app/static/build", html=True), name="html")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
