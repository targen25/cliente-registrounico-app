export interface IHttpParams {
  method: 'delete' | 'get' | 'put' | 'post';
  url: string;
  data?: any;
}
