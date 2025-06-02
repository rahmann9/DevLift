from typing import Optional, List

def build_stacktrace_prompt(
    stack_trace: str, 
    language: Optional[str] = None, 
    framework: Optional[str] = None
) -> str:
    """
    Build a prompt for analyzing stack traces
    
    Args:
        stack_trace: The error stack trace
        language: The programming language (e.g., Python, Java)
        framework: The framework being used (e.g., Django, Spring)
        
    Returns:
        A formatted prompt for the AI
    """
    prompt = [
        "You are an expert debugging assistant that helps developers understand error stack traces.",
        "Please analyze the following stack trace and provide:",
        "1. A clear explanation of what caused the error",
        "2. Step-by-step suggestions to fix the issue",
        "3. References to documentation if relevant",
        "\n\nStack Trace:\n",
        stack_trace
    ]
    
    if language:
        prompt.append(f"\nLanguage: {language}")
    
    if framework:
        prompt.append(f"\nFramework: {framework}")
    
    prompt.append("\nPlease format your response as JSON with the following structure:")
    prompt.append("""
    {
        "explanation": "Clear explanation of what's happening",
        "possible_fixes": ["Fix 1", "Fix 2", ...],
        "references": ["URL 1", "URL 2", ...]
    }
    """)
    
    return "\n".join(prompt)

def build_refactor_prompt(
    code: str,
    source_language: str,
    source_version: str,
    target_version: str,
    preserve_comments: bool = True,
    modernization_level: str = "moderate"
) -> str:
    """
    Build a prompt for refactoring/modernizing code
    
    Args:
        code: The code to refactor
        source_language: The programming language (e.g., Java, Python)
        source_version: Original language version (e.g., Java 8)
        target_version: Target language version (e.g., Java 17)
        preserve_comments: Whether to keep comments
        modernization_level: How aggressive the refactoring should be
        
    Returns:
        A formatted prompt for the AI
    """
    prompt = [
        f"You are an expert {source_language} developer tasked with modernizing code.",
        f"Please refactor the following {source_language} {source_version} code to use {target_version} features.",
        f"\nModernization level: {modernization_level.upper()}",
        f"Preserve comments: {'Yes' if preserve_comments else 'No'}",
        "\nOriginal code:\n",
        "```",
        code,
        "```",
        "\nPlease refactor this code to use modern features and best practices.",
        "For each change you make, briefly explain the reasoning behind it.",
        "Format your response as JSON with the following structure:",
        """
        {
            "refactored_code": "The complete refactored code",
            "changes_made": ["Change 1", "Change 2", ...],
            "migration_notes": "Any additional notes about the refactoring"
        }
        """
    ]
    
    return "\n".join(prompt)

def build_optimizer_prompt(
    code: str,
    language: str,
    algorithm_type: Optional[str] = None,
    expected_complexity: Optional[str] = None,
    include_explanation: bool = True
) -> str:
    """
    Build a prompt for optimizing algorithms
    
    Args:
        code: The algorithm code to optimize
        language: The programming language
        algorithm_type: What type of algorithm (sorting, searching, etc.)
        expected_complexity: Target complexity if known
        include_explanation: Whether to include a detailed explanation
        
    Returns:
        A formatted prompt for the AI
    """
    prompt = [
        "You are an expert algorithm optimization assistant.",
        f"Please analyze and optimize the following {language} code for better time and space complexity:",
        "\n```",
        code,
        "```\n"
    ]
    
    if algorithm_type:
        prompt.append(f"Algorithm type: {algorithm_type}")
    
    if expected_complexity:
        prompt.append(f"Target complexity: {expected_complexity}")
    
    prompt.append("\nPlease provide:")
    prompt.append("1. The optimized code")
    prompt.append("2. The time complexity before and after optimization")
    prompt.append("3. The space complexity before and after optimization")
    
    if include_explanation:
        prompt.append("4. A detailed explanation of the optimizations made")
    
    prompt.append("5. A list of the optimization techniques used")
    
    prompt.append("\nFormat your response as JSON with the following structure:")
    prompt.append("""
    {
        "optimized_code": "The optimized code",
        "time_complexity_before": "Original time complexity",
        "time_complexity_after": "New time complexity",
        "space_complexity_before": "Original space complexity",
        "space_complexity_after": "New space complexity",
        "explanation": "Detailed explanation of the optimizations",
        "optimization_techniques": ["Technique 1", "Technique 2", ...]
    }
    """)
    
    return "\n".join(prompt) 