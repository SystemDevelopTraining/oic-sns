
export const nameRules = [
    (v: string) => !!v || '本名を入力してください',
    (v: string) => v.length <= 25 || '25文字以内で入力してください',
    (v: string) => {
      const pattern = /^\S/;
      return pattern.test(v) || '正しい本名を入力してください';
    },
];

export const requiredRules = [(v: string) => !!v || '選択してください'];

export const classNumberRules = [
    (v: string) => !!v || 'クラス番号を入力してください',
    (v: string) => v.length <= 6 || '6文字以内で入力してください',
    (v: string) => {
      const pattern = /^[1-4][A-Z][0-9]{2}[A-Z]{2}/;
      return pattern.test(v) || '正しいクラス番号を入力してください';
    },
  ];