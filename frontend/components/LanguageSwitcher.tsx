'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleLanguageChange = (lang: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('lang', lang);
        router.push(`${pathname}?${params.toString()}`);
    };

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'nl', label: 'NL' },
        { code: 'fr', label: 'FR' },
        { code: 'de', label: 'DE' },
    ];

    return (
        <div className="flex gap-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-[10px] font-bold border transition-colors ${currentLang === lang.code
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
