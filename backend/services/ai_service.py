from typing import Optional, Dict, Any
import os
from openai import OpenAI

class AIService:
    def __init__(self):
        self.provider = self._init_openai()

    def _init_openai(self) -> Optional[OpenAI]:
        try:
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                return None
            return OpenAI(api_key=api_key)
        except Exception:
            return None

    async def generate_response(self, prompt: str, **kwargs) -> Dict[str, Any]:
        """
        Generate a response using OpenAI
        """
        if not self.provider:
            raise Exception("OpenAI provider not initialized. Please set OPENAI_API_KEY in .env file.")

        try:
            response = await self.provider.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                **kwargs
            )
            
            return {
                "provider": "openai",
                "response": response,
                "success": True
            }
        except Exception as e:
            raise Exception(f"OpenAI request failed: {str(e)}")

    def get_available_providers(self) -> list[str]:
        """
        Return list of available AI providers
        """
        return ["openai"] if self.provider is not None else []

# Create a singleton instance
ai_service = AIService() 