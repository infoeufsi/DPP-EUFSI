import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, LayoutDashboard, Search, ShieldCheck, Globe, Database } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-3xl opacity-50" />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full bg-blue-100/50 blur-3xl opacity-50" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-6 mx-auto max-w-7xl lg:px-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="EUFSI Logo"
                width={200}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          <div className="hidden gap-8 md:flex">
            <Link href="/portal/login" className="text-sm font-semibold leading-6 text-slate-600 hover:text-indigo-600 transition-colors">Supplier Portal</Link>
            <Link href="/admin" className="text-sm font-semibold leading-6 text-slate-600 hover:text-indigo-600 transition-colors">Admin Console</Link>
          </div>
          <Link
            href="/portal/login"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Get Started
          </Link>
        </nav>

        {/* Hero Section */}
        <main className="px-6 py-24 mx-auto max-w-7xl lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium leading-6 text-indigo-700 rounded-full bg-indigo-50 ring-1 ring-inset ring-indigo-700/10">
              <span className="flex w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              EU ESPR / CIRPASS Compliant
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl max-w-4xl mx-auto leading-[1.1]">
              The Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Digital Product Passports</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-8 text-lg leading-8 text-slate-600">
              A comprehensive tool for textile manufacturers and shoppers to ensure traceability,
              sustainability, and full compliance with EU Digital Product Passport regulations.
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              <Link
                href="/portal/login"
                className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-indigo-200 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
              >
                Supplier Login <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#features" className="text-lg font-semibold leading-6 transition-colors text-slate-900 hover:text-indigo-600">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 gap-8 mt-24 sm:grid-cols-2 lg:mt-32">
            {/* For Suppliers */}
            <div className="relative flex flex-col p-8 overflow-hidden transition-all bg-white shadow-2xl rounded-3xl group border border-slate-100 hover:shadow-indigo-100/50">
              <div className="absolute top-0 right-0 p-8 text-indigo-100 group-hover:text-indigo-200 transition-colors">
                <LayoutDashboard className="w-24 h-24 rotate-12" />
              </div>
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-center w-12 h-12 mb-6 bg-indigo-50 rounded-2xl">
                  <Globe className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Suppliers</h3>
                <p className="mt-4 mb-8 leading-7 text-slate-600">
                  Manage your product lifecycle, track supply chain transparency, and generate compliant DPPs
                  with our intuitive Batch Upload Wizard and real-time compliance scoring.
                </p>
                <div className="mt-auto">
                  <Link href="/portal/login" className="font-bold text-indigo-600 hover:text-indigo-500 flex items-center gap-1 group/link text-lg">
                    Access Portal <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* For Consumers */}
            <div className="relative flex flex-col p-8 overflow-hidden transition-all bg-white shadow-2xl rounded-3xl group border border-slate-100 hover:shadow-blue-100/50">
              <div className="absolute top-0 right-0 p-8 text-blue-100 group-hover:text-blue-200 transition-colors">
                <Search className="w-24 h-24 -rotate-12" />
              </div>
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-center w-12 h-12 mb-6 bg-blue-50 rounded-2xl">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Consumers</h3>
                <p className="mt-4 mb-8 leading-7 text-slate-600">
                  Scan QR codes to explore the transparent journey of your products. Learn about materials,
                  circularity scores, and care instructions to make informed choices.
                </p>
                <div className="mt-auto">
                  <Link href="/dpp/01234567890123" className="font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1 group/link text-lg">
                    Demo Passport <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-32 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
          <div className="px-6 py-12 mx-auto max-w-7xl lg:px-8">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="EUFSI Logo"
                  width={150}
                  height={38}
                  className="h-8 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">v1.0</span>
              </div>
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} EUFSI. Designed for a circular economy.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
