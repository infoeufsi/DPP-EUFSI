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
                    <div className="relative h-64 bg-slate-100">
                        {dppData.product.image ? (
                            <Image
                                src={dppData.product.image}
                                alt={dppData.product.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs italic opacity-20">
                                Photo (Coming Soon)
                            </div>
                        )}
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
                                <span className="text-sm font-mono tracking-tighter">{dppData.product.batch || 'BATCH-2024-IN-001'}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Environmental Impact (Regulatory Req) */}
                {dppData.sustainability && (
                    <section>
                        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <Recycle className="w-5 h-5" />
                            </div>
                            {dict.sections.environmental}
                        </h2>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Carbon Footprint</span>
                                <span className="text-lg font-bold text-slate-900">{dppData.sustainability.carbonFootprint || '2.4 kg CO2e'}</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Water Usage</span>
                                <span className="text-lg font-bold text-slate-900">{dppData.sustainability.waterUsage || '150 Liters'}</span>
                            </div>
                        </div>
                    </section>
                )}

                {/* Compliance & Chemicals */}
                {dppData.compliance && (
                    <section>
                        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            {dict.sections.compliance}
                        </h2>
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-3">
                            <div className="flex items-center justify-between p-3 bg-blue-50/30 rounded-xl border border-blue-100/50">
                                <span className="text-sm font-semibold text-slate-700">EU ESPR Regulatory Status</span>
                                <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded uppercase tracking-widest">{dppData.compliance.espr}</span>
                            </div>
                            <div className="flex items-center justify-between p-2 px-3">
                                <span className="text-xs font-medium text-slate-500 italic px-4 border-l-2 border-slate-200">REACH Chemicals Compliance</span>
                                <span className="text-xs font-bold text-emerald-600">{dppData.compliance.reach}</span>
                            </div>
                            <div className="flex items-center justify-between p-2 px-3">
                                <span className="text-xs font-medium text-slate-500 italic px-4 border-l-2 border-slate-200">OEKO-TEX Verification</span>
                                <span className="text-xs font-bold text-blue-600 font-mono text-[10px]">{dppData.compliance.oeKO_TEX}</span>
                            </div>
                        </div>
                    </section>
                )}

                {/* Material Composition */}
                <section>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                            <Scissors className="w-5 h-5" />
                        </div>
                        {dict.sections.materials}
                    </h2>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
                        {dppData.materialComposition.map((item: any, idx: number) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.material} ({item.percentage}%)</span>
                                    <span className="text-slate-500 font-bold opacity-30 tracking-widest text-[10px]">{item.origin?.country || 'N/A'}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Supply Chain Journey */}
                <section>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <Truck className="w-5 h-5" />
                        </div>
                        {dict.sections.journey}
                    </h2>
                    <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                        {dppData.journey.map((step: any, idx: number) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-[21px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-white bg-blue-600 shadow-sm shadow-blue-200"></div>
                                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                                    <span className="block text-[10px] font-bold text-blue-600 uppercase mb-1 tracking-widest">{step.stage}</span>
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

                {/* Circularity */}
                <section className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-emerald-400">
                            <Recycle className="w-5 h-5" />
                            {dict.sections.circularity}
                        </h2>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold bg-emerald-500 text-white">
                            {dppData.endOfLife?.recyclability?.recyclabilityScore || '8'}/10
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 relative z-10">
                        {dict.circularity.designedFor.replace('{process}', dppData.endOfLife?.recyclability?.process || 'Mechanical Recycling')}
                    </p>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 relative z-10">
                        <span className="block text-[10px] font-bold uppercase mb-1 opacity-80 text-emerald-400 tracking-widest">{dict.circularity.collection}</span>
                        <p className="text-xs leading-relaxed text-slate-300 italic">{dppData.endOfLife?.collectionScheme?.instructions || 'Check local textile collection points.'}</p>
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
