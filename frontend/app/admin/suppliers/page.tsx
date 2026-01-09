'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    Search,
    ArrowLeft,
    MapPin,
    Mail,
    Award,
    CircleCheck,
    MoreVertical,
    Plus
} from 'lucide-react';
import PortalHeader from '@/components/PortalHeader';

export default function AdminSuppliers() {
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
                        <h1 className="text-2xl font-bold text-slate-900">Supplier Quality Management</h1>
                        <p className="text-slate-500 text-sm">Overseeing 18 active supply chain partners.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-200 w-full md:w-auto justify-center">
                        <Plus className="w-5 h-5" />
                        Invite New Supplier
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: 'EcoWeave Fabrics', location: 'Amsterdam, NL', role: 'Tier 1 - Fabric Mill', contact: 'dirk@ecoweave.nl', score: 9.4, status: 'Active' },
                        { name: 'Pure Cotton Co.', location: 'Ahmedabad, IN', role: 'Tier 4 - Raw Fiber', contact: 'amit@purecotton.in', score: 8.1, status: 'Active' },
                        { name: 'DyeMaster Pro', location: 'Ho Chi Minh, VN', role: 'Tier 2 - Dyeing', contact: 'linh@dyemaster.vn', score: 6.8, status: 'Auditing' },
                        { name: 'Global Zippers Ltd.', location: 'Guangzhou, CN', role: 'Tier 3 - Components', contact: 'sales@globalzips.cn', score: 7.2, status: 'Active' },
                        { name: 'Nordic Knits', location: 'Oslo, NO', role: 'Tier 1 - Assembly', contact: 'info@nordicknits.no', score: 9.8, status: 'Active' },
                    ].map((s, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100 relative group hover:border-blue-200 transition-all">
                            <button className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                <MoreVertical className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-100">
                                    {s.name.substring(0, 1)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{s.name}</h3>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <Award className="w-3 h-3 text-amber-500" />
                                        {s.role}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {s.location}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Mail className="w-3.5 h-3.5" />
                                    {s.contact}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Quality Score</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold text-slate-900">{s.score}</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(v => (
                                                <div key={v} className={`w-1.5 h-3 rounded-sm ${v <= Math.floor(s.score / 2) ? 'bg-blue-500' : 'bg-slate-100'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                    }`}>
                                    <CircleCheck className={`w-3.5 h-3.5 ${s.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`} />
                                    {s.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
