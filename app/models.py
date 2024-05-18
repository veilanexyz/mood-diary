from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class MoodEntry(Base):
    __tablename__ = "mood_entries"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.datetime.utcnow)
    mood_score = Column(Integer)  # Оценка по 7-балльной шкале
    description = Column(String, nullable=True)
    reason = Column(String, nullable=True)
