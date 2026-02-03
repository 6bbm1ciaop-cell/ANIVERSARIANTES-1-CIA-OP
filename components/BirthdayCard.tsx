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
          nameSize: 'text-2xl', // Reduced from 3xl to prevent wrap/overflow
          listSpacing: '',
          headerMb: 'mb-4', // Reduced from 8
          messageSize: 'text-lg', // Reduced from xl
          messageSpacing: 'space-y-4', // Reduced from 6
          sectionMargin: 'mb-4', // Reduced from 6
          footerMargin: 'mt-2', // Reduced from 6
          footerPb: 'pb-16' // Drastically reduced from pb-32 to prevent overlap
      };

      if (count > 12) return {
          nameSize: 'text-xs',
          listSpacing: 'space-y-0.5',
          headerMb: 'mb-2',
          messageSize: 'text-xs',
          messageSpacing: 'space-y-1',
          sectionMargin: 'mb-2',
          footerMargin: 'mt-1',
          footerPb: 'pb-12'
      };
      if (count > 8) return {
          nameSize: 'text-sm',
          listSpacing: 'space-y-1',
          headerMb: 'mb-2',
          messageSize: 'text-sm',
          messageSpacing: 'space-y-2',
          sectionMargin: 'mb-2',
          footerMargin: 'mt-2',
          footerPb: 'pb-14'
      };
      if (count > 5) return {
          nameSize: 'text-base',
          listSpacing: 'space-y-1',
          headerMb: 'mb-4',
          messageSize: 'text-base',
          messageSpacing: 'space-y-3',
          sectionMargin: 'mb-3',
          footerMargin: 'mt-4',
          footerPb: 'pb-16'
      };
      // Default collective (1-5 people)
      return {
          nameSize: 'text-lg',
          listSpacing: 'space-y-2',
          headerMb: 'mb-4',
          messageSize: 'text-lg',
          messageSpacing: 'space-y-4',
          sectionMargin: 'mb-4',
          footerMargin: 'mt-4',
          footerPb: 'pb-20'
      };
  };

  const styles = getScaleClasses();

  return (
    // FIX: Fixed dimensions (595x842px) are crucial for html2canvas consistency
    <div 
        className={`relative bg-[#F4F1EA] shadow-xl overflow-hidden flex flex-col font-sans ${className}`} 
        style={{ width: '595px', height: '842px', minWidth: '595px', minHeight: '842px' }}
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
          {/* Adjusted Layout to fix overlap - Removed negative tracking and increased line-height stability */}
          <div className="flex flex-col pt-0 -mt-6">
            <h1 className="text-8xl font-black text-cbmmg-orange tracking-normal leading-tight mb-2">FELIZ</h1>
            <h2 className="text-3xl font-bold text-gray-500 tracking-wide ml-1">ANIVERSÁRIO</h2>
          </div>
          <div className="flex gap-4 items-start pr-2">
             {/* 6BBM Logo - Using CBMMG logo as fallback for 6BBM to ensure it appears */}
             <div className="w-20 flex flex-col items-center justify-center mt-1">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/af/Bras%C3%A3o_do_CBMMG.png"
                    alt="Brasão CBMMG"
                    className="w-full h-auto object-contain drop-shadow-sm opacity-90"
                    crossOrigin="anonymous" 
                />
                <span className="text-[10px] font-bold text-gray-500 mt-1 text-center leading-none">1ª Cia Op</span>
             </div>
             {/* CBMMG Round Logo - Stable Wikimedia Source */}
             <div className="w-24 flex justify-center">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/af/Bras%C3%A3o_do_CBMMG.png" 
                    alt="Logo CBMMG"
                    className="w-full h-auto object-contain drop-shadow-sm"
                    crossOrigin="anonymous"
                />
             </div>
          </div>
        </div>

        {/* Content Container - Flex-1 to take available space */}
        <div className="flex-1 flex flex-col min-h-0 relative z-20">
            {/* Recipient Logic */}
            <div className={`text-left ${styles.headerMb} mt-2 pl-4 border-l-8 border-cbmmg-orange py-2 shrink-0`}>
                {isCollective ? (
                    <>
                        <h3 className={`text-gray-900 font-bold ${styles.headerMb === 'mb-1' ? 'mb-1 text-base' : 'mb-2 text-xl'}`}>Prezados (as),</h3>
                        <div className={`${styles.listSpacing}`}>
                            {soldiers!.map((s, index) => (
                                <p key={s.id || index} className={`${styles.nameSize} text-gray-800 leading-snug`}>
                                    <span className="font-bold">{s.rank} {s.name}</span>
                                    <span className="text-gray-600 ml-2 opacity-80 text-[0.9em]">
                                        – {s.birthDate.split('-').reverse().slice(0,2).join('/')}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </>
                ) : (
                    <h3 className="text-3xl text-gray-800 leading-normal">
                        Prezado(a) <span className="font-bold text-gray-900 block mt-2">{soldier!.rank} {soldier!.name}</span>
                    </h3>
                )}
            </div>

            {/* Message Body - Using mt-0 instead of mt-auto to avoid pushing footer too hard if space is tight */}
            <div className={`${styles.messageSpacing} ${styles.messageSize} ${styles.sectionMargin} text-gray-700 text-justify leading-relaxed font-light px-2 pr-4 pt-4`}>
                <p>
                    O Comandante da 1ª Cia. Operacional, os Oficiais e as Praças {isCollective ? 'parabenizam-nos' : 'parabenizam-no'} pela passagem de seu aniversário, {isCollective ? 'desejando-lhes' : 'desejando-lhe'} os mais sinceros votos de paz, saúde, felicidades e sucesso.
                </p>
                <p>
                    Que esta data se repita por muitos anos, repleta de conquistas e realizações, tanto na vida pessoal quanto na profissional.
                </p>
            </div>
        </div>

        {/* Footer Section */}
        {/* Adjusted Z-index and margins to ensure no overlap */}
        <div className={`shrink-0 z-30 ${styles.footerPb} ${styles.footerMargin} relative`}>
            {/* Footer Greetings */}
            <div className="text-center px-4 mb-4">
                <p className={`${count > 8 ? 'text-base' : 'text-xl'} font-bold text-cbmmg-orange tracking-wide leading-tight`}>
                    São os votos do Corpo de Bombeiros Militar de Minas Gerais.
                </p>
            </div>

            {/* Date and Signature */}
            <div className="flex flex-col items-center text-center">
                <p className={`${count > 8 ? 'text-xs' : 'text-sm'} text-gray-600 mb-4 font-medium italic`}>
                    Governador Valadares, {currentDate}.
                </p>

                <div className="text-center pt-2 px-12 inline-block min-w-[300px] relative">
                    {/* Signature Line */}
                    <div className="absolute top-0 left-4 right-4 h-0.5 bg-gray-400"></div>
                    <p className={`${count > 8 ? 'text-sm' : 'text-lg'} font-bold text-gray-900 mt-2 leading-tight`}>{commanderName}, {commanderRank}</p>
                    <p className={`${count > 8 ? 'text-xs' : 'text-sm'} text-gray-600 font-medium`}>Comandante da 1ª Cia. Operacional</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;