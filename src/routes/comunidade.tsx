import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, CheckCircle2, Lock, Network, Sparkles, Users } from "lucide-react";
import { Orbs } from "@/components/site/Orbs";
import { FadeIn, Section, SectionTitle } from "@/components/site/Section";

export const Route = createFileRoute("/comunidade")({
  head: () => ({
    meta: [
      { title: "Comunidade — FlyTech" },
      { name: "description", content: "Conhecimento, conexão e crescimento para empreendedores que usam tecnologia como vantagem competitiva." },
      { property: "og:title", content: "Comunidade FlyTech" },
      { property: "og:description", content: "eBooks, network e conteúdo prático para empreendedores." },
    ],
  }),
  component: ComunidadePage,
});

const EBOOKS = [
  { t: "Como a IA pode transformar sua gestão em 30 dias", c: "IA" },
  { t: "Processos que escalam: guia para pequenas empresas", c: "Processos" },
  { t: "Vendas com IA: da prospecção ao fechamento", c: "Vendas" },
  { t: "Finanças sem mistério: entenda seus números com tecnologia", c: "Finanças" },
  { t: "Network inteligente: construa conexões que geram negócios", c: "Gestão" },
  { t: "Automatize para crescer: primeiros passos com automação", c: "IA" },
];

function ComunidadePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Orbs />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-20 text-center sm:px-6">
          <FadeIn>
            <h1 className="text-4xl font-bold sm:text-6xl">Comunidade <span className="gradient-text">FlyTech</span></h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Conhecimento, conexão e crescimento para empreendedores que usam tecnologia como vantagem competitiva.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: BookOpen, t: "eBooks exclusivos sobre tecnologia e IA" },
            { icon: Network, t: "Network com outros empreendedores" },
            { icon: Sparkles, t: "Conteúdo prático sobre gestão e crescimento" },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="glass card-hover h-full rounded-2xl p-6 text-center">
                <c.icon className="mx-auto h-7 w-7 text-[color:var(--cyan)]" />
                <p className="mt-4 text-sm">{c.t}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn><SectionTitle eyebrow="Biblioteca" title="Conteúdo disponível para membros" /></FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EBOOKS.map((b, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="glass card-hover overflow-hidden rounded-2xl">
                <div className="relative grid h-44 place-items-center" style={{ background: "var(--gradient-primary)" }}>
                  <BookOpen className="h-10 w-10 text-white/80" />
                  <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-wide backdrop-blur-sm">{b.c}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold leading-snug">{b.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Material prático para aplicar imediatamente no seu negócio.</p>
                  <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground">
                    <Lock className="h-3 w-3" /> Disponível para membros
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <RegistrationForm />
      </Section>

      <Section>
        <FadeIn><SectionTitle eyebrow="Comunidade" title="Crescemos juntos" /></FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <Stat n={500} label="Empreendedores" prefix="+" />
          <Stat n={20} label="eBooks e Conteúdos" prefix="+" />
          <Stat n={15} label="Cidades no Brasil" prefix="+" />
        </div>
      </Section>

      <Section>
        <FadeIn><SectionTitle eyebrow="Em breve" title="O que vem por aí" /></FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { t: "Webinar: IA na prática para pequenas empresas", icon: Users },
            { t: "eBook: Guia completo de automação 2025", icon: BookOpen },
            { t: "Workshop: Monte seu primeiro agente de IA", icon: Sparkles },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="glass card-hover h-full rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <c.icon className="h-6 w-6 text-[color:var(--cyan)]" />
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">Em breve</span>
                </div>
                <p className="mt-4 font-semibold">{c.t}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}

function Stat({ n, label, prefix = "" }: { n: number; label: string; prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now(); const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, n]);
  return (
    <div ref={ref} className="glass card-hover rounded-2xl p-8 text-center">
      <p className="gradient-text text-5xl font-bold">{prefix}{v}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function RegistrationForm() {
  const [data, setData] = useState({ name: "", email: "", phone: "", segment: "", accept: false });
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.phone || !data.segment) { setError("Preencha todos os campos."); return; }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) { setError("Email inválido."); return; }
    if (!data.accept) { setError("Aceite receber conteúdos para continuar."); return; }
    setError(null);
    // TODO: Connect to backend or email service (e.g., EmailJS, Resend, Formspree) to handle form submissions
    console.log("[FlyTech] community registration", data);
    setDone(true);
  };

  if (done) {
    return (
      <div className="glass-strong mx-auto max-w-xl rounded-2xl p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full" style={{ background: "var(--gradient-primary)" }}>
          <CheckCircle2 className="h-8 w-8 text-white" />
        </div>
        <h3 className="mt-5 text-2xl font-bold">Bem-vindo à comunidade FlyTech!</h3>
        <p className="mt-3 text-muted-foreground">Você receberá nosso primeiro eBook em seu email em instantes.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <FadeIn>
        <h2 className="text-3xl font-bold sm:text-4xl">Faça parte da comunidade</h2>
        <p className="mt-4 text-muted-foreground">
          Cadastre-se gratuitamente e tenha acesso a eBooks, conteúdos exclusivos e nossa rede de empreendedores.
        </p>
      </FadeIn>
      <form onSubmit={submit} className="glass-strong space-y-4 rounded-2xl p-6 sm:p-8">
        <FieldI label="Nome completo" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
        <FieldI label="Email" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} />
        <FieldI label="WhatsApp" type="tel" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} />
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Segmento da empresa</span>
          <select value={data.segment} onChange={(e) => setData({ ...data, segment: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--violet)]">
            <option value="" className="bg-[color:var(--surface)]">Selecione…</option>
            {["Comércio", "Serviços", "Indústria", "Agronegócio", "Outro"].map((o) => (
              <option key={o} value={o} className="bg-[color:var(--surface)]">{o}</option>
            ))}
          </select>
        </label>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={data.accept} onChange={(e) => setData({ ...data, accept: e.target.checked })}
            className="mt-1 h-4 w-4 accent-[color:var(--violet)]" />
          <span>Aceito receber conteúdos e novidades da FlyTech.</span>
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button className="w-full rounded-lg px-4 py-3 text-sm font-semibold btn-gradient">Quero Fazer Parte</button>
      </form>
    </div>
  );
}

function FieldI({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--violet)]" />
    </label>
  );
}
