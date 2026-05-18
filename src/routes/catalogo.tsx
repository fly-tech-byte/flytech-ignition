import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Bot, CalendarClock, Check, CreditCard, Download, MessageSquare, Send, Sparkles, Star, Users } from "lucide-react";
import { Orbs } from "@/components/site/Orbs";
import { FadeIn, Section, SectionTitle } from "@/components/site/Section";
import { formatBRL, useCart } from "@/lib/cart";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de Soluções — FlyTech" },
      { name: "description", content: "Catálogo completo de funcionalidades e pacotes FlyTech: chat com IA, CRM, agendamento, cobrança, marketing e dashboards." },
      { property: "og:title", content: "Catálogo FlyTech" },
      { property: "og:description", content: "Funcionalidades e pacotes para micro e pequenas empresas." },
    ],
  }),
  component: CatalogoPage,
});

const FEATURES = [
  {
    id: "feat-chat-ia",
    icon: MessageSquare,
    title: "Chat de Atendimento com IA",
    price: 149,
    desc: "Atendimento 24h em WhatsApp e site, respostas a dúvidas frequentes, captação de leads e encaminhamento humano quando necessário.",
    benefits: ["Menos tempo gasto manualmente no WhatsApp", "Menos leads perdidos fora do horário", "Atendimento mais profissional e rápido"],
  },
  {
    id: "feat-crm",
    icon: Users,
    title: "Mini CRM Automatizado de Leads",
    price: 129,
    desc: "Centraliza contatos e leads em uma base única, registra origem, dispara follow-ups e organiza seu funil de vendas.",
    benefits: ["Evita perda de vendas por esquecimento", "Organização sem sistemas complexos", "Visão clara das oportunidades"],
  },
  {
    id: "feat-agendamento",
    icon: CalendarClock,
    title: "Funil de Agendamento e Lembretes",
    price: 139,
    desc: "Cliente agenda online, integra com Google Calendar, envia confirmações e lembretes automáticos antes do horário.",
    benefits: ["Redução de faltas (no-show)", "Imagem mais profissional", "Menos tempo gasto remarcando horários"],
  },
  {
    id: "feat-cobranca",
    icon: CreditCard,
    title: "Cobrança Automática e Lembretes",
    price: 159,
    desc: "Gera links e boletos via Mercado Pago, Asaas ou PagSeguro, envia por WhatsApp/e-mail e cobra inadimplentes.",
    benefits: ["Melhora o fluxo de caixa", "Reduz inadimplência", "Profissionaliza a cobrança"],
  },
  {
    id: "feat-posvenda",
    icon: Star,
    title: "Pós-venda e Coleta de Avaliações",
    price: 99,
    desc: "Mensagens automáticas após a venda pedindo feedback, com armazenamento de respostas e disparo para pedir indicações.",
    benefits: ["Prova social com avaliações", "Identifica problemas na experiência", "Aumenta sua reputação online"],
  },
  {
    id: "feat-marketing",
    icon: Send,
    title: "Automação de Marketing Básico",
    price: 169,
    desc: "Sequências de e-mail e WhatsApp para nutrir novos contatos, segmentar interesses e identificar leads quentes.",
    benefits: ["Mais conversão sem esforço diário", "Marca presente na mente do cliente", "Educa o lead sobre seu produto"],
  },
  {
    id: "feat-dashboard",
    icon: BarChart3,
    title: "Dashboard de Vendas e Atendimento",
    price: 119,
    desc: "Painel único com leads, vendas e atendimentos. Indicadores básicos via Looker Studio alimentado por n8n.",
    benefits: ["Visão clara dos resultados", "Decisões baseadas em dados", "Economia de tempo com relatórios"],
  },
];

const PACKAGES = [
  {
    id: "pkg-essencial",
    name: "Pacote Essencial",
    price: 297,
    objetivo: "Atendimento automático + organização básica de oportunidades.",
    inclui: ["Chat de Atendimento com IA (WhatsApp/site)", "Mini CRM Automatizado de Leads", "Alertas automáticos para novos leads"],
    beneficios: ["Nunca mais perder leads", "Atendimento 24h profissional", "Organização simples das oportunidades"],
  },
  {
    id: "pkg-servicos",
    name: "Pacote Serviços",
    price: 497,
    objetivo: "Ideal para quem vende serviços por horário: consultas, aulas, estética, manutenção.",
    inclui: ["Mini CRM Automatizado de Leads", "Funil de Agendamento e Lembretes", "Lembretes pré-atendimento", "Pós-venda e Coleta de Avaliações"],
    beneficios: ["Agenda organizada com menos faltas", "Experiência mais profissional", "Feedback estruturado"],
    destaque: true,
  },
  {
    id: "pkg-crescimento",
    name: "Pacote Crescimento",
    price: 697,
    objetivo: "Escalar vendas, cobranças e relacionamento com clientes.",
    inclui: ["Chat de Atendimento com IA", "Mini CRM Automatizado de Leads", "Cobrança Automática", "Automação de Marketing Básico"],
    beneficios: ["Mais vendas com menos trabalho", "Redução de inadimplência", "Relacionamento contínuo"],
  },
  {
    id: "pkg-gestao-pro",
    name: "Pacote Gestão Pro",
    price: 997,
    objetivo: "Visão completa do negócio + todas as automações principais.",
    inclui: ["Tudo do Pacote Crescimento", "Dashboard de Vendas e Atendimento", "Relatórios mensais de acompanhamento"],
    beneficios: ["Funil, cobranças e marketing em um só lugar", "Decisões baseadas em dados", "Ideal para empresas em crescimento"],
  },
];

function CatalogoPage() {
  const { add, open } = useCart();
  return (
    <>
      <section className="relative overflow-hidden">
        <Orbs />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 text-center sm:px-6">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--cyan)]" /> Soluções FlyTech
            </span>
            <h1 className="mt-6 text-4xl font-bold sm:text-6xl">Soluções <span className="gradient-text">FlyTech</span></h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Contrate soluções avulsas ou pacotes prontos para automatizar atendimento, vendas, cobrança e gestão do seu negócio.
            </p>
            <a
              href="/catalogo-flytech.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold btn-gradient"
            >
              <Download className="h-4 w-4" /> Baixar catálogo em PDF
            </a>
          </FadeIn>
        </div>
      </section>

      <Section className="!py-12">
        <FadeIn><SectionTitle eyebrow="Soluções avulsas" title="Contrate apenas o que precisa" subtitle="Cada solução pode ser contratada individualmente — sem precisar de um pacote completo." /></FadeIn>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.05}>
              <div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg" style={{ background: "var(--gradient-soft)" }}>
                    <f.icon className="h-5 w-5 text-[color:var(--cyan)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                    <ul className="mt-4 space-y-1.5">
                      {f.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--cyan)]" />
                          <span className="text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{formatBRL(f.price)}</span>
                    <span className="text-xs text-muted-foreground">/mês</span>
                  </div>
                  <button
                    onClick={() => {
                      add({ id: f.id, name: f.title, category: "Solução avulsa", price: f.price, description: f.desc });
                      open();
                    }}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold btn-gradient"
                  >
                    Comprar avulso
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="!py-12">
        <FadeIn>
          <SectionTitle
            eyebrow="Pacotes"
            title="Escolha o pacote ideal"
            subtitle="Combinações pensadas para diferentes estágios do seu negócio."
          />
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.07}>
              <div className={`glass card-hover relative flex h-full flex-col rounded-2xl p-6 ${p.destaque ? "ring-1 ring-[color:var(--violet)]" : ""}`}>
                {p.destaque && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: "var(--gradient-primary)" }}>
                    Mais popular
                  </span>
                )}
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.objetivo}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{formatBRL(p.price)}</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Inclui</p>
                  <ul className="mt-2 space-y-1.5">
                    {p.inclui.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--cyan)]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Benefícios</p>
                  <ul className="mt-2 space-y-1.5">
                    {p.beneficios.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--violet)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => {
                    add({ id: p.id, name: p.name, category: "Pacote", price: p.price, description: p.objetivo });
                    open();
                  }}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold btn-gradient"
                >
                  Contratar pacote
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
