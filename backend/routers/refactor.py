from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from ..services.openai_service import get_openai_client
from ..prompt_builder import build_refactor_prompt

router = APIRouter(prefix="/refactor", tags=["RefactorTool"])

class RefactorRequest(BaseModel):
    code: str
    source_language: str
    source_version: str
    target_version: str
    preserve_comments: Optional[bool] = True
    modernization_level: Optional[str] = "moderate"  # conservative, moderate, aggressive

class RefactorResponse(BaseModel):
    refactored_code: str
    changes_made: list[str]
    migration_notes: Optional[str] = None

@router.post("/modernize", response_model=RefactorResponse)
async def modernize_code(request: RefactorRequest, openai_client=Depends(get_openai_client)):
    """
    Modernize legacy code to use newer language features and conventions
    """
    # Build prompt for OpenAI
    prompt = build_refactor_prompt(
        request.code, 
        request.source_language,
        request.source_version,
        request.target_version,
        request.preserve_comments,
        request.modernization_level
    )
    
    try:
        # TODO: Implement actual OpenAI call
        # For now, return placeholder data
        return RefactorResponse(
            refactored_code="// Placeholder for refactored code\npublic class Example { ... }",
            changes_made=["Converted for loops to streams", "Replaced anonymous classes with lambdas"],
            migration_notes="Successfully modernized the code from Java 8 to Java 21."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to refactor code: {str(e)}") 