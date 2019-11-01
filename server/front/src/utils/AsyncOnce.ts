// 同時に一度しか非同期の処理が行われないように保証される
// 処理中にもう一つ実行しようとした場合はキャンセルされる

export class AsyncOnce {
    private onceFlags = false;
  
    //同時に一度しか実行したくない処理を実行
    public async Do<R>(f: () => R) :Promise<R|undefined>{
     try { if (this.onceFlags)return;
      this.onceFlags = true;
      const result = await f();
      this.onceFlags = false;
      return result;
     }catch (e){
      this.onceFlags = false;
       throw e;
     }
    }
  }