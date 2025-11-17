export interface Ifaq {
    _id: string;
    question: string;
    answer: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface IPagination {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
}

export interface IDashboardData {
    customers: number;
    vendors: number;
    packages: number;
    revenues: number;
    subscribers: number;
    incomes: number;
}
export interface IUserStatistics {
    month: string;
    customers: number;
    vendors: number;
}
export interface IEarningStatistics {
    month: string;
    revenue: number;
}
export interface IEsubscriptonStatistics {
    month: string;
    total: number;
}

export interface IBanner {
    _id: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}
export interface ICategory {
    _id: string;
    name: string;
    image: string;
}