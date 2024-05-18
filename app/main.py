from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine
import datetime

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/mood_entries/", response_model=schemas.MoodEntry)
def create_mood_entry(mood_entry: schemas.MoodEntryCreate, db: Session = Depends(get_db)):
    return crud.create_mood_entry(db=db, mood_entry=mood_entry)

@app.get("/mood_entries/", response_model=list[schemas.MoodEntry])
def read_mood_entries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    mood_entries = crud.get_mood_entries(db, skip=skip, limit=limit)
    return mood_entries

@app.get("/mood_entries/{date}", response_model=list[schemas.MoodEntry])
def read_mood_entries_by_date(date: str, db: Session = Depends(get_db)):
    mood_entries = crud.get_mood_entries_by_date(db, date=date)
    if not mood_entries:
        raise HTTPException(status_code=404, detail="No mood entries found for this date")
    return mood_entries
