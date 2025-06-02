from typing import Optional, Dict, Any
import httpx
import os
from openai import OpenAI
from nvidia_nim import NIMClient
from cloudflare import Cloudflare
from together import Together

class AIService:
    def __init__(self):
        self.providers = {
            "nvidia": self._init_nvidia(),
            "cloudflare": self._init_cloudflare(),
            "together": self._init_together(),
            "openai": self._init_openai()
        }
        self.current_provider = "nvidia"  # Start with NVIDIA as default

    def _init_nvidia(self) -> Optional[NIMClient]:
        try:
            api_key = os.getenv("NVIDIA_API_KEY")
            if not api_key:
                return None
            return NIMClient(api_key=api_key)
        except Exception:
            return None

    def _init_cloudflare(self) -> Optional[Cloudflare]:
        try:
            api_key = os.getenv("CLOUDFLARE_API_KEY")
            if not api_key:
                return None
            return Cloudflare(token=api_key)
        except Exception:
            return None

    def _init_together(self) -> Optional[Together]:
        try:
            api_key = os.getenv("TOGETHER_API_KEY")
            if not api_key:
                return None
            return Together(api_key=api_key)
        except Exception:
            return None

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
        Generate a response using the available AI providers with fallback
        """
        providers_order = ["nvidia", "cloudflare", "together", "openai"]
        last_error = None

        for provider_name in providers_order:
            provider = self.providers.get(provider_name)
            if not provider:
                continue

            try:
                if provider_name == "nvidia":
                    response = await provider.generate(prompt=prompt, **kwargs)
                elif provider_name == "cloudflare":
                    response = await provider.ai.run(prompt=prompt, **kwargs)
                elif provider_name == "together":
                    response = await provider.complete(prompt=prompt, **kwargs)
                elif provider_name == "openai":
                    response = await provider.chat.completions.create(
                        messages=[{"role": "user", "content": prompt}],
                        **kwargs
                    )
                
                return {
                    "provider": provider_name,
                    "response": response,
                    "success": True
                }
            except Exception as e:
                last_error = e
                continue

        raise Exception(f"All AI providers failed. Last error: {str(last_error)}")

    def get_available_providers(self) -> list[str]:
        """
        Return list of available AI providers
        """
        return [name for name, provider in self.providers.items() if provider is not None]

# Create a singleton instance
ai_service = AIService() 