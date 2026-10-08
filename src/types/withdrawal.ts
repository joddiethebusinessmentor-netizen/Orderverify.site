export interface WithdrawalTransaction {
  id: string; // e.g. "OV-83921049"
  phoneNumber: string;
  network: string; // "mpesa" | "tigo" | "airtel" | "halopesa"
  networkName: string; // "Vodacom M-Pesa", "Tigo Pesa", "Airtel Money", "HaloPesa"
  companyName: string; // "OrderVerify Tanzania Limited"
  amount: number;
  fee: number;
  status: 'pending';
  remainingBalance: number;
  timestamp: number;
  formattedDate: string;
}
