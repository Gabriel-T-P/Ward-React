# Ward

> Sua sentinela pessoal.

MVP front-end de um aplicativo HealthTech focado em saude preventiva. O coracao do app e um **mapa interativo** que mostra doencas circulando perto do usuario, alem de alertas, historico de vacinas e registro de casos.

Projeto academico com foco em UX/UI: **sem backend, sem banco de dados e sem autenticacao real**. Todo o estado e local e todos os dados vem de arquivos JSON.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build e dev server)
- [Tailwind CSS v4](https://tailwindcss.com/) (design tokens em CSS)
- [React Router](https://reactrouter.com/) (navegacao)
- [React Leaflet](https://react-leaflet.js.org/) + [OpenStreetMap](https://www.openstreetmap.org/) (mapa)
- [Lucide React](https://lucide.dev/) (icones)

## Como rodar

```bash
npm install
npm run dev      # inicia o dev server (http://localhost:5173)
```

Outros scripts:

```bash
npm run build    # type-check + build de producao
npm run preview  # serve o build de producao
npm run lint     # ESLint
```

## Estrutura

```
src/
  components/
    brand/       # WardLogo (SVG vetorial)
    ui/          # Button, Card, Input, Badge, BottomSheet, Fab
    layout/      # AppLayout, BottomNav, Screen
    map/         # DiseaseMap, DiseaseMarker, DiseaseSheet, AlertCard
  data/          # diseases.json, vaccines.json, alerts.json, user.json
  hooks/         # useGeolocation
  lib/           # risk, date, cn (helpers)
  pages/         # Splash, Login, Register, Home, RegisterCase, Alerts, Vaccines, Profile
  types/         # interfaces tipadas
  App.tsx        # rotas
  main.tsx       # entry point
```

## Navegacao

`Splash -> Login -> Mapa (Home)`. A partir do mapa, a navegacao inferior da acesso a: **Mapa**, **Registrar**, **Alertas**, **Vacinas** e **Perfil**.

## Dados e persistencia

- Todo o conteudo e lido dos JSONs em `src/data/`.
- **Nada e salvo.** Botoes de "salvar" (registrar caso, etc.) sao apenas decorativos nesta versao. O usuario final nao adiciona nem edita dados.

## Mapa

- Tiles do OpenStreetMap via React Leaflet.
- Centralizacao por **geolocalizacao real** do navegador, com fallback para um centro fixo (Sao Luis / MA) caso a permissao seja negada.
- Marcadores coloridos por nivel de risco: verde (baixo), amarelo (medio), vermelho (alto).

## Design

Estilo minimalista inspirado em Apple Health / Google Fit: mobile-first, muito whitespace, cantos arredondados, sombras suaves e paleta enxuta (vermelho `#EF4444` + neutros). As cores verde/amarelo/vermelho sao usadas exclusivamente para indicar risco.

## Aviso

As informacoes de saude aqui sao ficticias, geradas para fins de demonstracao academica.
