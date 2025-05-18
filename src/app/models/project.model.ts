
export interface Project {
  projectId: number;
  userId: number;
  title: string;
  description: string;
  shortDescription: string;
  categoryId: number;
  fundingType: string;
  fundingGoal: number;
  amountRaised: number;
  startDate: string;
  endDate: string;
  status: string;
  coverImage: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string | null;
  isFeatured: boolean;
  verificationStatus: string;
  risksChallenges: string;
  viewsCount: number;
}