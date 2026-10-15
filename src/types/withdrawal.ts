export interface WithdrawalTransaction {
  id: string;
  phoneNumber: string;
  network: string;
  networkName: string;
  companyName: string;
  amount: number;
  fee: number;
  status: 'pending' | 'completed' | string;
  remainingBalance: number;
  timestamp: number;
  formattedDate: string;
}
