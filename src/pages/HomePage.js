import React,{useState} from 'react';
import {Modal} from 'antd';
import Layout from '../components/Layouts/Layout';

function HomePage() {
  const [showModal,setShowModal] = useState(false);
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
            <h1>Hello</h1>
          </Modal>
    </Layout>
  )
}

export default HomePage