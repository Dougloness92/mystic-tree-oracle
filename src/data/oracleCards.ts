export interface OracleCard {
  id: number;
  name: string;
  hebrew: string;
  color: string;
  message: string;
  affirmation: string;
  guidance: string;
}

export const oracleCards: OracleCard[] = [
  {
    id: 1,
    name: "Kether — The Crown",
    hebrew: "כתר",
    color: "bg-gradient-to-br from-white to-gray-100",
    message: "A new spiritual cycle begins.",
    affirmation: "I align with my highest path.",
    guidance: "You are entering a phase of expanded awareness. The crown chakra opens, inviting divine light into your consciousness. Trust the beginnings that emerge now—they carry the seed of your highest purpose. This is a time of spiritual initiation and pure potential."
  },
  {
    id: 2,
    name: "Chokmah — Wisdom",
    hebrew: "חכמה",
    color: "bg-gradient-to-br from-gray-400 to-gray-600",
    message: "Divine wisdom flows through you.",
    affirmation: "I trust my inner knowing.",
    guidance: "The primordial force of creation stirs within you. Chokmah represents the first flash of inspiration, the moment before thought takes form. Pay attention to sudden insights and intuitive flashes. The universe speaks to you through symbols, synchronicities, and dreams."
  },
  {
    id: 3,
    name: "Binah — Understanding",
    hebrew: "בינה",
    color: "bg-gradient-to-br from-slate-700 to-slate-900",
    message: "Understanding comes through stillness.",
    affirmation: "I embrace the wisdom of patience.",
    guidance: "The Great Mother receives and gives form to all things. This is a time for contemplation, for allowing ideas to gestate. Do not rush. The understanding you seek will come when you create space for it. Honor the darkness as the womb of creation."
  },
  {
    id: 4,
    name: "Chesed — Mercy",
    hebrew: "חסד",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    message: "Abundance flows to those who give freely.",
    affirmation: "I am a channel for divine love.",
    guidance: "The boundless mercy of the universe pours forth. Chesed asks you to embody generosity, compassion, and loving-kindness. Where can you be more giving? How can you extend grace to yourself and others? This is a time of expansion and receiving through giving."
  },
  {
    id: 5,
    name: "Geburah — Strength",
    hebrew: "גבורה",
    color: "bg-gradient-to-br from-red-500 to-red-700",
    message: "True strength lies in discernment.",
    affirmation: "I honor my boundaries with love.",
    guidance: "The sword of discernment cuts away what no longer serves. Geburah calls you to set firm boundaries, to say no when necessary, and to honor your limits. This is not harshness—it is the protective love that creates healthy space for growth. Release with gratitude."
  },
  {
    id: 6,
    name: "Tiphareth — Beauty",
    hebrew: "תפארת",
    color: "bg-gradient-to-br from-yellow-400 to-amber-500",
    message: "Your heart is the center of transformation.",
    affirmation: "I radiate my authentic light.",
    guidance: "The golden sun of the soul shines at the center of the Tree. Tiphareth represents balance, beauty, and the awakened heart. You are called to integrate all aspects of yourself—light and shadow—into harmonious wholeness. Your authentic self is ready to shine."
  },
  {
    id: 7,
    name: "Netzach — Victory",
    hebrew: "נצח",
    color: "bg-gradient-to-br from-emerald-400 to-green-600",
    message: "Passion guides you toward victory.",
    affirmation: "I trust my desires as sacred guides.",
    guidance: "The force of nature, desire, and creative passion moves through you. Netzach celebrates the beauty of emotion and the power of attraction. What do you truly desire? Follow your heart's longing—it knows the way. Art, beauty, and nature are your allies now."
  },
  {
    id: 8,
    name: "Hod — Splendor",
    hebrew: "הוד",
    color: "bg-gradient-to-br from-orange-400 to-orange-600",
    message: "Words have the power to create reality.",
    affirmation: "I communicate with clarity and truth.",
    guidance: "The realm of thought, language, and communication awaits your attention. Hod invites you to examine your beliefs and the words you speak. Are they aligned with your highest vision? This is a time for study, learning, and refining your mental landscape."
  },
  {
    id: 9,
    name: "Yesod — Foundation",
    hebrew: "יסוד",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    message: "Your dreams reveal hidden truths.",
    affirmation: "I trust the guidance of my subconscious.",
    guidance: "The lunar realm of dreams, intuition, and the subconscious calls to you. Yesod is the gateway between the spiritual and material worlds. Pay close attention to your dreams, your emotional patterns, and the images that arise in meditation. The veil is thin."
  },
  {
    id: 10,
    name: "Malkuth — Kingdom",
    hebrew: "מלכות",
    color: "bg-gradient-to-br from-amber-700 to-stone-600",
    message: "The sacred lives in the everyday.",
    affirmation: "I honor the divine in all things.",
    guidance: "The earthly realm of manifestation and physical reality welcomes you. Malkuth reminds you that the spiritual journey culminates in the material world. Ground yourself. Tend to your body, your home, your work. The divine is present in every moment of ordinary life."
  }
];

export const getRandomCard = (): OracleCard => {
  const randomIndex = Math.floor(Math.random() * oracleCards.length);
  return oracleCards[randomIndex];
};
