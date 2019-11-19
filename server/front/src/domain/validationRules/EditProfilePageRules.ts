export const urlRules = [
    (v: string) => {
        const pattern = /^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i;
        return v === '' || pattern.test(v) || '正しいURLを入力してください';
    },
    (v: string) => v.length <= 255 || '255文字以内で入力してください'
];

export const twitterUrlRules = [
    (v:string)=>{
        const pattern = /^https:\/\/twitter\.com\/./;
        return v === '' || pattern.test(v) || '正しいURLを入力してください';
    },
    (v: string) => v.length <= 255 || '255文字以内で入力してください'
];

export const gitHubUrlRules = [
    (v:string)=>{
        const pattern = /^https:\/\/github\.com\/./;
        return v === '' || pattern.test(v) || '正しいURLを入力してください';
    },
    (v: string) => v.length <= 255 || '255文字以内で入力してください'
];