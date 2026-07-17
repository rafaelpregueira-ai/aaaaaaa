import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  ClipboardList,
  Wallet,
  Menu as MenuIcon,
  QrCode,
} from "lucide-react";
import avatar from "@/assets/davi-foto.jpg.asset.json";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — gov.br" },
      { name: "description", content: "Menu gov.br" },
    ],
  }),
  component: Menu,
});

function Menu() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative pb-24">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <img src="/logo-gov.png" alt="gov.br" className="h-8 w-auto" />
            src={avatar.url}
            alt="Perfil"
            className="w-11 h-11 rounded-full object-cover ring-1 ring-gray-200"
          />
        </div>

        <div className="flex-1" />

        {/* Bottom nav (fixed) */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 grid grid-cols-5 items-end pt-2 pb-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <Link to="/inicio" className="flex flex-col items-center gap-1" style={{ color: "#8A8A8A" }}>
            <Home size={22} />
            <span className="text-xs">Início</span>
          </Link>
          <Link to="/dados" className="flex flex-col items-center gap-1" style={{ color: "#8A8A8A" }}>
            <ClipboardList size={22} />
            <span className="text-xs">Dados</span>
          </Link>
          <div className="flex flex-col items-center -mt-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
              style={{ backgroundColor: "#168821" }}
            >
              <QrCode className="text-white" size={26} />
            </div>
            <span className="text-xs text-gray-500 mt-1">QR Code</span>
          </div>
          <Link to="/carteira" className="flex flex-col items-center gap-1" style={{ color: "#8A8A8A" }}>
            <Wallet size={22} strokeWidth={2.2} />
            <span className="text-xs">Carteira</span>
          </Link>
          <div className="flex flex-col items-center gap-1" style={{ color: "#1351B4" }}>
            <MenuIcon size={22} />
            <span className="text-xs">Menu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
