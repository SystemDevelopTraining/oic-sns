import Moment from 'moment';

export class PostAndCommentViewData {
    private text: string;
    private date :Date;
    private userName:string;

    public constructor(text:string,date:Date,userName:string) {
        this.text = text;
        this.date = date;
        this.userName = userName;
    }

    //表示用の投稿&コメントした人の名前
    get ViewName() :string{
        const limitNum = 12;
        let shortName = this.userName;
        if (shortName.length > limitNum) {
          shortName = shortName.substr(0, limitNum) + '...';
          return shortName;
        }
        return this.userName;
      }

    //表示用の投稿&コメントのテキスト
    public get ViewLineTexts():string[] {
        return this.text.split('\n');
    }

    //表示用の投稿&コメントしたDate
    public get ViewDate() :string{
        Moment.locale('ja');
        const date = Moment(this.date).format('LLL');
        return date;
      }
}