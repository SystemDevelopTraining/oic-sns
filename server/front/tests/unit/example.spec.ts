import { ApiClient } from "~/src/infrastructure/httpAdapters/ApiClient";

process.env.API_SERVER_URL = 'http://server:3000';

describe('hoge', () => {
  it('aaa', async () => {
    const result = await new ApiClient().GetRoute();
    expect(result).toMatch('Hello World!');
  });
});
