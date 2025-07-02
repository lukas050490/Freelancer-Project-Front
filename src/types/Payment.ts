export type PaymentType = 'PROPOSAL' | 'CONTRACT' | 'RECEIPT';
export type PaymentStatus = 'PENDING' | 'PAID';

export interface Payment {
    id: string;
    amount: number;
    type: PaymentType;
    status: PaymentStatus;
    projectId: string;
    createdAt: string;
}
