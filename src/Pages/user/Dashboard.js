import React from 'react';
import Layout from '../../component/Layout/Layout/Layout';
import Usermenu from '../../component/Layout/Layout/Usermenu';
import { useAuth } from '../context/Auth';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title="User Dashboard - Ecommerce">
      <div className="py-4 space-y-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          User Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="md:col-span-1">
            <Usermenu />
          </div>
          <div className="md:col-span-3">
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm max-w-2xl space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
                Account Overview
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-semibold uppercase text-neutral-400 block">Name</span>
                  <span className="font-semibold text-neutral-800 text-base">{auth?.users?.name}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-neutral-400 block">Email Address</span>
                  <span className="font-semibold text-neutral-800">{auth?.users?.email}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-neutral-400 block">Phone</span>
                  <span className="font-semibold text-neutral-800">{auth?.users?.phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-neutral-400 block">Address</span>
                  <span className="font-semibold text-neutral-800">{auth?.users?.address || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;