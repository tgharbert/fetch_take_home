<div align="center" style="display: flex; align-items: center; justify-content: center;">
  <h1 style="margin-right: 10px;">Fetch Take Home</h1>
  <img src="public/FetchTH_fullsize.png" alt="Fetch Logo" width="53" height="30" style="padding-bottom: 2rem;"/>
</div>

<div align="center">
  Check out the deployed version here:
</div>
<div align="center">
  https://fetchtakehome.vercel.app
</div>

## 📋 Features

- **Dog Search with Multiple Filters**
  - Filter by breed
  - Filter by age range
  - Search by location (ZIP code + radius)
  - Sort breeds alphabetically
- **Breed Selection**
  - Browse all available dog breeds
  - Select multiple breeds simultaneously
- **Interactive Dog Browsing**
  - View dog details
  - Add dogs to favorites
- **Matching System**
  - Find your perfect match from favorited dogs
- **User Authentication**
  - Secure login system

## 🛠️ Technologies

- **Frontend**
  - Next.js 13+ (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
- **UI Components**
  - Lucide React (icons)
- **API**
  - Fetch API integration

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/tgharbert/fetch-takehome.git
   cd fetch-takehome
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file with your API config

   ```
   BASE_URL=TAKEHOME_URL
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open http://localhost:3000 in your browser and revel in the beauty...

## 🏗️ Project Structure

```

fetch-takehome/
├── app/
│ ├── api/
│ │ ├── breeds/
│ │ │ └── route.ts
│ │ ├── dogs/
│ │ │ └── search/
│ │ │ └── route.ts
│ │ ├── login/
│ │ │ └── route.ts
│ │ └── match/
│ │ └── route.ts
│ ├── components/
│ │ ├── dogslist/
│ │ │ ├── DogList.tsx
│ │ │ ├── DogCard.tsx
│ │ │ └── dogsnav/
│ │ │ └── DogsNav.tsx
│ │ ├── header/
│ │ │ └── header.tsx
│ │ ├── loading/
│ │ │ └── Loading.tsx
│ │ └── searchdogsform/
│ │ ├── SearchDogsForm.tsx
│ │ ├── breeds/
│ │ │ ├── BreedCard.tsx
│ │ │ ├── BreedList.tsx
│ │ │ └── Searchbar.tsx
│ │ ├── location/
│ │ │ └── SelectLocation.tsx
│ │ └── selectage/
│ │ └── SelectMinMaxAge.tsx
│ ├── dogs/
│ │ └── page.tsx
│ ├── login/
│ │ └── page.tsx
│ ├── match/
│ │ └── [id]/
│ │ └── page.tsx
│ ├── lib/
│ │ └── hooks/
│ │ └── useDogSearch.ts
│ ├── fonts.ts
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── public/
│ └── FetchTH_fullsize.png
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json

```
