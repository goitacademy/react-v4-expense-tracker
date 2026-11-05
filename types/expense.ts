export type Category = {
  id: string;
  name: string;
  iconUrl: string;
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
};
