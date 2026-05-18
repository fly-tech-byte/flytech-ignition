import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, Bot, Briefcase, CheckCircle2, Clock, HeartHandshake,
  LineChart, MessageSquare, Rocket, Settings2, Sparkles, TrendingUp, Users, Wallet,
} from "lucide-react";
import { Orbs } from "@/components/site/Orbs";
import { FadeIn, Section, SectionTitle } from "@/components/site/Section";
import { IntroVideoModal } from "@/components/site/IntroVideoModal";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlyTech — Tecnologia que faz empresas crescerem" },
      { name: "description", content: "Agentes de IA, automação e consultoria para transformar a gestão de micro e pequenas empresas." },
      { property: "og:title", content: "FlyTech — Tecnologia que faz empresas crescerem" },
      { property: "og:description", content: "Agentes de IA, automação e consultoria para micro e pequenas empresas." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Orbs />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--cyan)]" /> IA acessível para pequenas empresas
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
              Tecnologia que faz <span className="gradient-text">empresas crescerem.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Agentes de IA, automação e consultoria estratégica para transformar a gestão de micro e pequenas empresas.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/solucoes" className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold btn-gradient">
                Ver Soluções <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/consultoria" className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold btn-ghost-outline">
                Falar com Consultor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section>
        <FadeIn><SectionTitle eyebrow="O problema" title="Por que tantas pequenas empresas travam?" /></FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { icon: Settings2, title: "Processos manuais", text: "Operações desorganizadas que consomem o dia a dia da equipe." },
            { icon: Bot, title: "Baixa digitalização", text: "Ferramentas caras, complexas e fora da realidade do pequeno negócio." },
            { icon: BarChart3, title: "Sem visibilidade", text: "Decisões tomadas no escuro, sem indicadores claros." },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.08}>
              <div className="glass card-hover h-full rounded-2xl p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg" style={{ background: "var(--gradient-soft)" }}>
                  <c.icon className="h-5 w-5 text-[color:var(--cyan)]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* SOLUTION */}
      <Section>
        <FadeIn>
          <SectionTitle
            eyebrow="A solução"
            title="Nossa solução muda esse cenário"
            subtitle="Uma plataforma completa com IA, automação e consultoria para entregar às pequenas empresas o que só as grandes tinham acesso."
          />
        </FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PRODUCTS.map((p, i) => {
            const Icon = p.id === "gmv" ? TrendingUp : p.id === "gfd" ? Wallet : Briefcase;
            return (
              <FadeIn key={p.id} delay={i * 0.08}>
                <div className="glass card-hover h-full rounded-2xl p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg" style={{ background: "var(--gradient-soft)" }}>
                    <Icon className="h-5 w-5 text-[color:var(--violet)]" />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{p.category}</p>
                  <h3 className="mt-1 text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <Link to="/solucoes" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--cyan)] hover:underline">
                    Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* WHY FLYTECH */}
      <Section>
        <FadeIn><SectionTitle eyebrow="Diferenciais" title="Por que a FlyTech?" /></FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {[
            { icon: Clock, title: "Implementação em dias", text: "Você começa a operar em dias — não em meses." },
            { icon: Rocket, title: "Tecnologia acessível", text: "Soluções pensadas para a realidade do pequeno negócio." },
            { icon: Bot, title: "IA integrada à operação", text: "IA conectada com seus processos reais, não enfeite." },
            { icon: HeartHandshake, title: "Suporte contínuo", text: "Acompanhamento e orientação estratégica permanentes." },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.06}>
              <div className="glass card-hover flex h-full gap-4 rounded-2xl p-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg" style={{ background: "var(--gradient-soft)" }}>
                  <c.icon className="h-5 w-5 text-[color:var(--cyan)]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* MARKET */}
      <Section>
        <FadeIn><SectionTitle eyebrow="Mercado" title="Uma oportunidade gigante" /></FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { stat: "+90%", text: "dos negócios no Brasil são micro e pequenas empresas" },
            { stat: "📈", text: "Demanda por automação cresce exponencialmente" },
            { stat: "Poucas", text: "soluções acessíveis para esse público" },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="glass card-hover h-full rounded-2xl p-6 text-center">
                <p className="gradient-text text-4xl font-bold sm:text-5xl">{c.stat}</p>
                <p className="mt-3 text-sm text-muted-foreground">{c.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>


      {/* FINAL CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center sm:px-12">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-soft)" }} />
          <Orbs />
          <FadeIn>
            <h2 className="text-3xl font-bold sm:text-5xl">Pronto para acelerar sua empresa?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Junte-se às empresas que já estão usando IA para crescer.</p>
            <Link to="/solucoes" className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold btn-gradient">
              Começar agora <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
