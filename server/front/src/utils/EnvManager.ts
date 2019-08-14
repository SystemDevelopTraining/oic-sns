export class EnvManager {
  private constructor() {}

  static get ApiServerUrl() {
    return process.env.API_SERVER_URL || 'http://localhost:3000';
  }
}
