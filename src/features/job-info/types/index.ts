export type PositionType = '백엔드' | '프론트엔드' | '데이터';
export type CareerType = '신입' | '1-3년' | '3-5년' | '경력무관';
export type RegionType = '서울' | '경기' | '인천' | '부산';

export type JobData = {
  id: number;
  companyName: string;
  position: string;
  positionType: PositionType;
  location: string;
  region: RegionType;
  experience: CareerType;
  salary: string;
  dDay: string;
  techStacks?: string[];
  isNew?: boolean;
};
