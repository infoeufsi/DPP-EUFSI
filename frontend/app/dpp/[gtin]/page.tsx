import { ArrowLeft, Recycle, Scissors, ShieldCheck, Thermometer, Truck, Languages } from 'lucide-react';
import Image from 'next/image';
import { getDictionary } from '@/lib/get-dictionary';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface DppPageProps {
    params: {
        gtin: string;
    };
    searchParams: {
        batch?: string;
        lang?: string;
    };
}

export default async function DppPage({ params, searchParams }: DppPageProps) {
    const { gtin } = params;
    const { batch, lang = 'en' } = searchParams;

    // Load translations
    const dict = await getDictionary(lang);

    // Fetch data from backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    let dppData = null;
    let error = null;

    try {
        const res = await fetch(`${backendUrl}/api/v1/dpp/${gtin}?view=public`, {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Product not found');
        const result = await res.json();
        dppData = result.data;
    } catch (err: any) {
        error = err.message;
    }

    if (error || !dppData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
                    <div className="text-red-500 mb-4 text-5xl">⚠️</div>
                    <h1 className="text-2xl font-bold mb-2">{dict.common.error}</h1>
                    <p className="text-gray-600 mb-6">{dict.common.notFound}</p>
                    <a href="/" className="inline-block px-6 py-2 bg-black text-white rounded-full text-sm font-medium">{dict.common.returnHome}</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <button className="p-2 -ml-2 text-slate-500">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase">EUFSI DPP</span>
                        <span className="text-sm font-medium">{dict.common.title}</span>
                    </div>
                    <LanguageSwitcher currentLang={lang} />
                </div>
            </header>

            <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
                {/* Product Hero */}
                <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                    <div className="relative h-64 bg-slate-200 animate-pulse">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs italic opacity-20">
                            Photo (Coming Soon)
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-2xl font-bold">{dppData.product.name}</h1>
                            <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-md border border-green-100">{dict.common.authentic}</span>
                        </div>
                        <p className="text-slate-500 text-sm mb-4">{dppData.product.description}</p>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <div>
                                <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">{dict.common.gtin}</span>
                                <span className="text-sm font-mono tracking-tighter">{dppData.product.gtin}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">{dict.common.batch}</span>
                                <span className="text-sm font-mono tracking-tighter">{dppData.product.batch}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Material Composition */}
                <section>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-blue-500" />
                        {dict.sections.materials}
                    </h2>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
                        {dppData.materialComposition.map((item: any, idx: number) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.material} ({item.percentage}%)</span>
                                    <span className="text-slate-500 font-bold opacity-30">{item.origin.country}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                                </div>
                                {item.certifications && (
                                    <div className="flex gap-2 pt-1 text-[10px] font-bold text-blue-600">
                                        {item.certifications.map((cert: string) => (
                                            <span key={cert} className="px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Supply Chain Journey */}
                <section>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-blue-500" />
                        {dict.sections.journey}
                    </h2>
                    <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                        {dppData.journey.map((step: any, idx: number) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-[21px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-white bg-blue-500 ring-2 ring-blue-100"></div>
                                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                                    <span className="block text-[10px] font-bold text-blue-600 uppercase mb-1 tracking-wider">{step.stage}</span>
                                    <h3 className="font-bold text-sm tracking-tight">{step.facility.name}</h3>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                                        <span className="font-bold">{step.facility.location.country}</span>
                                        <span>•</span>
                                        <span className="capitalize">{step.process.type}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Care & Use */}
                <section>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Thermometer className="w-5 h-5 text-blue-500" />
                        {dict.sections.care}
                    </h2>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 grid grid-cols-2 gap-4">
                        {dppData.usePhase.careInstructions.map((care: any, idx: number) => {
                            const Icon = care.icon === 'wash' ? ShieldCheck :
                                care.icon === 'bleach' ? Scissors :
                                    care.icon === 'tumble' ? Truck :
                                        care.icon === 'iron' ? Thermometer : ShieldCheck;
                            return (
                                <div key={idx} className="flex gap-3 items-center">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                        <Icon className="w-5 h-5 text-slate-300" />
                                    </div>
                                    <span className="text-[11px] font-medium leading-tight">{care.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Circularity */}
                <section className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Recycle className="w-5 h-5" />
                            {dict.sections.circularity}
                        </h2>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold">
                            {dppData.endOfLife.recyclability.recyclabilityScore}/10
                        </div>
                    </div>
                    <p className="text-blue-100 text-sm mb-4">
                        {dict.circularity.designedFor.replace('{process}', dppData.endOfLife.recyclability.process)}
                    </p>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <span className="block text-[10px] font-bold uppercase mb-1 opacity-80">{dict.circularity.collection}</span>
                        <p className="text-xs leading-relaxed">{dppData.endOfLife.collectionScheme.instructions}</p>
                    </div>
                </section>
            </main>

            {/* Footer Branding */}
            <footer className="mt-12 text-center opacity-40">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">EUFSI DPP SYSTEM</span>
            </footer>
        </div>
    );
}
