import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Search,
  Eye,
  ShieldCheck,
  Users,
  Mail,
  Wallet as WalletIcon,
  FileSignature,
  Calendar,
  SearchCheck,
  FileDown,
  QrCode as QrCodeIcon,
  UserSquare2,
  ClipboardEdit,
  UserCog,
  Lock,
  ChevronRight,
  Home,
  ClipboardList,
  Wallet,
  Menu,
  QrCode,
} from "lucide-react";
import govbrLogo from "@/assets/govbr-logo.webp.asset.json";
import heroUsers from "@/assets/hero-users.jpg";
import { useUserProfile } from "@/lib/user-profile";

export const Route = createFileRoute("/inicio")({
  head: () => ({
    meta: [
      { title: "Início — gov.br" },
      { name: "description", content: "Página inicial gov.br" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const { fotoUrl, primeiroNome } = useUserProfile();
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative pb-24">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <img src={govbrLogo.url} alt="gov.br" className="h-8 w-auto" />
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell style={{ color: "#5A5A5A" }} size={28} strokeWidth={2} />
              <span
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                style={{ backgroundColor: "#168821" }}
              >
                1
              </span>
            </div>
            <img
              src={fotoUrl}
              alt="Perfil"
              className="w-11 h-11 rounded-full object-cover ring-1 ring-gray-200"
            />
          </div>
        </div>


        {/* Hero banner */}
        <div
          className="relative overflow-hidden"
          style={{ backgroundColor: "#0B2C63", height: 190 }}
        >
          <img
            src={heroUsers}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            style={{ objectPosition: "right center", mixBlendMode: "screen" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #0B2C63 0%, #0B2C63 40%, rgba(11,44,99,0.5) 100%)",
            }}
          />
          <div className="relative h-full px-5 pt-5 flex flex-col">
            <p className="text-white text-lg font-light">
              Olá, <span className="font-bold">{primeiroNome}</span>
            </p>
            <p className="text-white text-lg font-light mt-1">
              SUA CONTA É NÍVEL <span className="font-bold">OURO</span>
            </p>

            {/* Progress bars */}
            <div className="flex gap-1.5 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-full"
                  style={{ backgroundColor: "#FFCD07" }}
                />
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-semibold shadow"
                style={{ color: "#1351B4" }}
              >
                <Eye size={16} strokeWidth={2.5} />
                VER NÍVEL
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 -mt-5 relative z-10">
          <div className="flex items-center bg-white rounded-md border border-gray-200 shadow-sm px-4 py-3">
            <input
              type="text"
              placeholder="Encontre serviços públicos no gov.br"
              className="flex-1 text-sm italic text-gray-500 bg-transparent outline-none placeholder:text-gray-500"
            />
            <Search style={{ color: "#1351B4" }} size={20} />
          </div>
        </div>

        {/* Serviços */}
        <div className="mt-5 bg-white">
          <h2 className="px-5 py-3 text-gray-500 text-base">Serviços</h2>
          <div className="border-t border-gray-100">
            <ServiceItem icon={<ShieldCheck size={22} />} label="Gerar código de acesso" />
            <ServiceItem
              icon={<Users size={22} />}
              label="Procuração eletrônica"
              badge="NOVO"
            />
            <ServiceItem icon={<Mail size={22} />} label="Caixa Postal" />
            <ServiceItem
              icon={<WalletIcon size={22} />}
              label="Carteira de documentos"
              to="/carteira"
            />
            <ServiceItem
              icon={<FileSignature size={22} />}
              label="Assinar documentos digitalmente"
            />
            <ServiceItem icon={<Calendar size={22} />} label="Agenda gov.br" />
            <ServiceItem icon={<SearchCheck size={22} />} label="Consultar serviços solicitados" />
            <ServiceItem icon={<FileDown size={22} />} label="Baixar certidões" />
            <ServiceItem icon={<QrCodeIcon size={22} />} label="Login sem senha (QR code)" />
            <ServiceItem icon={<UserSquare2 size={22} />} label="Prova de vida" last />
          </div>
        </div>

        {/* Minha conta */}
        <div className="mt-4 bg-white">
          <h2 className="px-5 py-3 text-gray-500 text-base">Minha conta</h2>
          <div className="border-t border-gray-100">
            <ServiceItem icon={<ClipboardEdit size={22} />} label="Dados pessoais" />
            <ServiceItem icon={<UserCog size={22} />} label="Segurança da conta" />
            <ServiceItem icon={<Lock size={22} />} label="Privacidade" last />
          </div>
        </div>

        {/* Bottom nav (fixed) */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 grid grid-cols-5 items-end pt-2 pb-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <NavItem icon={<Home size={22} />} label="Início" active />
          <NavItemLink to="/dados" icon={<ClipboardList size={22} />} label="Dados" />
          <div className="flex flex-col items-center -mt-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
              style={{ backgroundColor: "#168821" }}
            >
              <QrCode className="text-white" size={26} />
            </div>
            <span className="text-xs text-gray-500 mt-1">QR Code</span>
          </div>
          <NavItemLink to="/carteira" icon={<Wallet size={22} strokeWidth={2.2} />} label="Carteira" />
          <NavItemLink to="/menu" icon={<Menu size={22} />} label="Menu" />
        </div>

      </div>
    </div>
  );
}

function ServiceItem({
  icon,
  label,
  badge,
  to,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  to?: string;
  last?: boolean;
}) {
  const content = (
    <div
      className={`flex items-center gap-4 px-5 py-4 ${last ? "" : "border-b border-gray-100"}`}
    >
      <span style={{ color: "#1351B4" }}>{icon}</span>
      <span className="flex-1 font-bold text-[15px]" style={{ color: "#1351B4" }}>
        {label}
      </span>
      {badge && (
        <span
          className="text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "#168821" }}
        >
          {badge}
        </span>
      )}
      <ChevronRight style={{ color: "#1351B4" }} size={20} />
    </div>
  );
  if (to) return <Link to={to}>{content}</Link>;
  return content;
}

function NavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  const color = active ? "#1351B4" : "#8A8A8A";
  return (
    <div className="flex flex-col items-center gap-1" style={{ color }}>
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );
}

function NavItemLink({
  to,
  icon,
  label,
  active,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  const color = active ? "#1351B4" : "#8A8A8A";
  return (
    <Link to={to} className="flex flex-col items-center gap-1" style={{ color }}>
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}
