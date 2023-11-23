import React, { useState } from 'react';
import { Modal } from 'antd';
import './add.css'
import { useAppStore } from "../../store";

const Addbut = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {  title, price,description,setTitle, setPrice ,setdescription} = useAppStore();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        add();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const add = async () => {
        try {
          let resp = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title ,
              description,
              price
              
              /* other product data */
            })
          });
          let data = await resp.json();
          alert(`new product id :${data.id} & new product name ${data.title}`)
          console.log(data)
          
      
        } catch (error) {
          console.log(error);
        }
      };
      


    return (
        <div>
            <button className="button-add" onClick={showModal}> + New Product</button>
            <Modal title="Add New Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="inputs">
                    <h4>Product Name</h4>
                    <div className="search-box">
                        <input
                         placeholder="Ex: iphone x" 
                         value={title }
                         onChange={(e) => setTitle (e.target.value)}
                         />
                    </div>
                </div>
                <div className="inputs">
                    <h4>Description</h4>
                    <div className="search-box">
                        <input 
                        placeholder="Ex: An apple mobile which is nothing like apple"
                        value={description}
                        onChange={(e) => setdescription (e.target.value)}
                        />
                    </div>
                </div>
                <div className="inputs">
                    <h4>Product Price</h4>
                    <div className="search-box">
                        <input
                         placeholder="Ex: 12,000" 
                         value={price}
                         onChange={(e) => setPrice (e.target.value)}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
};


export default Addbut;