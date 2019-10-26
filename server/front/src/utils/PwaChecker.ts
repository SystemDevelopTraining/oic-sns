export  class PwaChecker{
    //pwaで実行しているかどうか
    public static get isPwa():boolean{
        return window.matchMedia('(display-mode: standalone)').matches;
    }
}