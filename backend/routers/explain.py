from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from ..services.ai_service import ai_service
from ..prompt_builder import build_stacktrace_prompt

router = APIRouter(prefix="/explain", tags=["StackTraceGPT"])

class StackTraceRequest(BaseModel):
    stack_trace: str
    language: Optional[str] = None
    framework: Optional[str] = None
    preferred_provider: Optional[str] = None

class ExplanationResponse(BaseModel):
    explanation: str
    possible_fixes: List[str]
    references: Optional[List[str]] = None
    provider_used: str

@router.post("/stacktrace", response_model=ExplanationResponse)
async def explain_stacktrace(request: StackTraceRequest):
    """
    Analyze a stack trace and provide an explanation with possible fixes
    """
    # Build prompt for OpenAI
    prompt = build_stacktrace_prompt(request.stack_trace, request.language, request.framework)
    
    try:
        # Get response from AI service
        response = await ai_service.generate_response(
            prompt=prompt,
            max_tokens=1000,
            temperature=0.7
        )
        
        # Parse the response based on the provider used
        if response["provider"] == "openai":
            content = response["response"].choices[0].message.content
        else:
            content = response["response"].text

        # Parse the response into structured format
        # This is a simple example - you might want to make this more sophisticated
        parts = content.split("\n\n")
        explanation = parts[0] if parts else "No explanation provided"
        fixes = [fix.strip() for fix in parts[1].split("\n")] if len(parts) > 1 else []
        references = [ref.strip() for ref in parts[2].split("\n")] if len(parts) > 2 else []

        return ExplanationResponse(
            explanation=explanation,
            possible_fixes=fixes,
            references=references,
            provider_used=response["provider"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze stack trace: {str(e)}")

@router.get("/providers")
async def get_available_providers():
    """
    Get list of available AI providers
    """
    return {"providers": ai_service.get_available_providers()} 