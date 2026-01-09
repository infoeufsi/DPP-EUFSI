'use client';

import { useState } from 'react';
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
    ChevronRight
} from 'lucide-react';
import PortalHeader from '@/components/PortalHeader';

// Step components (to be implemented)
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

export default function BatchWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        gtin: '',
        batchId: '',
        description: '',
        materials: [],
        journey: [],
        circularity: {}
    });

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
    };

    const handleBack = () => {
        if (step > 1) setStep(prev => prev - 1);
        else router.push('/portal');
    };

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
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">Step {step}: {steps[step - 1].title} info</h2>
                        <p className="text-slate-500 text-sm">Please provide accurate data to ensure EU ESPR compliance.</p>
                    </div>

                    {step === 1 && <Step1 data={formData} update={updateFormData} />}
                    {step > 1 && (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl italic">
                            Step {step} fields coming soon...
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${step === 1 ? 'opacity-0' : 'text-slate-400 hover:bg-slate-50'
                                }`}
                        >
                            Previous Step
                        </button>

                        <button
                            onClick={handleNext}
                            className="group flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-black transition-all shadow-lg"
                        >
                            {step === 4 ? 'Complete Passport' : 'Next Step'}
                            {step < 4 && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            {step === 4 && <Save className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Helper Note */}
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Check className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-blue-900">Auto-save is active</h4>
                        <p className="text-xs text-blue-700 leading-relaxed">Your progress is automatically saved to drafts as you complete each step. You can return later to finish the passport.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
