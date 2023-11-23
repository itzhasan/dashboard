import "./table.css"
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import React, { useState } from 'react';
import { Modal } from 'antd';
import { useEffect } from "react";
import { useAppStore } from "../../store";

const Table = () => {

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
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [products, setProducts] = useState([]);
    const { searchKey , utitle, uprice,udescription,updateTitle, updatePrice ,updatedescription , id , setID} = useAppStore();
   
   const getid = (id) =>{
    return id;
   }

    const update = async (id) => {
        try {
          let resp = fetch(`https://dummyjson.com/products/${id}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              utitle,
              udescription,
              uprice
            })
          });
          let data = await resp.json();
          console.log(data)
        alert(`${data.id} is updated`);
        
        } catch (error) {
          console.log(error);
        }
      };



        
    const getProducts = async () => {
        try {
          let resp = await fetch(`https://dummyjson.com/products/search?q=${searchKey}`);
          let data = await resp.json();
          setProducts(data.products);          
          console.log(products.length);
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
                                <button className="edit" onClick={()=>{showModal(),setID(el.id);
                              //  updateTitle(el.utitle);
                                //updatedescription(el.udescription);
                               // updatePrice(el.uprice);
                               // getid(el);
                            }
                                } >
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
                        <input placeholder="Ex: iphone x" 
                        value={utitle}
                        onChange={(e) => updateTitle (e.target.value)}/>
                    </div>
                </div>
                <div className="inputs">
                    <h4>Description</h4>
                    <div className="search-box">
                        <input placeholder="Ex: An apple mobile which is nothing like apple" 
                         value={udescription }
                         onChange={(e) => updatedescription (e.target.value)}/>
                    </div>
                </div>
                <div className="inputs">
                    <h4>Product Price</h4>
                    <div className="search-box">
                        <input placeholder="Ex: 12,000" 
                         value={uprice }
                         onChange={(e) => updatePrice (e.target.value)}/>
                    </div>
                </div>
            </Modal>
        </table>

    );
};


export default Table;