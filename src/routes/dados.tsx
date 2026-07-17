import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  User,
  Calendar,
  MapPin,
  PersonStanding,
  CreditCard,
  Phone,
  Mail,
  MapPin as PinIcon,
  Home,
  ClipboardList,
  Wallet,
  Menu as MenuIcon,
  QrCode,
  Share2,
} from "lucide-react";
import govbrLogo from "@/assets/govbr-logo.webp.asset.json";
import { useUserProfile } from "@/lib/user-profile";
import { EditProfileModal } from "@/components/EditProfileModal";

export const Route = createFileRoute("/dados")({
  head: () => ({
    meta: [
      { title: "Dados pessoais — gov.br" },
      { name: "description", content: "Dados pessoais gov.br" },
    ],
  }),
  component: DadosPessoais,
});

function DadosPessoais() {
  const { profile, fotoUrl } = useUserProfile();
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative pb-24">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <img src={govbrLogo.url} alt="gov.br" className="h-8 w-auto" />
          <img
            src={fotoUrl}
            alt="Perfil"
            className="w-11 h-11 rounded-full object-cover ring-1 ring-gray-200"
          />
        </div>

        {/* Header + framed photo */}
        <div style={{ backgroundColor: "#0B2C63" }} className="relative px-4 pt-4 pb-10">
          <div className="flex items-center relative">
            <Link to="/inicio" aria-label="Voltar">
              <ChevronLeft className="text-white" size={28} strokeWidth={2.5} />
            </Link>
            <h1 className="absolute left-0 right-0 text-center text-white text-lg font-normal pointer-events-none">
              Dados pessoais
            </h1>
          </div>

          <div className="flex justify-center mt-6">
            <div
              className="rounded-full p-[6px]"
              style={{ backgroundColor: "#2E7C99" }}
            >
              <img
                src={fotoUrl}
                alt="Foto"
                className="w-56 h-56 rounded-full object-cover bg-white"
              />
            </div>
          </div>
        </div>

        {/* Dados básicos card */}
        <div className="relative mx-4 -mt-4 bg-white rounded-lg shadow-md p-5">
          <h2 className="text-gray-400 text-lg font-semibold mb-4">Dados básicos</h2>

          <Field icon={<User size={26} />} label="Nome" value={profile.nome} />
          <Field icon={<Calendar size={26} />} label="Nascimento" value={profile.nascimento} />
          <Field icon={<MapPin size={26} />} label="Naturalidade" value={profile.naturalidade} />
          <Field
            icon={<PersonStanding size={26} />}
            label="Nome da Mãe"
            value={profile.nomeMae}
          />
          <Field icon={<CreditCard size={26} />} label="CPF" value={profile.cpf} last />
        </div>

        {/* Dados de contato card */}
        <div className="mx-4 mt-4 bg-white rounded-lg shadow-md p-5">
          <h2 className="text-gray-400 text-lg font-semibold mb-4">Dados de contato</h2>
          <Field icon={<Phone size={26} />} label="Telefone" value={profile.telefone} />
          <Field icon={<Mail size={26} />} label="E-mail" value={profile.email} />
          <Field icon={<PinIcon size={26} />} label="Endereço" value={profile.endereco} last />
        </div>

        {/* Editar + share */}
        <div className="flex items-center gap-3 px-4 mt-6">
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="flex-1 rounded-full py-4 text-white text-base font-normal"
            style={{ backgroundColor: "#1351B4" }}
          >
            Editar
          </button>
          <button
            className="w-14 h-14 rounded-lg flex items-center justify-center shadow-md shrink-0"
            style={{ backgroundColor: "#168821" }}
            aria-label="Compartilhar"
          >
            <Share2 className="text-white" size={24} />
          </button>
        </div>

        <div className="h-8" />

        {/* Bottom nav (fixed) */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 grid grid-cols-5 items-end pt-2 pb-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <NavItemLink to="/inicio" icon={<Home size={22} />} label="Início" />
          <NavItem icon={<ClipboardList size={22} />} label="Dados" active />
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
          <NavItemLink to="/menu" icon={<MenuIcon size={22} />} label="Menu" />
        </div>
      </div>
      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}

function Field({
  icon,
  label,
  value,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div className={`flex items-start gap-4 py-3 ${last ? "" : "border-b border-gray-100"}`}>
      <span style={{ color: "#1351B4" }}>{icon}</span>
      <div>
        <p className="text-sm font-medium" style={{ color: "#1351B4" }}>
          {label}
        </p>
        <p className="text-base text-black leading-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
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
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1" style={{ color: "#8A8A8A" }}>
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}
