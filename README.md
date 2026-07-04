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
npm run dev      # inicia o dev server (http://localhost:5173/login)
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
    brand/       # WardLogo (SVG)
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
- Botoes de "salvar" (registrar caso, etc.) sao apenas decorativos nesta versao. O usuario final nao adiciona nem edita dados.

## Mapa

- Tiles do OpenStreetMap via React Leaflet.
- Centralizacao por **geolocalizacao real** do navegador, com fallback para um centro fixo (Sao Luis / MA) caso a permissao seja negada.
- Marcadores coloridos por nivel de risco: verde (baixo), amarelo (medio), vermelho (alto).

## Imagens

<img width="536" height="856" alt="image" src="https://github.com/user-attachments/assets/7109e526-e37e-42f5-b5a1-b802e42a5b38" />

<img width="543" height="854" alt="image" src="https://github.com/user-attachments/assets/968314da-7820-485b-a5de-418297fede58" />

<img width="543" height="848" alt="image" src="https://github.com/user-attachments/assets/2083fc17-8b4c-44b0-882f-071f68c0202f" />

<img width="538" height="855" alt="image" src="https://github.com/user-attachments/assets/caf79750-17cc-4cb8-957e-202aa2bafc2d" />

<img width="544" height="854" alt="image" src="https://github.com/user-attachments/assets/0cd88e70-00e4-4a9a-9254-390a32d9bcaf" />

<img width="547" height="854" alt="image" src="https://github.com/user-attachments/assets/54b06fcb-66d0-46fc-a9fe-6724958395a6" />

<img width="542" height="853" alt="image" src="https://github.com/user-attachments/assets/be5fbe7a-2aa8-4c68-9726-13919669f4aa" />

_versão premmium_

<img width="546" height="855" alt="image" src="https://github.com/user-attachments/assets/8ece9cc2-3692-4287-bed1-88e7167d60e1" />

<img width="542" height="856" alt="image" src="https://github.com/user-attachments/assets/f2196e9f-3030-4d1c-b85b-95db30e0e8f6" />

<img width="541" height="855" alt="image" src="https://github.com/user-attachments/assets/d4230840-37cc-4c5c-a70d-df19d2bba2c2" />







