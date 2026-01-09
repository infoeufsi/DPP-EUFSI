'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Plus,
    Package,
    FileText,
    Clock,
    ChevronRight,
    AlertCircle,
    BarChart3,
    TrendingUp
} from 'lucide-react';
import { authStore } from '@/lib/auth-store';
import PortalHeader from '@/components/PortalHeader';

export default function PortalDashboard() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const user = authStore.getUser();

    useEffect(() => {
        setMounted(true);
        if (!authStore.isAuthenticated()) {
            router.push('/portal/login');
        }
    }, [router]);

    if (!mounted || !authStore.isAuthenticated()) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <PortalHeader />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name}</h1>
                        <p className="text-slate-500">Manage your product passports and supply chain data.</p>
                    </div>
                    <button
                        onClick={() => router.push('/portal/wizard')}
                        className="flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 w-full md:w-auto justify-center"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Batch
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Passports', value: '42', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Active Batches', value: '12', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Compliance Rate', value: '94%', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
                        { label: 'Pending Updates', value: '3', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Batches */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            Recent Batches
                        </h2>
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="divide-y divide-slate-50">
                                {[
                                    { id: 'LOT-2026-001', product: 'Organic Cotton T-Shirt', date: '2026-01-08', status: 'Published', progress: 100 },
                                    { id: 'LOT-2026-002', product: 'Recycled Denim Jacket', date: '2026-01-09', status: 'Draft', progress: 65 },
                                    { id: 'LOT-2025-098', product: 'Luxury Wool Sweater', date: '2025-12-15', status: 'Published', progress: 100 },
                                ].map((batch, idx) => (
                                    <div key={idx} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{batch.id}</p>
                                                <p className="text-xs text-slate-500">{batch.product}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="hidden sm:flex flex-col items-end">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{batch.progress}% Complete</span>
                                                    <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500" style={{ width: `${batch.progress}%` }}></div>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-slate-400">{batch.date}</span>
                                            </div>
                                            <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${batch.status === 'Published' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                                                }`}>
                                                {batch.status}
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-4 text-xs font-bold text-blue-600 hover:bg-slate-50 transition-colors border-t border-slate-50">
                                View All Batches
                            </button>
                        </div>
                    </div>

                    {/* Quick Actions / Insights */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                            Health Scan
                        </h2>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                            <div className="space-y-4">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full border-4 border-slate-50 flex items-center justify-center relative mb-3">
                                        <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent -rotate-45"></div>
                                        <span className="text-2xl font-bold">8.2</span>
                                    </div>
                                    <p className="font-bold text-sm">Transparency Score</p>
                                    <p className="text-xs text-slate-500">Above sector average (7.1)</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Alerts</p>
                                <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex gap-3">
                                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                                    <p className="text-[11px] text-amber-800 leading-tight">
                                        3 batches from Supplier Tier 3 are missing carbon footprint data.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
