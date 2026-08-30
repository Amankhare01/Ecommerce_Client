import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios, { API_BASE } from "../../api/axios";
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../component/Layout/Layout/Layout';
import AdminMenu from '../../component/Layout/Layout/AdminMenu';
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

const Updateproduct = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");

    const getsingleproduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            if (data?.product) {
                setName(data.product.name);
                setId(data.product._id);
                setDescription(data.product.description);
                setPrice(data.product.price);
                setQuantity(data.product.quantity);
                setShipping(data.product.shipping ? "1" : "0");
                setCategory(data.product.category?._id || data.product.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params?.slug) getsingleproduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.slug]);

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
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getallcategories();
    }, []);

    const handleupdate = async (e) => {
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
            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productdata);
            if (data?.success) {
                toast.success(data?.message || "Product updated successfully");
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data?.message || "Product update failed");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error in updating product");
        }
    };

    const handledelete = async () => {
        try {
            let answer = window.prompt("Are you sure you want to delete this product? Type 'yes' to confirm:");
            if (answer !== "yes") return;
            const { data } = await axios.delete(`/api/v1/product/del-product/${id}`);
            toast.success(data?.message || "Product deleted successfully");
            navigate('/dashboard/admin/products');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong deleting product");
        }
    };

    return (
        <Layout title="Update Product - Admin">
            <div className="py-4 space-y-6">
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                    Update Product
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-1">
                        <AdminMenu />
                    </div>

                    <div className="md:col-span-3">
                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm max-w-2xl space-y-5">
                            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                                Edit Details
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

                            {/* Photo Box */}
                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Product Photo
                                </label>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FiUploadCloud className="w-8 h-8 text-neutral-400 mb-2" />
                                        <p className="text-xs text-neutral-600 font-medium">
                                            {photo ? photo.name : "Click to upload a new product photo"}
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
                                <div className="mt-3 flex justify-center">
                                    {photo ? (
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="preview"
                                            className="h-36 object-cover rounded-xl border border-neutral-200 shadow-sm"
                                        />
                                    ) : (
                                        id && (
                                            <img
                                                src={`${API_BASE}/api/v1/product/photo-category/${id}`}
                                                alt="current product"
                                                className="h-36 object-cover rounded-xl border border-neutral-200 shadow-sm"
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
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
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    onClick={handleupdate}
                                    className="flex-1 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm py-3 rounded-xl shadow-sm transition-colors"
                                >
                                    Update Product
                                </button>
                                <button
                                    onClick={handledelete}
                                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-colors"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                    <span>Delete Product</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Updateproduct;
