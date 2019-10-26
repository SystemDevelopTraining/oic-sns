//環境変数を取得するクラス
export class EnvManager{
    static get googleClientId(){
        return process.env.GOOGLE_CLIENT_ID
    }
    static get googleClientSecret(){
        return process.env.GOOGLE_CLIENT_SECRET
    }
    static get googleCallbackUrl(){
        return process.env.GOOGLE_CALLBACK_URL
    }
    static get jwtSecretKey(){
        return process.env.JWT_SECRET_KEY
    }
    static get frontUrl(){
        return process.env.FRONT_URL;
    }
}