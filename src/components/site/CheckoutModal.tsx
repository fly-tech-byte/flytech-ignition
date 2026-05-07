import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { formatBRL, useCart } from "@/lib/cart";

// TODO: Replace STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY with real keys before going live
const PUBLISHABLE_KEY =
  (import.meta as any).env?.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder";

let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = () => {
  if (!stripePromise && PUBLISHABLE_KEY && !PUBLISHABLE_KEY.includes("placeholder")) {
    stripePromise = loadStripe(PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const promise = useMemo(() => getStripe(), []);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="fixed inset-0 z-[71] grid place-items-center p-4"
          >
            <div className="glass-strong relative w-full max-w-3xl rounded-2xl p-6 sm:p-8">
              <button onClick={onClose} aria-label="Fechar" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
              {promise ? (
                <Elements stripe={promise}>
                  <CheckoutForm onClose={onClose} />
                </Elements>
              ) : (
                <CheckoutForm onClose={onClose} mock />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CheckoutForm({ onClose, mock }: { onClose: () => void; mock?: boolean }) {
  const { items, total, clear } = useCart();
  const stripe = useStripeSafe();
  const elements = useElementsSafe();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <div className="grid place-items-center py-8 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full" style={{ background: "var(--gradient-primary)" }}>
          <CheckCircle2 className="h-8 w-8 text-white" />
        </div>
        <h3 className="mt-4 text-2xl font-bold">Pedido confirmado!</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Obrigado, {form.name || "cliente"}! Enviamos os detalhes do seu pedido para {form.email || "seu email"}.
        </p>
        <button onClick={() => { clear(); onClose(); }} className="mt-6 rounded-lg px-5 py-2.5 text-sm font-semibold btn-gradient">
          Fechar
        </button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email) { setError("Preencha nome e email."); return; }
    setLoading(true);
    try {
      if (!mock && stripe && elements) {
        const card = elements.getElement(CardElement);
        if (card) {
          const { error: stripeErr } = await stripe.createPaymentMethod({ type: "card", card });
          if (stripeErr) { setError(stripeErr.message || "Erro no cartão."); setLoading(false); return; }
        }
      }
      // TODO: Connect to backend or email service to handle order + Stripe payment intent
      console.log("[FlyTech] order", { customer: form, items, total });
      await new Promise((r) => setTimeout(r, 700));
      setDone(true);
    } catch (e: any) {
      setError(e?.message || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <form onSubmit={submit} className="space-y-4">
        <h3 className="text-xl font-bold">Finalizar compra</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome completo" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Telefone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Field label="Empresa" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Cartão de crédito/débito</label>
          <div className="glass rounded-lg px-3 py-3">
            {!mock ? (
              <CardElement options={{ style: { base: { color: "#fff", fontSize: "14px", "::placeholder": { color: "#A0A0B8" } } } }} />
            ) : (
              <input placeholder="4242 4242 4242 4242 (modo demo)" disabled className="w-full bg-transparent text-sm placeholder:text-muted-foreground outline-none" />
            )}
          </div>
          {mock && <p className="mt-1 text-[11px] text-muted-foreground">Modo demo — defina VITE_STRIPE_PUBLISHABLE_KEY para ativar pagamentos reais.</p>}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg px-4 py-3 text-sm font-semibold btn-gradient disabled:opacity-50">
          {loading ? "Processando…" : `Pagar ${formatBRL(total)}`}
        </button>
      </form>
      <aside className="glass h-fit rounded-xl p-4">
        <h4 className="text-sm font-semibold">Resumo do pedido</h4>
        <ul className="mt-3 space-y-2 text-sm">
          {items.map((i) => (
            <li key={i.id} className="flex justify-between gap-3">
              <span className="text-muted-foreground">{i.name} × {i.quantity}</span>
              <span>{formatBRL(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
          <span>Total</span>
          <span className="font-bold">{formatBRL(total)}<span className="text-xs text-muted-foreground">/mês</span></span>
        </div>
      </aside>
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

// Hooks that don't throw when Elements provider is missing (mock mode)
function useStripeSafe() { try { return useStripe(); } catch { return null; } }
function useElementsSafe() { try { return useElements(); } catch { return null; } }
