import apiClient from './client'

export interface OptimizationRequest {
  code: string
  language: string
  algorithm_type?: string
  expected_complexity?: string
  include_explanation?: boolean
}

export interface OptimizationResponse {
  optimized_code: string
  time_complexity_before: string
  time_complexity_after: string
  space_complexity_before: string
  space_complexity_after: string
  explanation?: string
  optimization_techniques: string[]
}

export const optimizeAlgorithm = async (data: OptimizationRequest): Promise<OptimizationResponse> => {
  const response = await apiClient.post<OptimizationResponse>('/optimize/dsa', data)
  return response.data
} 