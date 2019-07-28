import axios from 'axios';

class HttpService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    };

    this.service = axios.create({
      // `baseURL` will be prepended to `url` unless `url` is absolute.
      // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
      // to methods of that instance.
      baseURL: this.baseUrl,
      // `withCredentials` indicates whether or not cross-site Access-Control requests
      // should be made using credentials
      withCredentials: true
    });
    // interceptors - перехватчик. You can intercept requests or responses before they are handled by then or catch
    this.service.interceptors.response.use(
      responseSuccessInterceptor,
      responseFailureInterceptor
    );
  }

  request({ method, url, data, headers }) {
    // из экземпляра axios отправляется запрос с базового url
    return this.service.request({
      method,
      url, // axios сконкатенирует url т.о. this.baseURL + url в итоге будет, напрмер, http://localhost:3005/api/login
      responseType: 'json',
      data,
      headers: Object.assign({}, headers, this.headers)
    })
      .then(({ data }) => data);
  }

  get(url, headers = {}) {
    return this.service.request({
      method: 'get',
      url, // axios сконкатенирует url т.о. this.baseURL + url в итоге будет http://localhost:3005/api/me
      data: null,
      headers: Object.assign({}, headers, this.headers)
    })
      .then(({ data }) => data);
  }

  // url ='login', data = {username: "123", password: "123"}
  post(url, data, headers = {}) {
    return this.request({
      method: 'post',
      url,
      data,
      headers
    });
  }

  put(url, data, headers = {}) {
    return this.request({
      method: 'put',
      url,
      data,
      headers
    });
  }

  delete(url, data, headers = {}) {
    return this.request(url, {
      method: 'delete',
      url,
      data,
      headers
    });
  }
}

const responseSuccessInterceptor = (response) => {
  return response;
};

const responseFailureInterceptor = (error) => {
  if (error.response && error.response.status === 401 && location.hash !== '') {
    // базовая страница авторизации
    window.location = '';
  }
  return Promise.reject(error.response);
};
// process.env.API_URL - значение объявлено в webpack
const httpClient = new HttpService(process.env.API_URL);

export default httpClient;
