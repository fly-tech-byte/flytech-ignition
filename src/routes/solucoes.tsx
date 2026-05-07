import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, Check, ChevronDown, ShoppingCart, TrendingUp, Wallet } from "lucide-react";
import { Orbs } from "@/components/site/Orbs";
import { FadeIn, Section, SectionTitle } from "@/components/site/Section";
import { PRODUCTS } from "@/lib/products";
import { formatBRL, useCart } from "@/lib/cart";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções — FlyTech" },
      { name: "description", content: "Agentes de IA e consultoria para impulsionar marketing, vendas e finanças do seu negócio." },
      { property: "og:title", content: "Soluções FlyTech" },
      { property: "og:description", content: "Produtos prontos para transformar sua operação." },
    ],
  }),
  component: SolucoesPage,
});

function SolucoesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Orbs />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 text-center sm:px-6">
          <FadeIn>
            <h1 className="text-4xl font-bold sm:text-6xl">Nossas <span className="gradient-text">Soluções</span></h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Produtos prontos para transformar sua operação. Escolha, adicione ao carrinho e comece a usar.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.08}>
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const { add, open } = useCart();
  const [expanded, setExpanded] = useState(false);
  const Icon = product.id === "gmv" ? TrendingUp : product.id === "gfd" ? Wallet : Briefcase;

  return (
    <div className="glass card-hover relative flex h-full flex-col rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>
        <div className="grid h-11 w-11 place-items-center rounded-lg" style={{ background: "var(--gradient-soft)" }}>
          <Icon className="h-5 w-5 text-[color:var(--cyan)]" />
        </div>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>

      <ul className="mt-5 space-y-2">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--cyan)]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {expanded && (
        <p className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-muted-foreground">
          {product.long}
        </p>
      )}

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-3xl font-bold">{formatBRL(product.price)}</span>
        <span className="text-sm text-muted-foreground">/mês</span>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={() => { add(product); open(); }}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold btn-gradient"
        >
          <ShoppingCart className="h-4 w-4" /> Adicionar ao Carrinho
        </button>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Saiba mais <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}
