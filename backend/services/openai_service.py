import os
from typing import Optional
from openai import OpenAI
import logging

logger = logging.getLogger(__name__)

# Singleton client to be reused
_openai_client = None

def get_openai_client():
    """
    Returns a singleton OpenAI client instance.
    Creates the client if it doesn't exist yet.
    """
    global _openai_client
    
    if _openai_client is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            logger.warning("OPENAI_API_KEY not found in environment variables")
            # Use a dummy key for development if needed
            api_key = "dummy_key_for_development"
        
        _openai_client = OpenAI(api_key=api_key)
    
    return _openai_client

async def generate_completion(
    prompt: str, 
    model: str = "gpt-4",
    temperature: float = 0.7,
    max_tokens: int = 2000
) -> Optional[str]:
    """
    Generate a completion using OpenAI's API
    
    Args:
        prompt: The prompt to send to OpenAI
        model: The model to use
        temperature: Controls randomness (0-1)
        max_tokens: Maximum number of tokens to generate
        
    Returns:
        The generated text or None if an error occurred
    """
    client = get_openai_client()
    
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are DevLift, an AI assistant that helps developers with debugging, refactoring, and optimizing code."},
                {"role": "user", "content": prompt}
            ],
            temperature=temperature,
            max_tokens=max_tokens
        )
        
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Error generating OpenAI completion: {str(e)}")
        return None 