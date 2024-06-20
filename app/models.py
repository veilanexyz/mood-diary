from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from . import database
import datetime

class MoodEntry(database.Base):
    __tablename__ = "mood_entries"

    id = Column(Integer, primary_key=True, index=True)
    date_time = Column(DateTime, default=datetime.datetime.utcnow)
    mood_score = Column(Integer)  
    emotions = Column(String)
    description_emotions = Column(String, nullable=True)
    influence = Column(String)
    description_influence = Column(String, nullable=True)
