import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { X, Home, ClipboardList, Wallet, Menu, QrCode, Search, ChevronRight, ChevronLeft, MoreVertical } from "lucide-react";
import rgImage from "@/assets/rg-davi.jpg.asset.json";
import rgVerso from "@/assets/rg-verso.png.asset.json";
import govbrLogo from "@/assets/govbr-logo.webp.asset.json";
import { useUserProfile } from "@/lib/user-profile";

export const Route = createFileRoute("/carteira-identidade")({
  head: () => ({
    meta: [
      { title: "Documento de Identificação — gov.br" },
      { name: "description", content: "Carteira de Identidade" },
    ],
  }),
  component: CarteiraIdentidade,
});

function CarteiraIdentidade() {
  const { profile } = useUserProfile();
  const defaults = [rgImage.url, rgVerso.url, rgImage.url, rgVerso.url];
  const pages = profile.walletPhotos.map((p, i) => p ?? defaults[i]);
  const [page, setPage] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(pages.length - 1, p + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    let dx = e.touches[0].clientX - startX.current;
    // resistance at edges
    if ((page === 0 && dx > 0) || (page === pages.length - 1 && dx < 0)) dx *= 0.35;
    setDragX(dx);
  };
  const onTouchEnd = () => {
    const width = trackRef.current?.offsetWidth ?? 1;
    const threshold = width * 0.25;
    if (dragX < -threshold) goNext();
    else if (dragX > threshold) goPrev();
    setDragX(0);
    setDragging(false);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <img src={govbrLogo.url} alt="gov.br" className="h-8 w-auto" />
          <Link to="/carteira">
            <X style={{ color: "#1351B4" }} size={30} strokeWidth={2} />
          </Link>
        </div>

        {/* Yellow tag */}
        <div className="flex justify-center mt-2 mb-4">
          <div
            className="px-6 py-2 text-sm font-medium tracking-wide"
            style={{ backgroundColor: "#FFCD07", color: "#1351B4" }}
          >
            DOCUMENTO DE IDENTIFICAÇÃO
          </div>
        </div>

        {/* ID image carousel */}
        <div
          ref={trackRef}
          className="px-4 overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(${-page * 100}% + ${dragX}px))`,
              transition: dragging ? "none" : "transform 0.3s ease-out",
            }}
          >
            {pages.map((src, i) => (
              <div key={i} className="w-full shrink-0">
                <img
                  src={src}
                  alt="Carteira de Identidade"
                  className="w-full h-auto rounded-md select-none touch-pan-y"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>



        {/* Controls under image */}
        <div className="flex items-center justify-between px-4 mt-4">
          <div className="flex items-center gap-2">
            <button className="w-11 h-11 rounded-md bg-gray-100 flex items-center justify-center shadow-sm">
              <Search style={{ color: "#1351B4" }} size={20} />
            </button>
            <button
              onClick={goPrev}
              disabled={page === 0}
              className="disabled:opacity-30"
              aria-label="Anterior"
            >
              <ChevronLeft style={{ color: "#1351B4" }} size={22} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: i === page ? "#1351B4" : "#D1D5DB" }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goNext}
              disabled={page === pages.length - 1}
              className="disabled:opacity-30"
              aria-label="Próximo"
            >
              <ChevronRight style={{ color: "#1351B4" }} size={22} />
            </button>
            <button
              className="w-11 h-11 rounded-md flex items-center justify-center"
              style={{ backgroundColor: "#168821" }}
            >
              <MoreVertical className="text-white" size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1" />


        {/* Bottom nav */}
        <div className="border-t border-gray-200 grid grid-cols-5 items-end pt-2 pb-3 relative mt-6">
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
          <Link to="/carteira" className="flex flex-col items-center gap-1" style={{ color: "#1351B4" }}>
            <Wallet size={22} strokeWidth={2.2} />
            <span className="text-xs">Carteira</span>
          </Link>
          <Link to="/menu" className="flex flex-col items-center gap-1" style={{ color: "#8A8A8A" }}>
            <Menu size={22} />
            <span className="text-xs">Menu</span>
          </Link>
        </div>
      </div>
    </div>
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