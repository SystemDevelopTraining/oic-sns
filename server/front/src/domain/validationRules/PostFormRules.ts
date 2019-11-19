export const  postRules = [
    (v: string) => !!v || '投稿内容を入力してください。',
    (v: string) => v.length <= 255 || '255文字以内で入力してください',
    (v: string) => {
      const pattern = /\S\s*?/;
      return pattern.test(v) || '空白、改行だけの投稿はできません。';
    },
  ];