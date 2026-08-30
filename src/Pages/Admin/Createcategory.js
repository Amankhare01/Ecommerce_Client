import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout/Layout";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import Categoryform from "../../component/Layout/form/Categoryform";
import { Modal } from 'antd';
import AdminMenu from "../../component/Layout/Layout/AdminMenu";

const Createcategory = () => {
    const [categories, setcategories] = useState([]);
    const [name, setname] = useState("");
    const [visible, setvisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [update, setUpdated] = useState("");

    const handleonsubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name });
            if (data?.success) {
                toast.success(`${name} is Created`);
                setname("");
                getallcategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong in input form");
        }
    };

    const getallcategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setcategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getallcategories();
    }, []);

    const handleupdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: update });
            if (data.success) {
                toast.success(`${update} is Updated`);
                setSelected(null);
                setUpdated("");
                setvisible(false);
                getallcategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handledelete = async (pid) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`);
            if (data.success) {
                toast.success("Category deleted");
                getallcategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Layout title={"Manage Categories - Admin"}>
            <div className="py-4 space-y-6">
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                    Manage Categories
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-1">
                        <AdminMenu />
                    </div>

                    <div className="md:col-span-3 space-y-6">
                        {/* Category Creation Card */}
                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm max-w-xl">
                            <h2 className="text-base font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-2">
                                Add New Category
                            </h2>
                            <Categoryform handleonsubmit={handleonsubmit} value={name} setValue={setname} />
                        </div>

                        {/* Category Table Card */}
                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-base font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-2">
                                Existing Categories ({categories.length})
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-neutral-600">
                                    <thead className="text-xs uppercase bg-neutral-50 text-neutral-500 border-b border-neutral-200">
                                        <tr>
                                            <th className="px-4 py-3">Category Name</th>
                                            <th className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {categories?.map((c) => (
                                            <tr key={c._id} className="hover:bg-neutral-50">
                                                <td className="px-4 py-3 font-semibold text-neutral-900">{c.name}</td>
                                                <td className="px-4 py-3 text-right space-x-2">
                                                    <button
                                                        className="text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                                                        onClick={() => {
                                                            setvisible(true);
                                                            setUpdated(c.name);
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                                                        onClick={() => handledelete(c._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <Modal
                            onCancel={() => setvisible(false)}
                            footer={null}
                            open={visible}
                        >
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4">Edit Category</h3>
                                <Categoryform value={update} setValue={setUpdated} handleonsubmit={handleupdate} />
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Createcategory;