import { AxiosRequestConfig } from 'axios'
import { ReactNode } from 'react'

export type Request = AxiosRequestConfig & {
  payload?: any
}

export type ResponseError = {
  code: number
  message: string
}

export type Response<T = any> = {
  data: T,
 
  message: string
}

export type Children = ReactNode | ReactNode[]
