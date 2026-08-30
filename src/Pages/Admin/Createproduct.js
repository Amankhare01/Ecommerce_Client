import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import Layout from '../../component/Layout/Layout/Layout';
import AdminMenu from '../../component/Layout/Layout/AdminMenu';
import { FiUploadCloud } from "react-icons/fi";

const Createproduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");

    const getallcategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getallcategories();
    }, []);

    const handlecreate = async (e) => {
        e.preventDefault();
        try {
            const productdata = new FormData();
            productdata.append("name", name);
            productdata.append("description", description);
            productdata.append("price", price);
            productdata.append("quantity", quantity);
            if (photo) productdata.append("photo", photo);
            productdata.append("category", category);
            if (shipping) productdata.append("shipping", shipping);

            const { data } = await axios.post("/api/v1/product/create-product", productdata);
            if (data?.success) {
                toast.success(data?.message || "Product created successfully");
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data?.message || "Product creation failed");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error in creating product");
        }
    };

    return (
        <Layout title="Create Product - Admin">
            <div className="py-4 space-y-6">
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                    Create New Product
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-1">
                        <AdminMenu />
                    </div>

                    <div className="md:col-span-3">
                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm max-w-2xl space-y-5">
                            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                                Product Details
                            </h2>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Photo Upload Box */}
                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Product Photo
                                </label>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FiUploadCloud className="w-8 h-8 text-neutral-400 mb-2" />
                                        <p className="text-xs text-neutral-600 font-medium">
                                            {photo ? photo.name : "Click to upload product image"}
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        className="hidden"
                                    />
                                </label>
                                {photo && (
                                    <div className="mt-3 flex justify-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="preview"
                                            className="h-36 object-cover rounded-xl border border-neutral-200 shadow-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter product title"
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    rows="3"
                                    placeholder="Write product description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                        Price (INR)
                                    </label>
                                    <input
                                        type="number"
                                        value={price}
                                        placeholder="Price in ₹"
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        value={quantity}
                                        placeholder="Quantity available"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Shipping Available
                                </label>
                                <select
                                    value={shipping}
                                    onChange={(e) => setShipping(e.target.value)}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                >
                                    <option value="">Select Shipping Option</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>

                            <button
                                onClick={handlecreate}
                                className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-sm transition-colors mt-2"
                            >
                                Create Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Createproduct;
