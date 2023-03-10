import React,{useState} from 'react';
import {Modal,Form, Input, Select} from 'antd';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';

function HomePage() {
  const [showModal,setShowModal] = useState(false);
  const [loading,setLoading] = useState(false);

  //form handleling 
  const handleSubmit = async (values) => {
    try{
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true); 
        axios.post
    }catch(err){

    }
  }
  return (
    <Layout>
        <div className="filters">
          <div>range filters</div>
          <div>
            <button className='btn btn-success' 
            onClick={() => setShowModal(true)}>
            Add New
            </button>
          </div>
          </div>
          <div className="content">

          </div>
          <Modal title = "Add Transaction" 
          open= {showModal} onCancel= {() => setShowModal(false)}
            footer = {false}
          > 
            <Form layout='vertical' onFinish={handleSubmit}>
              <Form.Item label = "Amount" name = "amount">
                <Input type="text" />
              </Form.Item>
            <Form.Item label = "type" name = "type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label = "category" name = "category">
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
            <Form.Item label = "Description" name = "description">
              <Input type="text" />
            </Form.Item>
            <Form.Item label = "Date" name = "date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label = "Reference" name = "reference">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type ="submit" className="btn btn-primary">SAVE</button>
            </div>
            </Form>
          </Modal>
    </Layout>
  )
}

export default HomePage