export interface Story {
  id: number;
  title: string;
  category: string;
  moral: string;
  content: string;
  image: string;
  dayOfYear: number;
}

export type Category = 'እንስሳት' | 'ጥበብ' | 'ጀግንነት' | 'ቤተሰብ';