import type { Product } from "@/lib/cart";

export const PRODUCTS: (Product & { features: string[]; long: string })[] = [
  {
    id: "gmv",
    name: "GMV — Agente de Marketing e Vendas",
    category: "Agente de IA",
    price: 297,
    description: "Centralize marketing e vendas em um só agente inteligente que organiza leads, integra canais e otimiza campanhas em tempo real.",
    features: [
      "Centraliza marketing e vendas",
      "Integra canais e organiza leads",
      "Análise de dados em tempo real",
      "Otimização de campanhas",
      "Processo comercial previsível e escalável",
    ],
    long: "O GMV unifica suas operações comerciais com IA: do primeiro contato à conversão, com dashboards claros e ações automatizadas.",
  },
  {
    id: "gfd",
    name: "GFD — Agente de Gestão Financeira",
    category: "Agente de IA",
    price: 247,
    description: "Transforme dados financeiros em decisões claras com análises, projeções e gestão estratégica do seu caixa.",
    features: [
      "Transforma dados financeiros em informações claras",
      "Análise de desempenho financeiro",
      "Projeção de cenários",
      "Gestão financeira organizada e estratégica",
    ],
    long: "O GFD organiza seu financeiro com IA: visualize tendências, antecipe riscos e tome decisões com segurança.",
  },
  {
    id: "consultoria-pack",
    name: "Consultoria Estratégica Pack",
    category: "Consultoria",
    price: 497,
    description: "Pacote completo: agentes de IA integrados + eBooks, cursos aplicados e acompanhamento estratégico contínuo.",
    features: [
      "eBooks e cursos aplicados inclusos",
      "Agentes de IA integrados",
      "Orientação contínua",
      "Conteúdo sobre gestão e crescimento",
    ],
    long: "A combinação ideal para quem quer crescer com método: tecnologia, conteúdo e mentoria em um único plano.",
  },
];
