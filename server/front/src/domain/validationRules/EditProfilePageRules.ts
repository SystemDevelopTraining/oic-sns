export const urlRules = [
    (v: string) => {
        const pattern = /^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i;
        return pattern.test(v) || '正しいURLを入力してください';
    }
];