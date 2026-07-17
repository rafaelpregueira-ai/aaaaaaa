import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ChevronLeft, Home, ClipboardList, Wallet, Menu, QrCode } from "lucide-react";
import govbrLogo from "@/assets/govbr-logo.webp.asset.json";
import brasao from "@/assets/brasao.png";
import { useUserProfile } from "@/lib/user-profile";
import { WalletPhotosModal } from "@/components/WalletPhotosModal";

export const Route = createFileRoute("/carteira")({
  head: () => ({
    meta: [
      { title: "Carteira de documentos — gov.br" },
      { name: "description", content: "Carteira de documentos gov.br" },
    ],
  }),
  component: Carteira,
});

function Carteira() {
  const { fotoUrl, profile } = useUserProfile();
  const [photosOpen, setPhotosOpen] = useState(false);
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hidden trigger: double-tap on the "Carteira de documentos" title opens the upload modal.
  const onTitleTap = () => {
    tapCount.current += 1;
    if (tapCount.current >= 2) {
      tapCount.current = 0;
      if (tapTimer.current) clearTimeout(tapTimer.current);
      setPhotosOpen(true);
      return;
    }
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 500);
  };
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <img src={govbrLogo.url} alt="gov.br" className="h-8 w-auto" />
          <img src={fotoUrl} alt="Perfil" className="w-11 h-11 rounded-full object-cover" />
        </div>

        {/* Header */}
        <div style={{ backgroundColor: "#0B2C63" }} className="flex items-center px-4 py-4 relative">
          <Link to="/inicio" aria-label="Voltar">
            <ChevronLeft className="text-white" size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="absolute left-0 right-0 text-center text-white text-lg font-normal">
            <button
              type="button"
              onClick={onTitleTap}
              className="w-full py-1 bg-transparent border-0 text-white text-lg font-normal cursor-default select-none"
              aria-label="Carteira de documentos"
            >
              Carteira de documentos
            </button>
          </h1>
        </div>

        {/* Card */}
        <div className="p-4">
          <Link
            to="/carteira-identidade"
            className="block relative rounded-xl overflow-hidden p-5 pl-6"
            style={{ backgroundColor: "#B8ECEE", minHeight: "180px" }}
          >
            <div
              className="absolute top-0 left-0"
              style={{
                width: 0,
                height: 0,
                borderTop: "48px solid #FFCD07",
                borderRight: "48px solid transparent",
              }}
            />
            <span
              className="absolute top-1 left-1.5 text-[10px] font-bold"
              style={{ color: "#168821" }}
            >
              ID
            </span>

            <img
              src={brasao}
              alt=""
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
              style={{ width: "150px", height: "150px" }}
            />

            <div className="relative">
              <h2 className="font-bold text-lg text-black leading-tight">Carteira de Identidade</h2>
              <p className="text-sm text-black mt-1 tracking-wide">{profile.nome}</p>
              <p className="text-base text-black mt-4 leading-tight">CPF</p>
              <p className="text-base text-black leading-tight">{profile.cpf}</p>
            </div>
          </Link>
        </div>

        <div className="flex-1" />

        <div className="px-4 pb-4">
          <button
            className="w-full rounded-full py-4 text-white text-base font-normal"
            style={{ backgroundColor: "#1351B4" }}
          >
            Adicionar documento
          </button>
        </div>

        {/* Bottom nav */}
        <div className="border-t border-gray-200 grid grid-cols-5 items-end pt-2 pb-3 relative">
          <NavItemLink to="/inicio" icon={<Home size={22} />} label="Início" />
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
          <NavItem icon={<Wallet size={22} strokeWidth={2.2} />} label="Carteira" active />
          <NavItemLink to="/menu" icon={<Menu size={22} />} label="Menu" />
        </div>
      </div>
      <WalletPhotosModal open={photosOpen} onClose={() => setPhotosOpen(false)} />
    </div>
  );
}

function NavItemLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1" style={{ color: "#8A8A8A" }}>
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  const color = active ? "#1351B4" : "#8A8A8A";
  return (
    <div className="flex flex-col items-center gap-1" style={{ color }}>
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );
}
