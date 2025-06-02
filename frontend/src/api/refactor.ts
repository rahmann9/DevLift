import apiClient from './client'

export interface RefactorRequest {
  code: string
  source_language: string
  source_version: string
  target_version: string
  preserve_comments?: boolean
  modernization_level?: string
}

export interface RefactorResponse {
  refactored_code: string
  changes_made: string[]
  migration_notes?: string
}

export const modernizeCode = async (data: RefactorRequest): Promise<RefactorResponse> => {
  const response = await apiClient.post<RefactorResponse>('/refactor/modernize', data)
  return response.data
} 