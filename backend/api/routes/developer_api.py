from fastapi import APIRouter

router = APIRouter()

@router.get("/ai-twin/{user_id}")
def get_ai_twin(user_id: str):
    return {"message": f"Return AI twin for user {user_id}"}
