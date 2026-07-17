import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  ClipboardList,
  Wallet,
  Menu as MenuIcon,
  QrCode,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Users,
  Mail,
  FolderOpen,
  PenTool,
  Calendar,
  FileSearch,
  Download,
  Fingerprint,
  UserCheck
} from "lucide-react";

import avatar from "@/assets/davi-foto.jpg.asset.json";

export const Route = createFileRoute("/inicio")({
  head: () => ({
    meta: [
      { title: "Início – gov.br" },
      { name: "description", content: "Página inicial do gov.br" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const servicos = [
    { nome: "Gerar código de acesso", icone: <ShieldCheck size={20} className="text-[#1351B4]" /> },
    { nome: "Procuração eletrônica", icone: <Users size={20} className="text-[#1351B4]" />, novo: true },
    { nome: "Caixa Postal", icone: <Mail size={20} className="text-[#1351B4]" /> },
    { nome: "Carteira de documentos", icone: <FolderOpen size={20} className="text-[#1351B4]" /> },
    { nome: "Assinar documentos digitalmente", icone: <PenTool size={20} className="text-[#1351B4]" /> },
    { nome: "Agenda gov.br", icone: <Calendar size={20} className="text-[#1351B4]" /> },
    { nome: "Consultar serviços solicitados", icone: <FileSearch size={20} className="text-[#1351B4]" /> },
    { nome: "Baixar certidões", icone: <Download size={20} className="text-[#1351B4]" /> },
    { nome: "Login sem senha (QR code)", icone: <Fingerprint size={20} className="text-[#1351B4]" /> },
    { nome: "Prova de vida", icone: <UserCheck size={20} className="text-[#1351B4]" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative pb-24 shadow-md">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 bg-white">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gov.br_logo.svg/2560px-Gov.br_logo.svg.png" 
            alt="gov.br" 
            className="h-5 w-auto object-contain" 
          />
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell size={24} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                1
              </span>
            </div>
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200">
              <img
                src={avatar.url}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* BLUE HERO BANNER */}
        <div className="bg-[#0f4090] text-white px-6 pt-6 pb-12 relative flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-light opacity-90">Olá, <span className="font-bold">DAVI</span></h2>
            <h1 className="text-xl font-bold mt-1 tracking-wide text-amber-400">SUA CONTA É NÍVEL OURO</h1>
          </div>
          
          {/* Progress Gold Bars */}
          <div className="grid grid-cols-3 gap-1.5 h-1.5 w-full">
            <div className="bg-amber-400 rounded-full"></div>
            <div className="bg-amber-400 rounded-full"></div>
            <div className="bg-amber-400 rounded-full"></div>
          </div>

          <button className="self-end bg-white text-[#1351B4] text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm hover:bg-gray-100 transition-colors">
            <span className="text-sm">👁</span> VER NÍVEL
          </button>
        </div>

        {/* SEARCH BAR (OVERLAPPING) */}
        <div className="px-5 -mt-6 z-10">
          <div className="relative flex items-center bg-white rounded-lg shadow-md border border-gray-100">
            <input 
              type="text" 
              placeholder="Encontre serviços públicos no gov.br" 
              className="w-full pl-4 pr-12 py-3.5 rounded-lg text-sm text-gray-700 outline-none placeholder-gray-400"
            />
            <Search className="absolute right-4 text-blue-600" size={20} />
          </div>
        </div>

        {/* SERVIÇOS SECTION */}
        <div className="px-5 mt-6 flex-1">
          <h3 className="text-gray-500 text-sm font-medium mb-3">Serviços</h3>
          
          <div className="flex flex-col">
            {servicos.map((servico, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {servico.icone}
                  <span className="text-sm font-medium text-[#1351B4]">{servico.nome}</span>
                  {servico.novo && (
                    <span className="bg-green-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      NOVO
                    </span>
                  )}
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM NAV (FIXED) */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 grid grid-cols-5 items-end pt-2 pb-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center gap-1 cursor-pointer" style={{ color: "#1351B4" }}>
            <Home size={22} />
            <span className="text-xs">Início</span>
          </div>
          <Link to="/dados" className="flex flex-col items-center gap-1" style={{ color: "#8A8A8A" }}>
            <ClipboardList size={22} />
            <span className="text-xs">Dados</span>
          </Link>
          <div className="flex flex-col items-center justify-center relative -top-5">
            <div className="w-14 h-14 bg-[#1351B4] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 border-4 border-white cursor-pointer">
              <QrCode size={26} strokeWidth={2.5} />
            </div>
          </div>
          <Link to="/carteira" className="flex flex-col items-center gap-1" style={{ color: "#8A8A8A" }}>
            <Wallet size={22} strokeWidth={2.2} />
            <span className="text-xs">Carteira</span>
          </Link>
          <Link to="/menu" className="flex flex-col items-center gap-1" style={{ color: "#8A8A8A" }}>
            <MenuIcon size={22} />
            <span className="text-xs">Menu</span>
          </Link>
        </div>

      </div>
    </div>
  );
}