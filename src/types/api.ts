export type ApiResponse<T> = {
  data: T
  code: number
}

export type StringBool = '0' | '1'
export type NullableStringBool = '0' | '1' | null
