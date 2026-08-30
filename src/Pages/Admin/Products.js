import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout/Layout/Layout';
import AdminMenu from '../../component/Layout/Layout/AdminMenu';
import axios, { API_BASE } from '../../api/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product');
            if (data.success) {
                setProducts(data.products || []);
            } else {
                toast.error(data.message || 'Failed to fetch products');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout title="All Admin Products - Ecommerce">
            <div className="py-4 space-y-6">
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                    Manage Products
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-1">
                        <AdminMenu />
                    </div>

                    <div className="md:col-span-3 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-neutral-900">
                                Product Catalog ({products.length})
                            </h2>
                            <Link
                                to="/dashboard/admin/create-product"
                                className="text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-xl transition-colors shadow-sm"
                            >
                                + Add Product
                            </Link>
                        </div>

                        {products.length === 0 ? (
                            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500 shadow-sm">
                                No products found. Click "+ Add Product" to create one.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                                {products?.map((p) => (
                                    <Link
                                        key={p._id}
                                        to={`/dashboard/admin/product/${p.slug}`}
                                        className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
                                    >
                                        <div className="aspect-square w-full bg-neutral-100 overflow-hidden">
                                            <img
                                                src={`${API_BASE}/api/v1/product/photo-category/${p._id}`}
                                                alt={p.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4 flex flex-col justify-between flex-grow">
                                            <div>
                                                <h3 className="font-bold text-neutral-900 text-base truncate group-hover:text-primary-600 transition-colors">
                                                    {p.name}
                                                </h3>
                                                <p className="text-xs text-neutral-500 line-clamp-2 mt-1">
                                                    {p.description}
                                                </p>
                                            </div>
                                            <div className="mt-3 text-base font-extrabold text-primary-600">
                                                ₹ {p.price}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
