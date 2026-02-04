import React from 'react';
import { Military } from '../types';

interface BirthdayCardProps {
  soldier?: Military;
  soldiers?: Military[]; // New prop for collective card
  commanderName?: string;
  commanderRank?: string;
  className?: string;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ 
  soldier,
  soldiers, 
  commanderName = "Danilo Bruner Lopes Barbosa", 
  commanderRank = "Cap BM",
  className = ""
}) => {
  const currentDate = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  
  // Determine if this is a collective card
  const isCollective = soldiers && soldiers.length > 0;
  const count = soldiers ? soldiers.length : 0;

  // Fallback if neither is provided (should prevent crash)
  if (!soldier && !isCollective) return null;

  // Dynamic scaling based on count to ensure content fits
  const getScaleClasses = () => {
      if (!isCollective) return {
          nameSize: 'text-3xl',
          listSpacing: '',
          headerMb: 'mb-6',
          messageSize: 'text-xl',
          messageSpacing: 'space-y-6',
          sectionMargin: 'mb-6',
          footerMargin: 'mt-2',
          footerPb: 'pb-24' // Increased padding to lift footer off the bottom graphic
      };

      if (count > 12) return {
          nameSize: 'text-[10px]',
          listSpacing: 'space-y-0.5',
          headerMb: 'mb-2',
          messageSize: 'text-sm',
          messageSpacing: 'space-y-1',
          sectionMargin: 'mb-2',
          footerMargin: 'mt-1',
          footerPb: 'pb-16'
      };
      if (count > 8) return {
          nameSize: 'text-sm',
          listSpacing: 'space-y-1',
          headerMb: 'mb-2',
          messageSize: 'text-base',
          messageSpacing: 'space-y-2',
          sectionMargin: 'mb-2',
          footerMargin: 'mt-2',
          footerPb: 'pb-20'
      };
      if (count > 5) return {
          nameSize: 'text-base',
          listSpacing: 'space-y-1',
          headerMb: 'mb-3',
          messageSize: 'text-base',
          messageSpacing: 'space-y-3',
          sectionMargin: 'mb-3',
          footerMargin: 'mt-2',
          footerPb: 'pb-22'
      };
      // Default collective (1-5 people)
      return {
          nameSize: 'text-lg',
          listSpacing: 'space-y-2',
          headerMb: 'mb-4',
          messageSize: 'text-lg',
          messageSpacing: 'space-y-4',
          sectionMargin: 'mb-4',
          footerMargin: 'mt-2',
          footerPb: 'pb-24'
      };
  };

  const styles = getScaleClasses();

  // URLs das imagens com Proxy Seguro e Codificação
  const LOGO_6BBM_ORIGINAL = "https://lh3.googleusercontent.com/pw/AP1GczOz2AhM552qAgdmxiIOyRGmSjpy4CB-NXjG8hi4lrNw7qPO3nvnN2-tBgf_rC2BZ9eRLdT4RMZao6KYQH2491BiXKZTYg2P7dG40u6QFD34WFRxzrBKDPRBDC86-z5kToRz1UtxVhrADJxoQo4ysL1_=w487-h512-s-no-gm?authuser=0";
  const LOGO_CBMMG_ORIGINAL = "https://www.bombeiros.mg.gov.br/images/logo.png";
  
  // Codificação correta para o proxy (Resolve o problema do Vercel/CORS e parâmetros perdidos)
  const LOGO_6BBM = `https://wsrv.nl/?url=${encodeURIComponent(LOGO_6BBM_ORIGINAL)}&output=png`;
  const LOGO_CBMMG = `https://wsrv.nl/?url=${encodeURIComponent(LOGO_CBMMG_ORIGINAL)}&w=200&output=png`;

  return (
    // FIX: Fixed dimensions (595x842px) are crucial for html2canvas consistency
    <div 
        className={`relative bg-[#F4F1EA] shadow-xl overflow-hidden flex flex-col font-sans ${className}`} 
        style={{ 
            width: '595px', 
            height: '842px', 
            minWidth: '595px', 
            minHeight: '842px',
            fontFamily: 'Roboto, sans-serif' // Forçar fonte explicitamente
        }}
    >
      {/* Background Geometric Pattern */}
      <div className="absolute right-0 bottom-0 w-full h-full pointer-events-none z-0">
        <svg viewBox="0 0 210 297" preserveAspectRatio="none" className="w-full h-full opacity-10">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'rgb(200,200,200)', stopOpacity:0}} />
                    <stop offset="100%" style={{stopColor:'rgb(100,100,100)', stopOpacity:0.5}} />
                </linearGradient>
            </defs>
            <path d="M100 297 L210 297 L210 150 Z" fill="#e5e5e5" />
            <path d="M150 297 L210 297 L210 200 Z" fill="#d4d4d4" />
            <path d="M180 297 L210 297 L210 250 Z" fill="#c0c0c0" />
            <path d="M120 297 L210 180 L210 297 Z" fill="url(#grad1)" />
        </svg>
      </div>
      
      {/* Corner Orange Graphic */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-cbmmg-orange transform rotate-45 z-0 shadow-lg"></div>
      <div className="absolute -bottom-24 -right-10 w-64 h-64 bg-cbmmg-orange/80 transform rotate-45 z-0"></div>

      <div className="relative z-10 h-full flex flex-col p-12">
        {/* Header - Fixed Height Area to prevent Logo Cutoff */}
        <div className="flex justify-between items-start mb-4 h-28 shrink-0">
          {/* Adjusted Layout to fix overlap - Moved higher up (-mt-12) and added margin bottom (mb-3) */}
          <div className="flex flex-col pt-0 -mt-8">
            {/* Relaxed tracking and leading to prevent overlap on Vercel/Linux rendering */}
            <h1 className="text-8xl font-black text-cbmmg-orange tracking-tight leading-[0.9] mb-3">FELIZ</h1>
            <h2 className="text-3xl font-bold text-gray-500 tracking-[0.2em] ml-1">ANIVERSÁRIO</h2>
          </div>
          <div className="flex gap-4 items-start pr-2">
             {/* 6BBM Logo - Fixed with proper encoded Proxy */}
             <div className="w-20 flex justify-center mt-2">
                <img 
                    src={LOGO_6BBM}
                    alt="Brasão 6º BBM"
                    className="w-full h-auto object-contain drop-shadow-sm"
                    crossOrigin="anonymous" 
                    referrerPolicy="no-referrer"
                />
             </div>
             {/* CBMMG Round Logo */}
             <div className="w-24 flex justify-center">
                <img 
                    src={LOGO_CBMMG}
                    alt="Logo CBMMG"
                    className="w-full h-auto object-contain drop-shadow-sm"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
             </div>
          </div>
        </div>

        {/* Content Container - Flex-1 to take available space but allowing shrinkage */}
        <div className="flex-1 flex flex-col min-h-0">
            {/* Recipient Logic */}
            <div className={`text-left ${styles.headerMb} mt-2 pl-4 border-l-8 border-cbmmg-orange py-2 shrink-0`}>
                {isCollective ? (
                    <>
                        <h3 className={`text-gray-900 font-bold ${styles.headerMb === 'mb-1' ? 'mb-1 text-base' : 'mb-2 text-xl'}`}>Prezados (as),</h3>
                        <div className={`${styles.listSpacing}`}>
                            {soldiers!.map((s, index) => (
                                <p key={s.id || index} className={`${styles.nameSize} text-gray-800 leading-tight`}>
                                    <span className="font-bold">{s.rank} {s.name}</span>
                                    <span className="text-gray-600 ml-2 opacity-80 text-[0.9em]">
                                        – {s.birthDate.split('-').reverse().slice(0,2).join('/')}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </>
                ) : (
                    <h3 className="text-3xl text-gray-800 leading-snug">
                        Prezado(a) <span className="font-bold text-gray-900 block mt-2">{soldier!.rank} {soldier!.name}</span>
                    </h3>
                )}
            </div>

            {/* Message Body - Adjusted grammar for plural if collective */}
            <div className={`${styles.messageSpacing} ${styles.messageSize} ${styles.sectionMargin} text-gray-700 text-justify leading-relaxed font-light px-2 pr-4 mt-4 break-words`}>
                <p>
                    O Comandante da 1ª Cia. Operacional, os Oficiais e as Praças {isCollective ? 'parabenizam-nos' : 'parabenizam-no'} pela passagem de seu aniversário, {isCollective ? 'desejando-lhes' : 'desejando-lhe'} os mais sinceros votos de paz, saúde, felicidades e sucesso.
                </p>
                <p>
                    Que esta data se repita por muitos anos, repleta de conquistas e realizações, tanto na vida pessoal quanto na profissional.
                </p>
            </div>
        </div>

        {/* Footer Section - Wrapper to control position */}
        {/* Adjusted padding-bottom based on count to optimize space */}
        <div className={`shrink-0 z-20 ${styles.footerPb} ${styles.footerMargin}`}>
            {/* Footer Greetings */}
            <div className="text-center px-4 mb-4">
                {/* Standard leading to avoid overlap */}
                <p className={`${count > 8 ? 'text-base' : 'text-xl'} font-bold text-cbmmg-orange tracking-wide`}>
                    São os votos do Corpo de Bombeiros Militar de Minas Gerais.
                </p>
            </div>

            {/* Date and Signature */}
            <div className="flex flex-col items-center text-center">
                <p className={`${count > 8 ? 'text-sm' : 'text-base'} text-gray-600 mb-3 font-medium italic`}>
                    Governador Valadares, {currentDate}.
                </p>

                <div className="text-center pt-2 px-12 inline-block min-w-[300px] relative">
                    {/* Signature Line */}
                    <div className="absolute top-0 left-4 right-4 h-0.5 bg-gray-400"></div>
                    <p className={`${count > 8 ? 'text-base' : 'text-lg'} font-bold text-gray-900 mt-2`}>{commanderName}, {commanderRank}</p>
                    <p className={`${count > 8 ? 'text-sm' : 'text-base'} text-gray-600 font-medium`}>Comandante da 1ª Cia. Operacional</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;