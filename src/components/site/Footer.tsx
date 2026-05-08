import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-[color:var(--surface)]/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
              <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold">FlyTech</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">Tecnologia que faz empresas crescerem.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Navegação</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/solucoes" className="hover:text-foreground">Soluções</Link></li>
            <li><Link to="/consultoria" className="hover:text-foreground">Consultoria</Link></li>
            <li><Link to="/comunidade" className="hover:text-foreground">Comunidade</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contato</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>flytech.now@gmail.com</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+55 61 9956-2-1339</span></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>Brasília, DF — Brasil</span></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Online</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>flytech.com.br</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /><span>@flytech.now</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} FlyTech. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
