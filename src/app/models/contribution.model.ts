export interface Contribution {
  contributionId: number;
  projectId: number;
  userId: number;
  amount: number;
  contributionDate: Date;
  paymentMethod: string;
  transactionId: string;
  status: string;
  isAnonymous: boolean;
  // Optional properties for related data
  project?: any;
  user?: any;
}