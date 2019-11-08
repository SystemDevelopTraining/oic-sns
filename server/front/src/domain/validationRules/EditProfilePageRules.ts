export const urlRules = [
    (v: string) => {
        if (v !== ''){
        const pattern = /^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i;
        return pattern.test(v) || '正しいURLを入力してください';
        }
    }
];

export const qiitaUrlRules = [
    (v:string)=>{
        if (v !== ''){
        const pattern = /^https:\/\/qiita\.com\/./;
        return pattern.test(v) || '正しいURLを入力してください';
        }
    }
];

export const twitterUrlRules = [
    (v:string)=>{
        if (v !== ''){
        const pattern = /^https:\/\/twitter\.com\/./;
        return pattern.test(v) || '正しいURLを入力してください';
        }
    }
];

export const gitHubUrlRules = [
    (v:string)=>{
        if (v !== ''){
        const pattern = /^https:\/\/github\.com\/./;
        return pattern.test(v) || '正しいURLを入力してください';
        }
    }
];