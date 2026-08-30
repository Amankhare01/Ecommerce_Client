import React from 'react';

const Categoryform = ({ handleonsubmit, value, setValue }) => {
  return (
    <form onSubmit={handleonsubmit} className="space-y-3">
      <div>
        <input
          type="text"
          className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm transition-colors"
      >
        Submit Category
      </button>
    </form>
  );
};

export default Categoryform;
