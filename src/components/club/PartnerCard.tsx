'use client';

import React from 'react';
import { AdvantagePartner } from '@/types/tenant';
import {
  MessageCircle,
  MapPin,
  Star,
  ShieldCheck,
  Tag,
  ExternalLink,
  Phone,
  Home,
} from 'lucide-react';

interface PartnerCardProps {
  partner: AdvantagePartner;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const handleWhatsAppClick = () => {
    const cleanPhone = partner.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const encodedMessage = encodeURIComponent(partner.whatsappMessage);
    window.open(`https://wa.me/${phoneWithCountry}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="w-full bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-1 mb-2">
          {partner.discountBadge ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
              <Tag className="w-3 h-3" />
              {partner.discountBadge}
            </span>
          ) : (
            <span />
          )}

          {partner.isResident && (
            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full border border-purple-200">
              <ShieldCheck className="w-3 h-3 text-purple-600" />
              Morador Verificado
            </span>
          )}
        </div>

        {/* Image & Title Info */}
        <div className="flex gap-3 mb-2.5">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img
              src={partner.imageUrl}
              alt={partner.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-extrabold text-xs text-slate-900 leading-tight truncate">
              {partner.name}
            </h4>
            <p className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">
              {partner.businessName}
            </p>

            {partner.rating && (
              <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-amber-600">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{partner.rating.toFixed(1)}</span>
                <span className="text-slate-400 text-[9px] font-normal">• Excelente</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5 line-clamp-2">
          {partner.description}
        </p>

        {/* Resident Location */}
        {partner.residentLot && (
          <div className="flex items-center gap-1.5 text-[10px] text-purple-900 bg-purple-50 p-1.5 rounded-lg mb-2.5 font-medium">
            <Home className="w-3 h-3 text-purple-600 shrink-0" />
            <span className="truncate">Residência: {partner.residentLot}</span>
          </div>
        )}
      </div>

      {/* WhatsApp CTA Button */}
      <button
        onClick={handleWhatsAppClick}
        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Chamar no WhatsApp</span>
      </button>
    </div>
  );
};
