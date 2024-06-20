from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MoodEntryBase(BaseModel):
    mood_score: int
    emotions: Optional[str] = None
    description_emotions: Optional[str] = None
    influence: Optional[str] = None
    description_influence: Optional[str] = None

class MoodEntryCreate(MoodEntryBase):
    pass

class MoodEntry(MoodEntryBase):
    id: int
    date_time: datetime

    class Config:
        orm_mode = True
