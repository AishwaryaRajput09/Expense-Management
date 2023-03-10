import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker} from "antd";
import Layout from "../components/Layouts/Layout";
import moment from 'moment';
import axios from "axios";
import Spinner from "../components/Spinner";
const {RangePicker} = DatePicker;

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");

  // table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render : (text) => {
        return moment(text).format('YYYY-MM-DD')
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
    },
  ];

  //get all transactions
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/transactions/get-transactions", {
        userid: user._id,
        frequency,
        selectedDate,
        type,

      });
      setLoading(false);
      setAllTransactions(res.data);
      console.log(res.data);
    } catch (err) {
      setLoading(false);
      message.error("Failed to get transactions");
    }
  };

  //useEffecT hook
  useEffect(() => {
    
    getAllTransactions();
  }, [frequency,selectedDate,type]);

  //form handleling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post("/transactions/add-transaction", {
        ...values,
        userid: user._id,
        ...(type !== "all" && { type })
      });
      setLoading(false);
      message.success("Transaction Added Successfully");
      setShowModal(false);
    } catch (err) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
        <h6>Select Frequency</h6>
        <Select value={frequency} onChange = {(values) =>setFrequency(values)}>
          <Select.Option value="7">Last 1 Week</Select.Option>
          <Select.Option value="30">Last 1 Month</Select.Option>
          <Select.Option value="365">Last 1 Year</Select.Option>
          <Select.Option value="custom">custom</Select.Option>
        </Select>
        {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
        </div>
        <div>
        <h6>Select Type</h6>
        <Select value={type} onChange = {(values) =>setType(values)}>
          <Select.Option value="all">Last 1 Week</Select.Option>
          <Select.Option value="income">Last 1 Month</Select.Option>
          <Select.Option value="expense">Last 1 Year</Select.Option>
        </Select>
        {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
        </div>

        <div>
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>


      
      <div className="content">
        <Table columns={columns} dataSource={allTransactions} />
      </div>
      <Modal
        title="Add Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="bonus">Bonus</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="loan">Loan</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="health">Health</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
              <Select.Option value="savings">Savings</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
}

export default HomePage;
