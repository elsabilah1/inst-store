import axios from 'axios'

const config = {
  baseUrl: 'http://localhost:3000/api',
  timeout: 60 * 1000,
}

export const _axios = axios.create({
  baseURL: config.baseUrl,
  timeout: config.timeout,
})

_axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function (response) {
    response = response.data !== undefined ? response.data : response
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

interface IHeader {
  headers: {
    'Content-Type'?: string
  }
}

const header = (type?: string) => {
  const data: IHeader = {
    headers: {},
  }

  data.headers['Content-Type'] =
    type === 'form-data' ? 'multipart/form-data' : 'application/json'

  return data
}

const errors = (errors: any) => {
  return {
    status: false,
    error: errors.data,
  }
}

export const Get = async (url: any) => {
  try {
    const head = header()
    const get = await _axios.get(url, head)
    return get
  } catch (error: any) {
    return errors(error.response)
  }
}

export const Post = async (url: string, params: any, type?: string) => {
  try {
    const head = header(type)
    const post = await _axios.post(url, params, head)
    return post
  } catch (error: any) {
    return errors(error.response)
  }
}

export const Put = async (url: string, params: any, type?: string) => {
  try {
    const head = header(type)
    const put = await _axios.put(url, params, head)
    return put
  } catch (error: any) {
    return errors(error.response)
  }
}

export const Delete = async (url: any) => {
  try {
    const del = await _axios.delete(url)
    return del
  } catch (error: any) {
    return errors(error.response)
  }
}
