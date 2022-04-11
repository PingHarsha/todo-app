from datetime import datetime
from typing import List

from databases import Database
from sqlalchemy import select, desc
from sqlalchemy.orm import Session

from app.db.session import get_database
from app.dbmodels import TodoItem
from app.models import TodoItem as TodoItemModel, TodoItemIn


async def create_todo(todo_data: TodoItemIn, db: Session):
   todo = TodoItem(title= todo_data.title,
                   	description= todo_data.description)
   db.add(todo)
   db.commit()
   db.refresh(todo)
   return todo

async def get_todos(db: Session):
   return db.query(TodoItem).all()


async def get_todo(id: int, db: Session):
    return db.query(TodoItem).get(id)


async def update_todo(id: int, todo_data: TodoItemIn, db: Session):
    todo = db.query(TodoItem).filter(TodoItem.id == id).first()
    todo.title = todo_data.title
    todo.description = todo_data.description
    db.commit()
    db.refresh(todo)

    return todo

async def delete_todo(id: int, db: Session):
    todo = db.query(TodoItem).filter(TodoItem.id == id).first()
    db.delete(todo)
    db.commit()
