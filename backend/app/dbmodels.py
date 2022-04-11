from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime

from app.db.session import Base


class TodoItem(Base):
    __tablename__ = 'todos'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# TodoItemInDB = Table(
#     'todo',
#     Column('id', Integer, autoincrement=True, primary_key=True),
#     Column('title', String(100), nullable=False),
#     Column('description', Text),
#     Column('created_at', DateTime),
#     Column('updated_at', DateTime, onupdate=datetime.utcnow())
# )
