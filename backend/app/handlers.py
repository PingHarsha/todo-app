from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from typing import List

from app import crud
from app.db.session import get_database
from app.dbmodels import TodoItem
from app.models import TodoItem as TodoItemSchema, TodoItemIn

router = APIRouter()


@router.get('/todos', status_code=status.HTTP_200_OK, tags=["ToDo"])
async def get_todo_list_api(db: Session = Depends(get_database)):
    '''returns a list of ToDos'''
    return await crud.get_todos(db)


@router.post('/todos', status_code=status.HTTP_201_CREATED, tags=["ToDo"])
async def create_todo_api(todo_data: TodoItemIn, db: Session = Depends(get_database)):
    '''add a ToDo Item'''
    return await crud.create_todo(todo_data, db)


@router.get('/todos/{id}', status_code=status.HTTP_200_OK, tags=["ToDo"])
async def get_todo_detail_api(id: int, db: Session = Depends(get_database)):
    '''return TODO for given id'''
    todo = await crud.get_todo(id, db)
    if not todo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item Not Found")

    return todo

@router.put("/todos/{id}", tags=["ToDo"])
async def update_a_todo(id: int,
                todo_data: TodoItemIn,
                db: Session = Depends(get_database)):
   '''update and return TODO for given id'''
   print(todo_data)
   todo = await crud.get_todo(id, db)
   if not todo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item Not Found")

   updated_todo = await crud.update_todo(id, todo_data, db)
   return updated_todo


@router.delete('/todos/{id}', status_code=status.HTTP_204_NO_CONTENT, tags=["ToDo"])
async def delete_todo_api(id: int, db: Session = Depends(get_database)):
    '''delete TODO with a given ID'''
    if not await crud.get_todo(id, db):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item Not Found")

    await crud.delete_todo(id, db)
    return None
