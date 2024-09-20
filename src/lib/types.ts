export type TJobItemBrief = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: number;
  relevanceScore: number;
};

export type TJobItemDetail = TJobItemBrief & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};

export type TSortingMethod = "relevant" | "recent";

export type TPaginationDirection = "next" | "prev";
