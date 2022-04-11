from fastapi import FastAPI
from typing import Callable
from fastapi.middleware.cors import CORSMiddleware

from app.db import session, tasks
from app.db.session import engine

from app.handlers import router as api_router

def create_start_app_handler(app: FastAPI) -> Callable:
    async def start_app() -> None:
        await tasks.connect_to_db(app)

    return start_app


def create_stop_app_handler(app: FastAPI) -> Callable:
    async def stop_app() -> None:
        await tasks.close_db_connection(app)

    return

def get_application():
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_event_handler("startup", create_start_app_handler(app))
    app.add_event_handler("shutdown", create_stop_app_handler(app))

    app.include_router(api_router, prefix="/api")

    return app


app = get_application()

# app = FastAPI()

# app.include_router(router, prefix="/api/v1")
