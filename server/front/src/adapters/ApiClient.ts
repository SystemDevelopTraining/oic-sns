import * as Axios from 'axios';
import { EnvManager } from '../utils/EnvManager';

export class ApiClient {
  private axios: Axios.AxiosInstance;

  constructor() {
    this.axios = Axios.default.create({
      baseURL: EnvManager.ApiServerUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async GetRoute(): Promise<string> {
    return (await this.axios.get('', {
      headers: {
        'Content-Type': 'text/plain',
      },
    })).data;
  }
}
