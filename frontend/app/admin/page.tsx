'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    BarChart3,
    Users,
    Package,
    FileText,
    TrendingUp,
    ShieldCheck,
    Search,
    Download,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from 'lucide-react';
import { authStore } from '@/lib/auth-store';
import PortalHeader from '@/components/PortalHeader';

export default function AdminDashboard() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const user = authStore.getUser();

    useEffect(() => {
        setMounted(true);
        if (!authStore.isAuthenticated() || user?.role !== 'ADMIN') {
            // For demo purposes, we might allow viewing if we haven't set up the first admin yet
            // But in real app: router.push('/portal/login');
        }
    }, [router, user]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <PortalHeader />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Admin Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Ecosystem Analytics</h1>
                        <p className="text-slate-500 text-sm">Real-time oversight of DPP coverage and supplier compliance.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white text-slate-700 font-bold px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-sm shadow-sm">
                            <Download className="w-4 h-4" />
                            Export Report
                        </button>
                        <button className="flex items-center gap-2 bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-black transition-all text-sm shadow-lg shadow-slate-200">
                            <PlusIcon className="w-4 h-4" />
                            Register Supplier
                        </button>
                    </div>
                </div>

                {/* Global Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Products', value: '124', change: '+12%', up: true, icon: Package },
                        { label: 'Onboarded Suppliers', value: '18', change: '+2', up: true, icon: Users },
                        { label: 'DPP Coverage', value: '94%', change: '-0.5%', up: false, icon: FileText },
                        { label: 'System Health', value: '100%', change: 'Stable', up: true, icon: Activity },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                    }`}>
                                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart Area (Stub) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 min-h-[400px] flex flex-col">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    Ecosystem Transparency Trend
                                </h3>
                                <div className="flex gap-2">
                                    {['1W', '1M', '3M', '1Y'].map(t => (
                                        <button key={t} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors ${t === '3M' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-50'
                                            }`}>{t}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 flex items-end gap-2 pb-4">
                                {/* Visual Mock of a bar chart */}
                                {[40, 65, 55, 80, 70, 90, 85, 95, 100, 92, 105, 115].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                        <div
                                            className={`w-full rounded-t-lg transition-all duration-1000 ${i === 8 ? 'bg-blue-600' : 'bg-slate-100 group-hover:bg-slate-200'
                                                }`}
                                            style={{ height: `${h * 1.5}px` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-4 border-t border-slate-50">
                                <span>Jan 2025</span>
                                <span>Jul 2025</span>
                                <span>Jan 2026</span>
                            </div>
                        </div>

                        {/* Supplier Performance Table */}
                        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900">Supplier Quality Registry</h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                                    <input type="text" placeholder="Filter suppliers..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs focus:ring-1 focus:ring-blue-100 w-48 transition-all" />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Legal Name</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Country</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tier</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Passports</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {[
                                            { name: 'EcoWeave Fabrics', country: 'NL', tier: 'T1', count: 142, status: 'Active' },
                                            { name: 'Pure Cotton Co.', country: 'IN', tier: 'T4', count: 85, status: 'Active' },
                                            { name: 'DyeMaster Pro', country: 'VN', tier: 'T2', count: 0, status: 'Pending' },
                                            { name: 'Global Zippers Ltd.', country: 'CN', tier: 'T3', count: 31, status: 'Active' },
                                        ].map((s, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-500">{s.name.substring(0, 1)}</div>
                                                        <span className="text-sm font-bold text-slate-900">{s.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-400">{s.country}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">{s.tier}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-900 text-center">{s.count}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                                                        <span className="text-xs font-medium text-slate-600">{s.status}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-xl shadow-slate-200">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-blue-400" />
                                Compliance Radar
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Ecodesign Compliance', value: 88 },
                                    { label: 'Transparency Score', value: 72 },
                                    { label: 'Supply Chain Audited', value: 65 },
                                ].map((r, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400">{r.label}</span>
                                            <span className="font-bold">{r.value}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.value}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-10 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-xs font-bold border border-white/10 italic">
                                Get compliance tips →
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Filter className="w-4 h-4 text-blue-500" />
                                Quick Filters
                            </h3>
                            <div className="space-y-2">
                                {['T1 Suppliers', 'Missing PVC data', 'Recyclability < 5', 'Pending Audits'].map(f => (
                                    <button key={f} className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 flex justify-between items-center group">
                                        {f}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
    );
}
