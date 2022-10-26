export interface IChapter {
  content: string;
  id: number | string;
  timestamp: string;
}

export interface IFeature {
  content: string;
  id: string | number;
  title: string;
  percentage: number;
}

export interface IFeature2 extends IChapter {
  percentage: number;
}
