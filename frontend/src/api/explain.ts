import apiClient from './client'

export interface StackTraceRequest {
  stack_trace: string
  language?: string
  framework?: string
}

export interface ExplanationResponse {
  explanation: string
  possible_fixes: string[]
  references?: string[]
}

export const explainStackTrace = async (data: StackTraceRequest): Promise<ExplanationResponse> => {
  const response = await apiClient.post<ExplanationResponse>('/explain/stacktrace', data)
  return response.data
} 