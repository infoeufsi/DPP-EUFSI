'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Package,
    Search,
    ArrowLeft,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
    MoreHorizontal,
    ChevronRight
} from 'lucide-react';
import PortalHeader from '@/components/PortalHeader';
import { authStore } from '@/lib/auth-store';

export default function AdminProducts() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <PortalHeader />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <button
                    onClick={() => router.push('/admin')}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-xs font-bold uppercase tracking-widest mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Dashboard
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Product Oversight</h1>
                        <p className="text-slate-500 text-sm">Managing 124 products across the ecosystem.</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by GTIN or Name..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none w-full md:w-64 shadow-sm"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product / GTIN</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Batches</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">DPP Coverage</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { name: 'Organic Cotton T-Shirt', gtin: '01234567890123', category: 'Apparel', batches: 12, coverage: 100, status: 'Compliant' },
                                { name: 'Recycled Denim Jacket', gtin: '09876543210987', category: 'Apparel', batches: 4, coverage: 75, status: 'Attention' },
                                { name: 'Luxury Wool Sweater', gtin: '04567891234567', category: 'Knitwear', batches: 2, coverage: 0, status: 'Drafting' },
                                { name: 'Active Performance Leggings', gtin: '07891234567890', category: 'Sportswear', batches: 24, coverage: 100, status: 'Compliant' },
                            ].map((p, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 leading-tight">{p.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{p.gtin}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-medium text-slate-500">{p.category}</span>
                                    </td>
                                    <td className="px-8 py-6 text-center text-sm font-bold text-slate-900">{p.batches}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-center gap-1.5">
                                            <span className="text-[10px] font-bold text-slate-900">{p.coverage}%</span>
                                            <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${p.coverage === 100 ? 'bg-emerald-500' : p.coverage > 0 ? 'bg-blue-500' : 'bg-slate-200'}`}
                                                    style={{ width: `${p.coverage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.status === 'Compliant' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                p.status === 'Attention' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                                    'bg-slate-100 text-slate-500 border border-slate-200'
                                            }`}>
                                            {p.status === 'Compliant' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                            {p.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-blue-600 border border-transparent hover:border-slate-100 shadow-sm">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-100 shadow-sm">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-slate-50/50 p-6 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Showing 4 of 124 products</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50">Prev</button>
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
