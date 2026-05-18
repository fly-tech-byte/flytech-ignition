import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/flytech-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/solucoes", label: "Soluções" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/consultoria", label: "Consultoria" },
  { to: "/comunidade", label: "Comunidade" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useCart();

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-strong border-b border-white/5">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="FlyTech" className="h-10 w-auto" />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "rounded-md px-3 py-2 text-sm text-foreground font-medium" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              aria-label="Abrir carrinho"
              className="relative grid h-10 w-10 place-items-center rounded-lg border border-white/10 hover:border-white/20"
            >
              <ShoppingCart className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
                  {count}
                </span>
              )}
            </button>
            <Link to="/solucoes" className="hidden rounded-lg px-4 py-2 text-sm font-semibold btn-gradient md:inline-block">
              Comece Agora
            </Link>
            <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 md:hidden" aria-label="Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="border-t border-white/5 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-white/5">
                  {l.label}
                </Link>
              ))}
              <Link to="/solucoes" onClick={() => setOpen(false)} className="mt-2 rounded-lg px-4 py-2 text-center text-sm font-semibold btn-gradient">
                Comece Agora
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
