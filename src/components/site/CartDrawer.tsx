import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { formatBRL, useCart } from "@/lib/cart";
import { CheckoutModal } from "./CheckoutModal";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, total, count } = useCart();
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col glass-strong border-l border-white/10"
            >
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <h3 className="text-base font-semibold">Seu carrinho ({count})</h3>
                </div>
                <button onClick={close} aria-label="Fechar" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/5">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                {items.length === 0 ? (
                  <div className="grid h-full place-items-center text-center text-sm text-muted-foreground">
                    Seu carrinho está vazio.
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {items.map((i) => (
                      <li key={i.id} className="glass rounded-xl p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{i.category}</p>
                            <p className="font-semibold">{i.name}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{formatBRL(i.price)}/mês</p>
                          </div>
                          <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remover">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <button onClick={() => setQty(i.id, i.quantity - 1)} className="grid h-8 w-8 place-items-center rounded-md border border-white/10 hover:bg-white/5"><Minus className="h-3 w-3" /></button>
                          <span className="w-8 text-center text-sm">{i.quantity}</span>
                          <button onClick={() => setQty(i.id, i.quantity + 1)} className="grid h-8 w-8 place-items-center rounded-md border border-white/10 hover:bg-white/5"><Plus className="h-3 w-3" /></button>
                          <span className="ml-auto text-sm font-semibold">{formatBRL(i.price * i.quantity)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-white/5 px-5 py-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-lg font-bold">{formatBRL(total)}<span className="text-xs text-muted-foreground">/mês</span></span>
                </div>
                <button
                  disabled={items.length === 0}
                  onClick={() => setCheckout(true)}
                  className="w-full rounded-lg px-4 py-3 text-sm font-semibold btn-gradient disabled:opacity-40"
                >
                  Finalizar Compra
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </>
  );
}
