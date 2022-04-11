from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class TodoItem(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    created_at: Optional[datetime] = datetime.now()
    updated_at: Optional[datetime] = datetime.now()

    class Config:
        orm_mode : True


class TodoItemIn(BaseModel):
    title: str
    description: Optional[str] = None

    class Config:
        orm_mode : True
