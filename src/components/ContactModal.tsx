import React, { useState } from 'react';
import { X, Mail, Github, Linkedin, Calendar, Copy, Check, FileText, Phone, MapPin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const emailAddress = 'sourabh.rustagi@hotmail.com';
  const phoneNumber = '+91-84708-94772';

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#0f1218] border border-[#232c3d] rounded-2xl shadow-2xl p-6 sm:p-7 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#1f2635]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#181d26] border border-[#2d374a] flex items-center justify-center text-[#d4883b]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#eeeff2]">Sourabh Rustagi</h3>
              <p className="text-[11px] font-mono text-[#d4883b]">Chief Systems &amp; Cloud-Native Architect</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#181d26] hover:bg-[#202735] text-[#9aa4b5] hover:text-[#eeeff2] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3.5">
          
          {/* Location Badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#7a8494] px-1">
            <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>New Delhi, India (Open to Global Leadership Roles &amp; Remote)</span>
          </div>

          {/* Email Address with 1-click copy */}
          <div className="p-3.5 rounded-xl bg-[#12151c] border border-[#1b212c]">
            <span className="text-[10px] font-mono text-[#7a8494] uppercase tracking-wider block mb-1">
              Direct Email
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-[#eeeff2] truncate">{emailAddress}</span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#181d26] hover:bg-[#222a38] text-[11px] font-mono text-[#d4883b] border border-[#2d374a] transition-colors shrink-0"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Phone Number with 1-click copy */}
          <div className="p-3.5 rounded-xl bg-[#12151c] border border-[#1b212c]">
            <span className="text-[10px] font-mono text-[#7a8494] uppercase tracking-wider block mb-1">
              Direct Phone / WhatsApp
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-[#eeeff2]">{phoneNumber}</span>
              <button
                onClick={handleCopyPhone}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#181d26] hover:bg-[#222a38] text-[11px] font-mono text-[#38bdf8] border border-[#2d374a] transition-colors shrink-0"
              >
                {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* External Links Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="https://github.com/iamsourabh-in"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-[#12151c] border border-[#1b212c] hover:border-[#2d374a] flex items-center gap-2.5 transition-colors group"
            >
              <Github className="w-4 h-4 text-[#8c97a8] group-hover:text-[#eeeff2]" />
              <div className="text-left">
                <div className="text-xs font-mono text-[#eeeff2] font-semibold">GitHub</div>
                <div className="text-[10px] font-mono text-[#7a8494]">@iamsourabh-in</div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/sourabhrustagi"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-[#12151c] border border-[#1b212c] hover:border-[#2d374a] flex items-center gap-2.5 transition-colors group"
            >
              <Linkedin className="w-4 h-4 text-[#38bdf8] group-hover:text-[#eeeff2]" />
              <div className="text-left">
                <div className="text-xs font-mono text-[#eeeff2] font-semibold">LinkedIn</div>
                <div className="text-[10px] font-mono text-[#7a8494]">sourabhrustagi</div>
              </div>
            </a>
          </div>

          {/* Availability note */}
          <div className="pt-2 border-t border-[#1a202c]">
            <p className="text-[11px] font-mono text-[#7a8494] text-center">
              Available for Chief Architect, Principal Systems Engineer, &amp; Head of Platform Engineering roles.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
