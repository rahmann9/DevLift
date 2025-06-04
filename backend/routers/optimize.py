from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from services.ai_service import ai_service
from prompt_builder import build_optimizer_prompt

router = APIRouter(prefix="/optimize", tags=["DSA Optimizer"])

class OptimizationRequest(BaseModel):
    code: str
    language: str
    algorithm_type: Optional[str] = None  # sorting, searching, graph, etc.
    expected_complexity: Optional[str] = None  # O(n), O(log n), etc.
    include_explanation: Optional[bool] = True

class OptimizationResponse(BaseModel):
    optimized_code: str
    time_complexity_before: str
    time_complexity_after: str
    space_complexity_before: str
    space_complexity_after: str
    explanation: Optional[str] = None
    optimization_techniques: list[str]

@router.post("/dsa", response_model=OptimizationResponse)
async def optimize_algorithm(request: OptimizationRequest):
    """
    Optimize an algorithm for better time/space complexity
    """
    # Build prompt for OpenAI
    prompt = build_optimizer_prompt(
        request.code,
        request.language,
        request.algorithm_type,
        request.expected_complexity,
        request.include_explanation
    )
    
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

        # Parse the JSON response
        import json
        try:
            result = json.loads(content)
            return OptimizationResponse(
                optimized_code=result["optimized_code"],
                time_complexity_before=result["time_complexity_before"],
                time_complexity_after=result["time_complexity_after"],
                space_complexity_before=result["space_complexity_before"],
                space_complexity_after=result["space_complexity_after"],
                explanation=result.get("explanation"),
                optimization_techniques=result["optimization_techniques"]
            )
        except json.JSONDecodeError:
            # If the response is not valid JSON, try to parse it as text
            lines = content.split("\n")
            return OptimizationResponse(
                optimized_code=lines[0] if lines else "",
                time_complexity_before="O(n)",
                time_complexity_after="O(n)",
                space_complexity_before="O(1)",
                space_complexity_after="O(1)",
                explanation=content,
                optimization_techniques=["General optimization"]
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to optimize algorithm: {str(e)}") 