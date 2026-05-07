import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, ClipboardList, Gauge, Handshake, Sparkles, Target } from "lucide-react";
import { Orbs } from "@/components/site/Orbs";
import { FadeIn, Section, SectionTitle } from "@/components/site/Section";

export const Route = createFileRoute("/consultoria")({
  head: () => ({
    meta: [
      { title: "Consultoria — FlyTech" },
      { name: "description", content: "Consultoria personalizada em IA e gestão para micro e pequenas empresas." },
      { property: "og:title", content: "Consultoria FlyTech" },
      { property: "og:description", content: "Conte sobre seu negócio. Criamos uma solução sob medida." },
    ],
  }),
  component: ConsultoriaPage,
});

type FormData = {
  // step 1
  name: string; email: string; phone: string; company: string; sector: string;
  // step 2
  size: string; usesTools: "" | "yes" | "no"; toolsList: string; operation: string;
  // step 3
  challenges: string[]; mainChallenge: string; goal: string;
  // step 4
  channel: string; times: string[]; message: string;
};

const empty: FormData = {
  name: "", email: "", phone: "", company: "", sector: "",
  size: "", usesTools: "", toolsList: "", operation: "",
  challenges: [], mainChallenge: "", goal: "",
  channel: "", times: [], message: "",
};

const SECTORS = ["Comércio", "Serviços", "Indústria", "Agronegócio", "Outro"];
const SIZES = ["1-5", "6-20", "21-50", "50+"];
const CHALLENGES = [
  "Gestão financeira desorganizada", "Processos manuais e lentos", "Dificuldade em vender mais",
  "Falta de visibilidade de dados", "Equipe sem alinhamento", "Comunicação ineficiente com clientes", "Outro",
];
const CHANNELS = ["WhatsApp", "Email", "Videochamada"];
const TIMES = ["Manhã", "Tarde", "Noite"];

function ConsultoriaPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Orbs />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-20 text-center sm:px-6">
          <FadeIn>
            <h1 className="text-4xl font-bold sm:text-6xl">Consultoria <span className="gradient-text">Personalizada</span></h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Conte-nos sobre o seu negócio. Vamos entender sua necessidade e marcar uma reunião para criar uma solução sob medida.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <FadeIn>
            <h2 className="text-2xl font-bold sm:text-3xl">Como funciona</h2>
            <p className="mt-4 text-muted-foreground">
              Nossa consultoria não é um produto pronto. É uma jornada construída junto com você.
              Analisamos sua operação, identificamos gargalos e implementamos tecnologia de IA de
              forma prática e eficiente.
            </p>
          </FadeIn>
          <div className="space-y-3">
            {[
              { n: 1, t: "Preencha o formulário", d: "Conte sobre sua empresa e seus desafios." },
              { n: 2, t: "Nossa equipe analisa seu caso", d: "Estudamos seu contexto antes de qualquer reunião." },
              { n: 3, t: "Agendamos uma reunião estratégica", d: "Apresentamos um plano sob medida." },
            ].map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.08}>
                <div className="glass flex items-start gap-4 rounded-2xl p-5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-sm font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
                    {s.n}
                  </div>
                  <div>
                    <p className="font-semibold">{s.t}</p>
                    <p className="text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      <Section className="!pt-4">
        <MultiStepForm />
      </Section>

      <Section>
        <FadeIn><SectionTitle eyebrow="Confiança" title="Por que escolher a consultoria FlyTech?" /></FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, t: "Especialistas em IA para pequenos negócios" },
            { icon: Handshake, t: "Implementação prática, sem complexidade" },
            { icon: Gauge, t: "Resultados mensuráveis desde o início" },
            { icon: Target, t: "Acompanhamento contínuo pós-implementação" },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="glass card-hover h-full rounded-2xl p-5 text-center">
                <c.icon className="mx-auto h-6 w-6 text-[color:var(--cyan)]" />
                <p className="mt-3 text-sm">{c.t}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(empty);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const totalSteps = 4;

  const upd = <K extends keyof FormData>(k: K, v: FormData[K]) => setData((d) => ({ ...d, [k]: v }));
  const toggle = (key: "challenges" | "times", v: string) =>
    setData((d) => ({ ...d, [key]: d[key].includes(v) ? d[key].filter((x) => x !== v) : [...d[key], v] }));

  const validate = (): string | null => {
    if (step === 1) {
      if (!data.name || !data.email || !data.phone || !data.company || !data.sector) return "Preencha todos os campos.";
      if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Email inválido.";
    }
    if (step === 2 && (!data.size || !data.usesTools || !data.operation)) return "Preencha todos os campos.";
    if (step === 3 && (data.challenges.length === 0 || !data.mainChallenge || !data.goal)) return "Preencha todos os campos.";
    if (step === 4 && (!data.channel || data.times.length === 0)) return "Selecione canal e horário.";
    return null;
  };

  const next = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError(null);
    setStep((s) => Math.min(totalSteps, s + 1));
  };
  const back = () => { setError(null); setStep((s) => Math.max(1, s - 1)); };

  const submit = () => {
    const err = validate();
    if (err) { setError(err); return; }
    // TODO: Connect to backend or email service (e.g., EmailJS, Resend, Formspree) to handle form submissions
    console.log("[FlyTech] consultoria submission", data);
    setDone(true);
  };

  if (done) {
    return (
      <div className="glass-strong mx-auto max-w-2xl rounded-2xl p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full" style={{ background: "var(--gradient-primary)" }}>
          <CheckCircle2 className="h-8 w-8 text-white" />
        </div>
        <h3 className="mt-5 text-2xl font-bold">Recebemos sua solicitação!</h3>
        <p className="mt-3 text-muted-foreground">
          Nossa equipe analisará seu caso e entrará em contato em até 24 horas úteis para agendar sua reunião.
        </p>
      </div>
    );
  }

  const pct = (step / totalSteps) * 100;

  return (
    <div className="glass-strong mx-auto max-w-3xl rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium"><ClipboardList className="h-4 w-4 text-[color:var(--cyan)]" /> Etapa {step}/{totalSteps}</div>
        <span className="text-xs text-muted-foreground">{Math.round(pct)}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div className="h-full transition-all" style={{ width: `${pct}%`, background: "var(--gradient-primary)" }} />
      </div>

      <div className="relative mt-8 min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {step === 1 && (
              <>
                <h3 className="text-xl font-semibold">Sobre você e sua empresa</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Nome completo" value={data.name} onChange={(v) => upd("name", v)} />
                  <Field label="Email" type="email" value={data.email} onChange={(v) => upd("email", v)} />
                  <Field label="WhatsApp / Telefone" type="tel" value={data.phone} onChange={(v) => upd("phone", v)} />
                  <Field label="Empresa" value={data.company} onChange={(v) => upd("company", v)} />
                  <SelectField label="Segmento" value={data.sector} onChange={(v) => upd("sector", v)} options={SECTORS} className="sm:col-span-2" />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h3 className="text-xl font-semibold">Sobre sua situação atual</h3>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Quantos colaboradores?</p>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((s) => <Chip key={s} active={data.size === s} onClick={() => upd("size", s)}>{s}</Chip>)}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Usa alguma ferramenta de gestão?</p>
                  <div className="flex gap-2">
                    <Chip active={data.usesTools === "yes"} onClick={() => upd("usesTools", "yes")}>Sim</Chip>
                    <Chip active={data.usesTools === "no"} onClick={() => upd("usesTools", "no")}>Não</Chip>
                  </div>
                </div>
                {data.usesTools === "yes" && (
                  <Field label="Quais ferramentas?" value={data.toolsList} onChange={(v) => upd("toolsList", v)} />
                )}
                <Textarea label="Como descreveria sua operação atual?" value={data.operation} onChange={(v) => upd("operation", v)} />
              </>
            )}
            {step === 3 && (
              <>
                <h3 className="text-xl font-semibold">Qual é seu principal desafio?</h3>
                <p className="text-sm text-muted-foreground">Selecione tudo o que se aplica</p>
                <div className="flex flex-wrap gap-2">
                  {CHALLENGES.map((c) => (
                    <Chip key={c} active={data.challenges.includes(c)} onClick={() => toggle("challenges", c)}>{c}</Chip>
                  ))}
                </div>
                <Textarea label="Descreva seu principal desafio" value={data.mainChallenge} onChange={(v) => upd("mainChallenge", v)} />
                <Textarea label="Que resultado quer alcançar em 3 meses?" value={data.goal} onChange={(v) => upd("goal", v)} />
              </>
            )}
            {step === 4 && (
              <>
                <h3 className="text-xl font-semibold">Preferências de contato</h3>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Canal preferido</p>
                  <div className="flex flex-wrap gap-2">
                    {CHANNELS.map((c) => <Chip key={c} active={data.channel === c} onClick={() => upd("channel", c)}>{c}</Chip>)}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Horários preferidos</p>
                  <div className="flex flex-wrap gap-2">
                    {TIMES.map((t) => <Chip key={t} active={data.times.includes(t)} onClick={() => toggle("times", t)}>{t}</Chip>)}
                  </div>
                </div>
                <Textarea label="Mensagem adicional (opcional)" value={data.message} onChange={(v) => upd("message", v)} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-6 flex justify-between">
        <button onClick={back} disabled={step === 1} className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium hover:bg-white/5 disabled:opacity-30">Voltar</button>
        {step < totalSteps ? (
          <button onClick={next} className="rounded-lg px-5 py-2.5 text-sm font-semibold btn-gradient">Próximo</button>
        ) : (
          <button onClick={submit} className="rounded-lg px-5 py-2.5 text-sm font-semibold btn-gradient">Enviar e Aguardar Contato</button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--violet)]" />
    </label>
  );
}
function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--violet)]" />
    </label>
  );
}
function SelectField({ label, value, onChange, options, className = "" }: { label: string; value: string; onChange: (v: string) => void; options: string[]; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--violet)]">
        <option value="" className="bg-[color:var(--surface)]">Selecione…</option>
        {options.map((o) => <option key={o} value={o} className="bg-[color:var(--surface)]">{o}</option>)}
      </select>
    </label>
  );
}
function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition ${active ? "border-transparent text-white" : "border-white/15 text-muted-foreground hover:border-white/30 hover:text-foreground"}`}
      style={active ? { background: "var(--gradient-primary)" } : undefined}>
      {children}
    </button>
  );
}
