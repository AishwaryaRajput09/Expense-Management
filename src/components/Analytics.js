import React from "react";
import { Progress } from "antd";

// category
const categories = [
  "salary",
  "bonus",
  "rent",
  "food",
  "shopping",
  "travel",
  "entertainment",
  "health",
  "education",
  "other",
];

//total Transaction
const Analytics = ({ allTransactions }) => {
  const totalTransaction = allTransactions.length;
  const totalIncomeTransactions = allTransactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercentage =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercentage =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total Turnover
  const totalTurnover = allTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              Total Transaction : {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransactions.length}{" "}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransactions.length}{" "}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">Total TurnOver : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnoverPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
  <div className="col-md-4">
    <h4>Category Wise Income</h4>
    {categories.map((category) => {
      const amount = allTransactions
        .filter(
          (transaction) =>
            transaction.type === "income" &&
            transaction.category === category
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0);
      return (
        (
          amount > 0 && (<div className="card">
            <div className="card-body">
              <h5>{category}</h5>
              <Progress
                type="line"
                strokeColor={"blue"}
               percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
              />
            </div>
          </div>)
        )
      );
    })}
  </div>
  <div className="col-md-4">
    <h4>Category Wise Expense</h4>
    {categories.map((category) => {
      const amount = allTransactions
        .filter(
          (transaction) =>
            transaction.type === "expense" &&
            transaction.category === category
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0);
      return (
        (
          amount > 0 && (<div className="card">
            <div className="card-body">
              <h5>{category}</h5>
              <Progress
                type="line"
                strokeColor={"blue"}
               percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
              />
            </div>
          </div>)
        )
      );
    })}
  </div>
</div>

    </>
  );
};

export default Analytics;
