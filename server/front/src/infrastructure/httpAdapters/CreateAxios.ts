import *as Axios from 'axios';
import aa from 'axios';
import { EnvManager }from '../../utils/EnvManager';
import { cacheAdapterEnhancer, throttleAdapterEnhancer}from 'axios-extensions';

/*eslint @typescript-eslint/no-explicit-any:0*/

export interface MyAxios extends Axios.AxiosInstance{
    get<T = any, R = Axios.AxiosResponse<T>>(url: string, config?: ({useCache?:boolean}&Axios.AxiosRequestConfig) | undefined): Promise<R>;
}
 
let axios: MyAxios | undefined;
const adapter = aa.defaults.adapter as Axios.AxiosAdapter;

export function CreateAxios(jwt?: string) {
    if (axios === undefined)
        axios = Axios.default.create({
            baseURL: EnvManager.ApiServerUrl,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            adapter: throttleAdapterEnhancer( 
                cacheAdapterEnhancer(adapter,{enabledByDefault: false,cacheFlag: "useCache"}),
                {threshold: 10 * 1000}
            )
        });
    return axios;
}