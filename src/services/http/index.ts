import axios from 'axios'

import env from '@/infrastructure/env'

import { errorInterceptor } from './errorInterceptor'
import { requestInterceptor } from './requestInterceptor'

const http = axios.create({
  baseURL: `${env.VITE_API_URL}/hostfully-bff/api`
})

http.interceptors.request.use(requestInterceptor)
http.interceptors.response.use(undefined, errorInterceptor)

export default http
