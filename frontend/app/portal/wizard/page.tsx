'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Package,
    Layers,
    Truck,
    Recycle,
    Save,
    ChevronRight,
    Plus,
    Trash2
} from 'lucide-react';
import PortalHeader from '@/components/PortalHeader';
import { authStore } from '@/lib/auth-store';

// --- Step Components ---

const Step1 = ({ data, update }: any) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">GTIN / Product Identity</label>
                <input
                    type="text"
                    value={data.gtin || ''}
                    onChange={(e) => update({ gtin: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    placeholder="e.g. 01234567890123"
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Lot / Batch Number</label>
                <input
                    type="text"
                    value={data.batchId || ''}
                    onChange={(e) => update({ batchId: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    placeholder="e.g. LOT-2026-A1"
                />
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Product Description</label>
            <textarea
                rows={3}
                value={data.description || ''}
                onChange={(e) => update({ description: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
                placeholder="Brief description of this specific batch..."
            />
        </div>
    </div>
);

const Step2 = ({ data, update }: any) => {
    const addMaterial = () => {
        const materials = [...(data.materials || []), { material: '', percentage: '' }];
        update({ materials });
    };

    const removeMaterial = (idx: number) => {
        const materials = data.materials.filter((_: any, i: number) => i !== idx);
        update({ materials });
    };

    const updateMaterial = (idx: number, field: string, value: any) => {
        const materials = [...data.materials];
        materials[idx] = { ...materials[idx], [field]: value };
        update({ materials });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                {data.materials?.map((m: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-end bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex-1 space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Material Name</label>
                            <input
                                type="text"
                                value={m.material}
                                onChange={(e) => updateMaterial(idx, 'material', e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                                placeholder="Organic Cotton"
                            />
                        </div>
                        <div className="w-24 space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Weight %</label>
                            <input
                                type="number"
                                value={m.percentage}
                                onChange={(e) => updateMaterial(idx, 'percentage', e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                                placeholder="100"
                            />
                        </div>
                        <button onClick={() => removeMaterial(idx)} className="p-2.5 text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <button
                    onClick={addMaterial}
                    className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Material Component
                </button>
            </div>
        </div>
    );
};

const Step3 = ({ data, update }: any) => {
    const addStage = () => {
        const journey = [...(data.journey || []), { stage: '', facility: '', country: '' }];
        update({ journey });
    };

    const removeStage = (idx: number) => {
        const journey = data.journey.filter((_: any, i: number) => i !== idx);
        update({ journey });
    };

    const updateStage = (idx: number, field: string, value: any) => {
        const journey = [...data.journey];
        journey[idx] = { ...journey[idx], [field]: value };
        update({ journey });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
                {data.journey?.map((s: any, idx: number) => (
                    <div key={idx} className="relative pl-8 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100">
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold border border-blue-100">
                            {idx + 1}
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative group">
                            <button onClick={() => removeStage(idx)} className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 transition-colors">
                                <Trash2 className="w-3 h-3" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Process Stage</label>
                                    <input
                                        type="text"
                                        value={s.stage}
                                        onChange={(e) => updateStage(idx, 'stage', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                                        placeholder="e.g. Spinning"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Facility & Country</label>
                                    <input
                                        type="text"
                                        value={s.facility}
                                        onChange={(e) => updateStage(idx, 'facility', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                                        placeholder="Facility Name, Country"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    onClick={addStage}
                    className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Lifecycle Stage
                </button>
            </div>
        </div>
    );
};

const Step4 = ({ data, update }: any) => {
    const updateCircular = (field: string, value: any) => {
        const circularity = { ...(data.circularity || {}), [field]: value };
        update({ circularity });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Recyclability Score (1-10)</label>
                    <input
                        type="number"
                        min="1" max="10"
                        value={data.circularity?.score || ''}
                        onChange={(e) => updateCircular('score', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                        placeholder="8"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Recycling Process</label>
                    <input
                        type="text"
                        value={data.circularity?.process || ''}
                        onChange={(e) => updateCircular('process', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                        placeholder="Mechanical"
                    />
                </div>
            </div>
            <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Waste Collection Instructions</label>
                <textarea
                    rows={3}
                    value={data.circularity?.collection || ''}
                    onChange={(e) => updateCircular('collection', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm resize-none"
                    placeholder="Return to collection bins..."
                />
            </div>
        </div>
    );
};

// --- Wizard Component ---

export default function BatchWizard() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        gtin: '01234567890123',
        batchId: '',
        description: '',
        materials: [{ material: 'Organic Cotton', percentage: '100' }],
        journey: [{ stage: 'Harvesting', facility: 'Cotton Farms, IN' }],
        circularity: { score: '9', process: 'Mechanical Recycling', collection: 'Return to any retail store.' }
    });

    useEffect(() => {
        setMounted(true);
        if (!authStore.isAuthenticated()) {
            router.push('/portal/login');
        }
    }, [router]);

    const updateFormData = (newData: any) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const steps = [
        { title: 'Identity', icon: Package },
        { title: 'Materials', icon: Layers },
        { title: 'Journey', icon: Truck },
        { title: 'Circularity', icon: Recycle }
    ];

    const handleNext = () => {
        if (step < 4) setStep(prev => prev + 1);
        else handleComplete();
    };

    const handleBack = () => {
        if (step > 1) setStep(prev => prev - 1);
        else router.push('/portal');
    };

    const handleComplete = async () => {
        setLoading(true);
        try {
            const payload = {
                product: {
                    gtin: formData.gtin,
                    batch: formData.batchId || 'LOT-NEW',
                    name: formData.description.split(' ')[0] || 'New Product',
                    description: formData.description || 'Verified via Supplier Portal',
                },
                materialComposition: formData.materials.map(m => ({
                    material: m.material,
                    percentage: parseInt(m.percentage as string) || 0,
                    origin: { country: 'Global' }
                })),
                journey: formData.journey.map(j => ({
                    stage: j.stage,
                    facility: { name: j.facility, location: { country: 'Global' } },
                    process: { type: 'manufacturing' }
                })),
                usePhase: { careInstructions: [] },
                endOfLife: {
                    recyclability: {
                        recyclable: true,
                        recyclabilityScore: parseInt(formData.circularity.score as string) || 5,
                        process: formData.circularity.process
                    },
                    collectionScheme: {
                        available: true,
                        instructions: formData.circularity.collection
                    }
                }
            };

            const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const res = await fetch(`${backendUrl}/api/v1/dpp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.getToken()}`
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to create passport');

            router.push('/portal?success=true');
        } catch (err) {
            alert('Error saving passport. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <PortalHeader />

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Wizard Progress Header */}
                <div className="mb-10">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm mb-6 font-medium group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </button>

                    <div className="flex justify-between items-center px-2">
                        {steps.map((s, idx) => {
                            const active = step === idx + 1;
                            const completed = step > idx + 1;
                            return (
                                <div key={idx} className="flex flex-col items-center relative flex-1">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 z-10 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' :
                                            completed ? 'bg-emerald-500 text-white' : 'bg-white text-slate-300 border border-slate-200'
                                        }`}>
                                        {completed ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest mt-3 ${active ? 'text-blue-600' : 'text-slate-400'
                                        }`}>{s.title}</span>

                                    {/* Connector Line */}
                                    {idx < 3 && (
                                        <div className="absolute top-5 left-1/2 w-full h-[2px] bg-slate-200 -z-0">
                                            <div className={`h-full bg-emerald-500 transition-all duration-700 ${completed ? 'w-full' : 'w-0'
                                                }`}></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-12 mb-8">
                    <div className="mb-8 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-slate-900">Step {step}: {steps[step - 1].title} info</h2>
                        <p className="text-slate-500 text-sm">Please provide accurate data to ensure EU ESPR compliance.</p>
                    </div>

                    <div className="min-h-[300px]">
                        {step === 1 && <Step1 data={formData} update={updateFormData} />}
                        {step === 2 && <Step2 data={formData} update={updateFormData} />}
                        {step === 3 && <Step3 data={formData} update={updateFormData} />}
                        {step === 4 && <Step4 data={formData} update={updateFormData} />}
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:bg-slate-50'
                                }`}
                        >
                            Previous Step
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={loading}
                            className="group flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-black transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : (step === 4 ? 'Submit Passport' : 'Next Step')}
                            {!loading && step < 4 && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            {!loading && step === 4 && <Save className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Helper Note */}
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Check className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-blue-900">Drafts are encrypted</h4>
                        <p className="text-xs text-blue-700 leading-relaxed">Your data is secured using end-to-end encryption before being stored. Only authorized retail partners across your supply chain can view sensitive facility details.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
