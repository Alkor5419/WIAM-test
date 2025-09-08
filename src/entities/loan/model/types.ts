export interface LoanData {
    loanAmount: number;
    loanTerm: number;
}

export interface LoanApplication {
    title: string;
    amount: number;
    term: number;
}

export interface ApiResponse {
    id: number;
    title: string;
}
