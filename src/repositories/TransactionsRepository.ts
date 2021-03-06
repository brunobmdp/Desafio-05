/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balance = this.transactions.reduce(
      (accBalance, transaction) => {
        if (transaction.type === 'income') {
          accBalance.income += transaction.value;
          accBalance.total += transaction.value;
        } else {
          accBalance.outcome += transaction.value;
          accBalance.total -= transaction.value;
        }
        return accBalance;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
