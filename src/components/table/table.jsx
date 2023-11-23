import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import React, { useState } from 'react';
import { Modal } from 'antd';
import { useEffect } from "react";
import { useAppStore } from "../../store";
import "./table.css"

const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 const {  title, price,description,setTitle, setPrice ,setdescription,id,setID} = useAppStore();
 
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    Update();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Update = async () => {
    try {
      let responce = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          price
          
        })
      });
      let data = await responce.json();
      console.log(data)
      alert(`id:${data.id} & name ${data.title} is updated!`)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productID) => {
    try {
      let responce = await fetch(`https://dummyjson.com/products/${productID}`, {
        method: "DELETE",
      });
      let data = await responce.json();
      if (data.isDeleted === true) {
        alert(`${data.id} is Deleted & product name is :${data.title}`);
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [products, setProducts] = useState([]);
  const { searchKey } = useAppStore();
  const getProducts = async () => {
    try {
      let resp = await fetch(`https://dummyjson.com/products/search?q=${searchKey}`);
      let data = await resp.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts()
  }, [searchKey]);

  return (
    <table>
      <tr className="title">
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      {
        products.map(
          (el) => (
            <tr className="content-t">
              <th>{el?.id}</th>
              <th>{el?.title}</th>
              <th>{el?.description}</th>
              <th>{el?.price}$</th>
              <th className="action">
                <button className="delete" onClick={() => deleteProduct(el.id)}>
                  <MdDelete className="delete-icon" />
                </button>
                <button className="button-add" onClick={() => {showModal() , setID(el.id)}}>
                  <CiEdit className="edit-icon" />
                </button>


              </th>
            </tr>
          )
        )
      }
      <Modal title="Edit Prodect" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="inputs">
          <h4>Product Name</h4>
          <div className="search-box">
            <input
              placeholder="Ex: iphone x"
              value={title}
              onChange={(e) => setTitle (e.target.value)}


            />
          </div>
        </div>
        <div className="inputs">
          <h4>Description</h4>
          <div className="search-box">
            <input
              placeholder="Ex: An apple mobile which is nothing like apple"
              value={description }
              onChange={(e) => setdescription (e.target.value)}
            />
          </div>
        </div>
        <div className="inputs">
          <h4>Product Price</h4>
          <div className="search-box">
            <input
              placeholder="Ex: 12,000"
              value={price }
              onChange={(e) => setPrice (e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </table>

  );
};


export default Table;