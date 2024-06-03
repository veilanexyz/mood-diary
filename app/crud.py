from sqlalchemy.orm import Session
import models, schemas

def create_mood_entry(db: Session, mood_entry: schemas.MoodEntryCreate):
    db_mood_entry = models.MoodEntry(**mood_entry.dict())
    db.add(db_mood_entry)
    db.commit()
    db.refresh(db_mood_entry)
    return db_mood_entry

def get_mood_entries(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.MoodEntry).offset(skip).limit(limit).all()

def get_mood_entries_by_date(db: Session, date: str):
    return db.query(models.MoodEntry).filter(models.MoodEntry.date.like(f'{date}%')).all()
