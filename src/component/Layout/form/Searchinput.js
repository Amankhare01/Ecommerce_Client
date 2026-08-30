import React from "react";
import { useSearch } from "../../../Pages/context/Search";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { FiSearch } from "react-icons/fi";

const Searchinput = () => {
    const [values, setvalues] = useSearch();
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!values.keyword?.trim()) return;
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
            setvalues({ ...values, result: data });
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="relative flex items-center w-full max-w-xs" role="search" onSubmit={handlesubmit}>
            <input
                className="w-full bg-neutral-100 border border-neutral-300 text-neutral-900 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                type="search"
                placeholder="Search products..."
                aria-label="Search"
                value={values.keyword}
                onChange={(e) => setvalues({ ...values, keyword: e.target.value })}
            />
            <button type="submit" className="absolute left-2.5 text-neutral-500 hover:text-primary-600 transition-colors" aria-label="Search">
                <FiSearch className="w-4 h-4" />
            </button>
        </form>
    );
};

export default Searchinput;
