'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User, Bell, ShieldCheck } from 'lucide-react';
import { authStore } from '@/lib/auth-store';

export default function PortalHeader() {
    const router = useRouter();
    const user = authStore.getUser();

    const handleLogout = () => {
        authStore.clearToken();
        router.push('/portal/login');
    };

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 hidden sm:inline-block">EUFSI Portal</span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <Bell className="w-5 h-5" />
                    </button>

                    <div className="h-8 w-px bg-slate-200 mx-1"></div>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-900 leading-none">{user?.name || 'Supplier'}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{user?.role || 'User'}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                            <User className="w-4 h-4" />
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
