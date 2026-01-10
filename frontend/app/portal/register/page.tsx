'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Mail, User, ShieldCheck, Building } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [operatorId, setOperatorId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const res = await fetch(`${backendUrl}/api/v1/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name, operatorId }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error?.message || 'Registration failed');
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/portal/login');
            }, 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                        <ShieldCheck className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful!</h2>
                    <p className="text-slate-500">Your account has been created. Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-12">
            <div className="max-w-md w-full">
                {/* Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-200">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Join EUFSI DPP</h1>
                    <p className="text-slate-500 text-sm mt-1">Supplier Onboarding</p>
                </div>

                {/* Register Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <form onSubmit={handleRegister} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 italic">
                                {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Economic Operator ID</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                                <input
                                    type="text"
                                    required
                                    value={operatorId}
                                    onChange={(e) => setOperatorId(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                                    placeholder="EU-FSI-TEST-001"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                                    placeholder="Min 8 characters"
                                    minLength={8}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none mt-4"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400">
                            Already have an account? <Link href="/portal/login" className="text-blue-600 font-bold">Sign In</Link>
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <button
                    onClick={() => router.push('/')}
                    className="mt-6 flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm mx-auto"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Public View
                </button>
            </div>
        </div>
    );
}
