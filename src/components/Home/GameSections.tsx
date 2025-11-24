'use client';

import GameCategorySlider from '@/components/Home/GameCategorySlider';

// Import Game Image
// Using public assets path since local '@/assets' does not exist

// Mock game data - you can replace this with actual API data
const mockGames = [
  {
    id: '1',
    name: 'Coin Strike Hold and Win 3x3',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '2',
    name: 'Banquet of Dead',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '3',
    name: 'Sweet Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '4',
    name: 'Big Bass Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '5',
    name: 'Dragons Playground',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '6',
    name: "777 Valentine's",
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '7',
    name: 'Jellycious Doublemax',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '8',
    name: 'Egyptian Darkness Book of the Divine',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '9',
    name: "Joker's Charms Valentine's",
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '10',
    name: 'Jelly Belly Megaways',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/game-card.png',
    isNew: true,
    isLive: true,
  },
];

const GameSections = () => {
  const handleViewAll = (category: string) => {
    console.log(`View all ${category} clicked`);
    // Add your navigation logic here
  };

  return (
    <div className='space-y-12'>
      {/* Popular Games */}
      <GameCategorySlider
        title='Popular Games'
        games={mockGames.slice(0, 10)}
        onViewAllClick={() => handleViewAll('Popular Games')}
      />

      {/* New Games */}
      <GameCategorySlider
        title='New Games'
        games={mockGames.slice(1, 10)}
        onViewAllClick={() => handleViewAll('New Games')}
      />

      {/* Live Now */}
      {/* <GameCategorySlider
        title="Live Now"
        games={mockGames.filter(game => game.isLive)}
        onViewAllClick={() => handleViewAll('Live Now')}
        showLiveBadge={true}
      /> */}

      {/* Crash Games */}
      <GameCategorySlider
        title='Crash Games'
        games={mockGames.slice(1, 10)}
        onViewAllClick={() => handleViewAll('Crash Games')}
      />
    </div>
  );
};

export default GameSections;
