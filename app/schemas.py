from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MoodEntryBase(BaseModel):
    mood_score: int
    description: Optional[str] = None
    reason: Optional[str] = None

class MoodEntryCreate(MoodEntryBase):
    pass

class MoodEntry(MoodEntryBase):
    id: int
    date: datetime

    class Config:
        orm_mode = True
