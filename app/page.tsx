'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_QUESTIONS = {
  en: [
    {
      id: 'emotional_state',
      text: 'What describes your emotional state tonight?',
      options: [
        { text: 'Sophisticated and composed', value: 'composed', archetypes: ['martini', 'dry_martini'] },
        { text: 'Mysterious and introspective', value: 'mysterious', archetypes: ['old_fashioned', 'manhattan'] },
        { text: 'Energetic and sociable', value: 'energetic', archetypes: ['mojito', 'french_75'] },
        { text: 'Sensual and seductive', value: 'sensual', archetypes: ['espresso_martini', 'cosmopolitan'] }
      ]
    },
    {
      id: 'social_energy',
      text: 'How would you describe your social energy?',
      options: [
        { text: 'Calculated control', value: 'control', archetypes: ['martini', 'negroni'] },
        { text: 'Dangerous charm', value: 'charm', archetypes: ['sidecar', 'sazerac'] },
        { text: 'Playful rebellion', value: 'rebellion', archetypes: ['mojito', 'caipirinha'] },
        { text: 'Quiet confidence', value: 'confidence', archetypes: ['old_fashioned', 'daiquiri'] }
      ]
    },
    {
      id: 'confidence_level',
      text: 'Your confidence level in approaching the night:',
      options: [
        { text: 'Perfectly poised', value: 'poised', archetypes: ['martini', 'french_75'] },
        { text: 'Strategic and observant', value: 'strategic', archetypes: ['manhattan', 'boulevardier'] },
        { text: 'Bold and unapologetic', value: 'bold', archetypes: ['sazerac', 'rusty_nail'] },
        { text: 'Effortlessly cool', value: 'cool', archetypes: ['daiquiri', 'gimlet'] }
      ]
    },
    {
      id: 'romantic_energy',
      text: 'Your romantic energy tonight is:',
      options: [
        { text: 'Intensely seductive', value: 'seductive', archetypes: ['espresso_martini', 'cosmopolitan'] },
        { text: 'Deeply passionate', value: 'passionate', archetypes: ['mai_tai', 'pisco_sour'] },
        { text: 'Playfully flirtatious', value: 'flirtatious', archetypes: ['bellini', 'tom_collins'] },
        { text: 'Elegantly romantic', value: 'romantic', archetypes: ['french_75', 'aviation'] }
      ]
    },
    {
      id: 'chaos_vs_control',
      text: 'You prefer:',
      options: [
        { text: 'Perfect order and precision', value: 'order', archetypes: ['martini', 'dry_martini'] },
        { text: 'Calculated risks', value: 'calculated', archetypes: ['negroni', 'boulevardier'] },
        { text: 'Beautiful chaos', value: 'chaos', archetypes: ['mojito', 'moscow_mule'] },
        { text: 'Structured freedom', value: 'structured', archetypes: ['old_fashioned', 'whiskey_sour'] }
      ]
    },
    {
      id: 'nightlife_behavior',
      text: 'Your nightlife archetype:',
      options: [
        { text: 'The Discreet Operator', value: 'operator', archetypes: ['martini', 'dry_martini'] },
        { text: 'The Sophisticated Strategist', value: 'strategist', archetypes: ['negroni', 'manhattan'] },
        { text: 'The Magnetic Charmer', value: 'charmer', archetypes: ['espresso_martini', 'french_75'] },
        { text: 'The Elegant Wanderer', value: 'wanderer', archetypes: ['daiquiri', 'gimlet'] }
      ]
    },
    {
      id: 'taste_preference',
      text: 'Your flavor preference:',
      options: [
        { text: 'Strong and uncompromising', value: 'strong', archetypes: ['sazerac', 'rusty_nail'] },
        { text: 'Balanced and refined', value: 'balanced', archetypes: ['martini', 'old_fashioned'] },
        { text: 'Bright and refreshing', value: 'bright', archetypes: ['daiquiri', 'gimlet'] },
        { text: 'Complex and layered', value: 'complex', archetypes: ['negroni', 'mai_tai'] }
      ]
    },
    {
      id: 'introvert_extrovert',
      text: 'Your social nature is:',
      options: [
        { text: 'Introverted - prefer intimate', value: 'intimate', archetypes: ['old_fashioned', 'sazerac'] },
        { text: 'Slightly reserved but captivating', value: 'reserved', archetypes: ['aviation', 'sidecar'] },
        { text: 'Naturally magnetic', value: 'magnetic', archetypes: ['espresso_martini', 'cosmopolitan'] },
        { text: 'Socially commanding', value: 'commanding', archetypes: ['french_75', 'bellini'] }
      ]
    },
    {
      id: 'luxury_simplicity',
      text: 'Your approach to luxury:',
      options: [
        { text: 'Understated elegance', value: 'understated', archetypes: ['dry_martini', 'gimlet'] },
        { text: 'Opulent and indulgent', value: 'opulent', archetypes: ['bellini', 'french_75'] },
        { text: 'Classic and timeless', value: 'timeless', archetypes: ['martini', 'old_fashioned'] },
        { text: 'Daring and unexpected', value: 'daring', archetypes: ['sazerac', 'corpse_reviver_2'] }
      ]
    },
    {
      id: 'adventure_stability',
      text: 'Tonight you seek:',
      options: [
        { text: 'Comfortable familiarity', value: 'familiar', archetypes: ['daiquiri', 'tom_collins'] },
        { text: 'Thrilling adventure', value: 'adventure', archetypes: ['sazerac', 'mai_tai'] },
        { text: 'Refined exploration', value: 'exploration', archetypes: ['aviation', 'pisco_sour'] },
        { text: 'Mysterious discovery', value: 'discovery', archetypes: ['negroni', 'boulevardier'] }
      ]
    }
  ]
};

const COCKTAILS = {
  martini: {
    name: 'Martini',
    archetype: 'The Discreet Operator',
    emotionalProfile: 'Perfectly poised, supremely confident, masterfully controlled',
    description: 'The apex of simplicity and sophistication. Your essence is crystalline clarity—uncompromising, iconic, unforgettable.',
    flavorProfile: 'Crisp, botanical, dry',
    drinkingAtmosphere: 'Exclusive lounge, tailored suit, calculated conversations',
    musicVibe: 'Jazz standards, cool arrangements',
    nightlifeEnergy: 'Commanding yet understated presence',
    ingredients: ['1.5 oz Gin', '0.5 oz Dry Vermouth', 'Olive garnish'],
    color: 'from-blue-900 to-slate-800'
  },
  dry_martini: {
    name: 'Dry Martini',
    archetype: 'The Ultimate Minimalist',
    emotionalProfile: 'Exquisitely refined, boundlessly elegant, icily composed',
    description: 'Gin with vermouth—a whisper, not a shout. You are the essence of restraint, where every element serves a purpose.',
    flavorProfile: 'Pure botanical gin, minimal sweetness',
    drinkingAtmosphere: 'Private casino, high-stakes strategy',
    musicVibe: 'Ambient sophistication',
    nightlifeEnergy: 'Silent confidence, lethal precision',
    ingredients: ['2 oz Gin', '0.25 oz Dry Vermouth', 'Lemon twist'],
    color: 'from-slate-900 to-gray-800'
  },
  espresso_martini: {
    name: 'Espresso Martini',
    archetype: 'The Seductive Catalyst',
    emotionalProfile: 'Intoxicatingly charismatic, darkly magnetic, irresistibly compelling',
    description: 'Velvet, intensity, and provocative allure. You command attention through sheer presence—a dangerous combination of intellect and magnetism.',
    flavorProfile: 'Bitter espresso, silky smooth, intoxicating',
    drinkingAtmosphere: 'Upscale nightclub, intimate corner booth',
    musicVibe: 'Deep electronic beats, sensual rhythms',
    nightlifeEnergy: 'Hypnotic attraction, dangerous charm',
    ingredients: ['1.5 oz Vodka', '0.5 oz Kahlúa', '1 oz Espresso', 'Cocoa powder'],
    color: 'from-amber-950 to-black'
  },
  negroni: {
    name: 'Negroni',
    archetype: 'The Sophisticated Strategist',
    emotionalProfile: 'Intellectually commanding, strategically brilliant, elegantly complex',
    description: 'Bitter, bold, and beautifully balanced. You navigate complexity with grace—three equal forces in perfect harmony.',
    flavorProfile: 'Bitter-sweet, herbal, layered',
    drinkingAtmosphere: 'Milan aperitivo hour, rooftop with city views',
    musicVibe: 'Italian sophistication, urbane cool',
    nightlifeEnergy: 'Thoughtful dominance, cultured presence',
    ingredients: ['1 oz Gin', '1 oz Campari', '1 oz Sweet Vermouth', 'Orange twist'],
    color: 'from-red-950 to-orange-900'
  },
  old_fashioned: {
    name: 'Old Fashioned',
    archetype: 'The Timeless Maverick',
    emotionalProfile: 'Steadfastly independent, deeply introspective, authentically powerful',
    description: 'Whiskey, sugar, bitters—the fundamentals. You embody strength tempered with wisdom, tradition infused with rebellion.',
    flavorProfile: 'Warm whiskey, caramel, spice',
    drinkingAtmosphere: 'Leather-bound library, contemplative solitude',
    musicVibe: 'Blues, classic rock, introspective vibes',
    nightlifeEnergy: 'Quiet intensity, unshakeable resolve',
    ingredients: ['2 oz Bourbon', '1 sugar cube', '2 dashes Angostura Bitters', 'Orange peel'],
    color: 'from-amber-900 to-yellow-900'
  },
  manhattan: {
    name: 'Manhattan',
    archetype: 'The Urban Philosopher',
    emotionalProfile: 'Intellectually sophisticated, mysteriously alluring, subtly commanding',
    description: 'Whiskey meets vermouth in urban sophistication. You are the intersection of classical strength and refined complexity.',
    flavorProfile: 'Rich whiskey, herbal sweetness, aromatic',
    drinkingAtmosphere: 'Rooftop skyline, sophisticated conversation',
    musicVibe: 'Jazz standards, melancholic sophistication',
    nightlifeEnergy: 'Understated power, magnetic intellect',
    ingredients: ['2 oz Whiskey', '1 oz Sweet Vermouth', '2 dashes Angostura Bitters', 'Cherry'],
    color: 'from-rose-900 to-purple-900'
  },
  whiskey_sour: {
    name: 'Whiskey Sour',
    archetype: 'The Balanced Rebel',
    emotionalProfile: 'Confidently authentic, refreshingly honest, warmly approachable',
    description: 'Perfect equilibrium: strength balanced by brightness, tradition elevated by freshness. You are the rare individual who is both principled and free.',
    flavorProfile: 'Warm whiskey, bright lemon, subtle sweetness',
    drinkingAtmosphere: 'Casual sophistication, genuine connection',
    musicVibe: 'Americana, folk sophistication',
    nightlifeEnergy: 'Authentic charm, accessible depth',
    ingredients: ['2 oz Whiskey', '0.75 oz Lemon Juice', '0.5 oz Simple Syrup', 'Optional egg white'],
    color: 'from-yellow-900 to-orange-800'
  },
  daiquiri: {
    name: 'Daiquiri',
    archetype: 'The Elegant Wanderer',
    emotionalProfile: 'Effortlessly charming, naturally refined, comfortably confident',
    description: 'Simplicity at its most elegant: rum, lime, sugar. You navigate the world with quiet grace, unforced elegance, and understated brilliance.',
    flavorProfile: 'Clean rum, bright citrus, subtle sweetness',
    drinkingAtmosphere: 'Tropical evening, endless horizon',
    musicVibe: 'Bossa nova, smooth jazz',
    nightlifeEnergy: 'Relaxed sophistication, natural appeal',
    ingredients: ['2 oz White Rum', '1 oz Lime Juice', '0.5 oz Simple Syrup'],
    color: 'from-yellow-800 to-amber-700'
  },
  mojito: {
    name: 'Mojito',
    archetype: 'The Magnetic Charmer',
    emotionalProfile: 'Vibrant, socially magnetic, joyfully energetic',
    description: 'Fresh, alive, and irresistibly appealing. You bring infectious energy and genuine warmth—a natural catalyst for celebration.',
    flavorProfile: 'Minty fresh, bright lime, smooth rum',
    drinkingAtmosphere: 'Tropical garden party, social epicenter',
    musicVibe: 'Latin rhythms, upbeat tempos',
    nightlifeEnergy: 'Infectious enthusiasm, natural leadership',
    ingredients: ['2 oz White Rum', '1 oz Lime Juice', '0.75 oz Simple Syrup', 'Mint leaves'],
    color: 'from-green-900 to-emerald-800'
  },
  margarita: {
    name: 'Margarita',
    archetype: 'The Daring Adventurer',
    emotionalProfile: 'Boldly confident, thrillingly unpredictable, fiercely independent',
    description: 'Sharp, citrusy, unapologetically bold. You embrace adventure, reject mediocrity, and live with passionate authenticity.',
    flavorProfile: 'Tequila bite, bright lime, salt rim',
    drinkingAtmosphere: 'Desert night, bold social scene',
    musicVibe: 'Contemporary beats, edgy vibes',
    nightlifeEnergy: 'Fearless engagement, vibrant presence',
    ingredients: ['2 oz Tequila', '1 oz Lime Juice', '1 oz Cointreau', 'Salt rim'],
    color: 'from-yellow-700 to-green-700'
  },
  sidecar: {
    name: 'Sidecar',
    archetype: 'The Romantic Rogue',
    emotionalProfile: 'Charmingly dangerous, seductively sophisticated, romantically complex',
    description: 'Cognac embraces citrus with brandy sweetness. You are the perfect balance of danger and refinement—thrillingly unpredictable yet elegantly composed.',
    flavorProfile: 'Rich brandy, citrus sparkle, herbal notes',
    drinkingAtmosphere: '1920s supper club, candlelit elegance',
    musicVibe: 'Vintage jazz, sultry arrangements',
    nightlifeEnergy: 'Seductive enigma, cultured rebellion',
    ingredients: ['1.5 oz Cognac', '1 oz Cointreau', '0.75 oz Lemon Juice'],
    color: 'from-amber-900 to-orange-800'
  },
  boulevardier: {
    name: 'Boulevardier',
    archetype: 'The Discerning Insider',
    emotionalProfile: 'Cosmopolitan, intellectually engaged, subtly influential',
    description: 'A cognac take on the Negroni—worldly, refined, pleasantly complex. You move through culture with sophisticated taste and genuine understanding.',
    flavorProfile: 'Brandy warmth, bitter complexity, herbal notes',
    drinkingAtmosphere: 'Parisian café, cultural gathering',
    musicVibe: 'European jazz, avant-garde sophistication',
    nightlifeEnergy: 'Cultured presence, intellectual magnetism',
    ingredients: ['1.5 oz Cognac', '1 oz Sweet Vermouth', '1 oz Campari', 'Orange twist'],
    color: 'from-purple-900 to-red-900'
  },
  aviation: {
    name: 'Aviation',
    archetype: 'The Ethereal Dreamer',
    emotionalProfile: 'Imaginatively boundless, romantically inclined, spiritually attuned',
    description: 'Gin with crème de violette and maraschino—rare, delicate, subtly floral. You are the romantic idealist who sees beauty others miss.',
    flavorProfile: 'Botanical gin, floral violet, cherry whisper',
    drinkingAtmosphere: 'Moonlit garden, dreamy solitude',
    musicVibe: 'Classical influence, ambient beauty',
    nightlifeEnergy: 'Quiet enchantment, poetic presence',
    ingredients: ['2 oz Gin', '0.5 oz Crème de Violette', '0.5 oz Maraschino Liqueur', '0.75 oz Lemon Juice'],
    color: 'from-violet-900 to-indigo-800'
  },
  moscow_mule: {
    name: 'Moscow Mule',
    archetype: 'The Modern Libertine',
    emotionalProfile: 'Playfully irreverent, refreshingly bold, culturally adventurous',
    description: 'Vodka with ginger\'s fiery spirit—a modern classic that defies pretension. You are authentic, unbound by convention, genuinely free.',
    flavorProfile: 'Smooth vodka, spicy ginger, bright lime',
    drinkingAtmosphere: 'Urban lounge, relaxed sophistication',
    musicVibe: 'Contemporary pop, electronic ease',
    nightlifeEnergy: 'Casual confidence, refreshing honesty',
    ingredients: ['1.5 oz Vodka', '4.5 oz Ginger Beer', '0.5 oz Lime Juice'],
    color: 'from-amber-800 to-yellow-700'
  },
  tom_collins: {
    name: 'Tom Collins',
    archetype: 'The Timeless Social Butterfly',
    emotionalProfile: 'Warmly engaging, naturally charismatic, genuinely personable',
    description: 'Gin\'s brightness meets lemon\'s clarity—accessible yet sophisticated. You bridge all worlds, equally at home in any social setting.',
    flavorProfile: 'Botanical gin, bright lemon, subtle sweetness',
    drinkingAtmosphere: 'Sunny afternoon, garden gathering',
    musicVibe: 'Easy listening, timeless appeal',
    nightlifeEnergy: 'Effortless sociability, warmth without pretense',
    ingredients: ['2 oz Gin', '1 oz Lemon Juice', '0.5 oz Simple Syrup', 'Soda water', 'Cherry'],
    color: 'from-yellow-900 to-green-800'
  },
  french_75: {
    name: 'French 75',
    archetype: 'The Champagne Sophisticate',
    emotionalProfile: 'Celebratory yet elegant, refined yet joyful, brilliantly commanding',
    description: 'Champagne sparkles with gin\'s sophistication—fizzing brilliance and refined grace. You bring celebration to every moment with impeccable taste.',
    flavorProfile: 'Champagne effervescence, botanical gin, citrus brightness',
    drinkingAtmosphere: 'Gala evening, celebratory moment',
    musicVibe: 'Jazz celebration, uplifting vibes',
    nightlifeEnergy: 'Sparkling confidence, infectious joy',
    ingredients: ['1 oz Gin', '0.5 oz Lemon Juice', '0.5 oz Simple Syrup', 'Champagne', 'Lemon twist'],
    color: 'from-yellow-700 to-amber-600'
  },
  gimlet: {
    name: 'Gimlet',
    archetype: 'The Crisp Pragmatist',
    emotionalProfile: 'Clearly focused, refreshingly direct, enviably efficient',
    description: 'Gin and lime juice—no pretense, no excess. You are straightforward elegance, where every element serves function with grace.',
    flavorProfile: 'Clean gin, bright lime, no sugar nonsense',
    drinkingAtmosphere: 'Executive lounge, purposeful moments',
    musicVibe: 'Contemporary jazz, streamlined sophistication',
    nightlifeEnergy: 'Focused presence, uncluttered confidence',
    ingredients: ['2 oz Gin', '1 oz Lime Cordial'],
    color: 'from-lime-900 to-green-800'
  },
  sazerac: {
    name: 'Sazerac',
    archetype: 'The Uncompromising Rebel',
    emotionalProfile: 'Fiercely authentic, defiantly independent, unapologetically powerful',
    description: 'Rye with absinthe\'s shadow—bold, complex, historically rebellious. You honor tradition while living dangerously, authenticity over approval.',
    flavorProfile: 'Spicy rye, herbal mystery, bold presence',
    drinkingAtmosphere: 'New Orleans speakeasy, dangerous intrigue',
    musicVibe: 'Blues with an edge, historical gravitas',
    nightlifeEnergy: 'Raw authenticity, dangerous depth',
    ingredients: ['2 oz Rye Whiskey', '0.25 oz Absinthe', '2 dashes Peychaud\'s Bitters', 'Lemon peel'],
    color: 'from-orange-950 to-red-950'
  },
  mai_tai: {
    name: 'Mai Tai',
    archetype: 'The Exotic Sensual',
    emotionalProfile: 'Mysteriously alluring, richly passionate, exotically sophisticated',
    description: 'Rum, lime, and orgeat create layered paradise. You are sensuous complexity—mysterious, deeply attractive, flavored with wanderlust.',
    flavorProfile: 'Dual rum complexity, almond sweetness, tropical lime',
    drinkingAtmosphere: 'Tropical paradise, intimate indulgence',
    musicVibe: 'Exotica, world sounds, sensual rhythms',
    nightlifeEnergy: 'Exotic magnetism, mysterious depth',
    ingredients: ['2 oz Aged Rum', '1 oz Orgeat Syrup', '0.5 oz Cointreau', '1 oz Lime Juice'],
    color: 'from-red-900 to-orange-800'
  },
  mint_julep: {
    name: 'Mint Julep',
    archetype: 'The Graceful Southern',
    emotionalProfile: 'Warmly refined, unhurried elegance, genuinely hospitable',
    description: 'Bourbon, mint, and tradition—cooling grace with warm soul. You embody unhurried sophistication and the art of timeless living.',
    flavorProfile: 'Smooth bourbon, fresh mint, subtle sweetness',
    drinkingAtmosphere: 'Porch afternoon, leisurely grace',
    musicVibe: 'Southern comfort, acoustic warmth',
    nightlifeEnergy: 'Unhurried charm, hospitable presence',
    ingredients: ['2.5 oz Bourbon', 'Fresh mint', '0.5 oz Simple Syrup', 'Ice'],
    color: 'from-green-900 to-teal-800'
  },
  cosmopolitan: {
    name: 'Cosmopolitan',
    archetype: 'The Urban Seductress',
    emotionalProfile: 'Fashionably confident, sexily assured, urbanely magnetic',
    description: 'Vodka, cranberry, and Cointreau—pink perfection embodying urban allure. You are contemporary sophistication wrapped in magnetic appeal.',
    flavorProfile: 'Cranberry tartness, citrus shimmer, vodka smoothness',
    drinkingAtmosphere: 'Upscale cocktail lounge, fashion-forward scene',
    musicVibe: 'Electronic sophistication, modern cool',
    nightlifeEnergy: 'Seductive urbanity, fashionable magnetism',
    ingredients: ['1.5 oz Vodka', '1 oz Cranberry Juice', '0.5 oz Cointreau', '0.5 oz Lime Juice'],
    color: 'from-pink-900 to-red-800'
  },
  pisco_sour: {
    name: 'Pisco Sour',
    archetype: 'The Refined Adventurer',
    emotionalProfile: 'Culturally sophisticated, refined yet bold, elegantly daring',
    description: 'Pisco\'s blank canvas meets lime\'s brightness—South American sophistication. You balance cultural depth with contemporary vision.',
    flavorProfile: 'Pisco clarity, lime snap, egg white silkiness',
    drinkingAtmosphere: 'Lima rooftop, cultural crossroads',
    musicVibe: 'Latin sophisticated, world fusion',
    nightlifeEnergy: 'Refined adventure, cultural magnetism',
    ingredients: ['2 oz Pisco', '1 oz Lime Juice', '0.5 oz Simple Syrup', 'Egg white', 'Angostura Bitters'],
    color: 'from-amber-800 to-yellow-700'
  },
  rusty_nail: {
    name: 'Rusty Nail',
    archetype: 'The Rough Diamond',
    emotionalProfile: 'Grittily authentic, defiantly masculine, dangerously honest',
    description: 'Whisky and Drambuie—honey meets rugged strength. You are raw authenticity with hidden sweetness, unpolished yet invaluable.',
    flavorProfile: 'Scotch boldness, honey complexity, dangerous allure',
    drinkingAtmosphere: 'Whisky bar, leather and attitude',
    musicVibe: 'Rock edge, Scottish grit',
    nightlifeEnergy: 'Raw honesty, unvarnished presence',
    ingredients: ['1.5 oz Scotch Whisky', '1 oz Drambuie'],
    color: 'from-amber-950 to-orange-900'
  },
  americano: {
    name: 'Americano',
    archetype: 'The Refined Minimalist',
    emotionalProfile: 'Elegant simplicity, unbothered brilliance, gracefully present',
    description: 'Campari, vermouth, soda—light, refreshing, sophisticated. You embody the art of doing less, achieving more, saying volumes with silence.',
    flavorProfile: 'Bitter aperitivo, herbal notes, refreshing lift',
    drinkingAtmosphere: 'Evening promenade, casual elegance',
    musicVibe: 'Italian sophistication, ambient presence',
    nightlifeEnergy: 'Serene confidence, understated appeal',
    ingredients: ['1 oz Campari', '1 oz Sweet Vermouth', '1 oz Soda Water', 'Orange slice'],
    color: 'from-orange-900 to-red-800'
  },
  caipirinha: {
    name: 'Caipirinha',
    archetype: 'The Tropical Libertine',
    emotionalProfile: 'Playfully carefree, infectiously joyful, rhythmically alive',
    description: 'Cachaça, lime, and sugar—Brazilian soul in a glass. You celebrate life with genuine warmth, infectious energy, and liberating joy.',
    flavorProfile: 'Cachaça intensity, lime brightness, grounded sweetness',
    drinkingAtmosphere: 'Brazilian night, rhythmic celebration',
    musicVibe: 'Samba vibrancy, tropical rhythms',
    nightlifeEnergy: 'Infectious joy, liberating spirit',
    ingredients: ['2 oz Cachaça', '1 Lime quartered', '0.5 oz Simple Syrup', 'Ice'],
    color: 'from-green-900 to-yellow-800'
  },
  bellini: {
    name: 'Bellini',
    archetype: 'The Artistic Romantic',
    emotionalProfile: 'Creatively expressive, softly romantic, artistically inclined',
    description: 'Prosecco and peach nectar—Venetian elegance embodied. You are artistic refinement, where beauty and celebration intertwine gracefully.',
    flavorProfile: 'Prosecco brightness, peach softness, delicate elegance',
    drinkingAtmosphere: 'Venetian café, sunset contemplation',
    musicVibe: 'Classical influence, romantic ambiance',
    nightlifeEnergy: 'Artistic grace, romantic elegance',
    ingredients: ['3 oz Prosecco', '1.5 oz Peach Nectar'],
    color: 'from-pink-800 to-orange-700'
  },
  corpse_reviver_2: {
    name: 'Corpse Reviver No. 2',
    archetype: 'The Daring Provocateur',
    emotionalProfile: 'Shockingly bold, darkly witty, dangerously complex',
    description: 'Five ingredients, infinite intrigue—absinthe, Cointreau, Lillet, gin, lemon. You are sophisticated complexity wrapped in dangerous humor.',
    flavorProfile: 'Herbal mystery, citrus brightness, layered complexity',
    drinkingAtmosphere: 'Late night speakeasy, dangerous conversation',
    musicVibe: 'Dark jazz, edgy sophistication',
    nightlifeEnergy: 'Dangerous wit, provocative depth',
    ingredients: ['0.5 oz Gin', '0.5 oz Cointreau', '0.5 oz Lillet Blanc', '0.5 oz Cognac', '0.25 oz Absinthe', 'Lemon twist'],
    color: 'from-yellow-900 to-orange-900'
  }
};

export default function BondCocktailQuiz() {
  const [language, setLanguage] = useState('en');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [resultCocktail, setResultCocktail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const questions = QUIZ_QUESTIONS[language];

  const handleAnswer = (archetypes) => {
    const newAnswers = [...answers, archetypes];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      computeResult(newAnswers);
    }
  };

  const computeResult = async (allAnswers) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1800));

    const cocktailScores = {};
    Object.keys(COCKTAILS).forEach(key => {
      cocktailScores[key] = 0;
    });

    allAnswers.forEach(archetypes => {
      archetypes.forEach(archetype => {
        if (cocktailScores[archetype] !== undefined) {
          cocktailScores[archetype] += 1;
        }
      });
    });

    const winner = Object.entries(cocktailScores).sort((a, b) => b[1] - a[1])[0][0];
    setResultCocktail(winner);
    setShowResult(true);
    setIsLoading(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResultCocktail(null);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 pt-8 px-6 flex justify-between items-center"
      >
        <div className="text-center flex-1">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 mb-2 tracking-tight">
            {language === 'en' ? 'SPIRITUS' : 'สปิริตุส'}
          </h1>
          <p className="text-blue-300/60 text-sm tracking-widest">
            {language === 'en' ? 'Psychological Cocktail Intelligence' : 'ระบบคำแนะนำค็อกเทลขั้นสูง'}
          </p>
        </div>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/60 transition-all text-sm font-mono"
        >
          {language === 'en' ? '🇹🇭 TH' : '🇬🇧 EN'}
        </button>
      </motion.header>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {!isLoading && !showResult && (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-300/60 text-sm font-mono">
                    {language === 'en' ? `QUESTION ${currentQuestion + 1} / ${questions.length}` : `คำถาม ${currentQuestion + 1} / ${questions.length}`}
                  </span>
                  <div className="w-48 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-light text-white mb-6 leading-tight">
                  {questions[currentQuestion].text}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleAnswer(option.archetypes)}
                      className="w-full group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/20 group-hover:to-purple-500/10 transition-all duration-300"></div>
                      <div className="relative px-6 py-4 border border-blue-500/20 rounded-lg group-hover:border-blue-500/60 transition-all duration-300 bg-slate-900/30 group-hover:bg-slate-900/60">
                        <span className="block text-left text-blue-200 group-hover:text-blue-100 transition-colors font-light">
                          {option.text}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <div className="relative w-24 h-24 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border-2 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-4 border-2 border-transparent border-b-blue-400 rounded-full"
                />
              </div>
              <p className="text-center text-blue-300/60 font-light tracking-widest text-sm">
                {language === 'en' ? 'ANALYZING YOUR PSYCHOLOGICAL PROFILE...' : 'กำลังวิเคราะห์โปรไฟล์ของคุณ...'}
              </p>
            </motion.div>
          )}

          {showResult && resultCocktail && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <ResultCard cocktail={COCKTAILS[resultCocktail]} language={language} onReset={resetQuiz} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResultCard({ cocktail, language, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br ${cocktail.color} p-12 backdrop-blur-xl`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10"
        >
          <p className="text-blue-300/60 text-sm font-mono tracking-widest mb-4">
            {language === 'en' ? 'YOUR COCKTAIL' : 'ค็อกเทลของคุณ'}
          </p>
          <h3 className="text-6xl font-light text-white mb-4 tracking-tight">
            {cocktail.name}
          </h3>
          <p className="text-2xl text-blue-200/80 font-light mb-8">
            "{cocktail.archetype}"
          </p>
          <p className="text-base text-blue-100/60 leading-relaxed max-w-2xl">
            {cocktail.description}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <DetailCard
          title={language === 'en' ? 'Emotional Profile' : 'โปรไฟล์อารมณ์'}
          content={cocktail.emotionalProfile}
        />
        <DetailCard
          title={language === 'en' ? 'Flavor Profile' : 'โปรไฟล์รสชาติ'}
          content={cocktail.flavorProfile}
        />
        <DetailCard
          title={language === 'en' ? 'Perfect Atmosphere' : 'บรรยากาศที่เหมาะสม'}
          content={cocktail.drinkingAtmosphere}
        />
        <DetailCard
          title={language === 'en' ? 'Music Vibe' : 'บรรยากาศดนตรี'}
          content={cocktail.musicVibe}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="border border-blue-500/20 rounded-lg p-6 bg-slate-900/40 backdrop-blur"
      >
        <p className="text-blue-300/60 text-sm font-mono tracking-widest mb-4">
          {language === 'en' ? 'RECIPE' : 'สูตร'}
        </p>
        <div className="space-y-3">
          {cocktail.ingredients.map((ing, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95 + idx * 0.1 }}
              className="flex items-center text-blue-100/70"
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-4"></span>
              {ing}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex gap-4"
      >
        <button
          onClick={onReset}
          className="flex-1 px-6 py-3 border border-blue-500 text-blue-300 rounded-lg hover:bg-blue-500/10 hover:border-blue-400 transition-all font-light tracking-wide"
        >
          {language === 'en' ? 'RETAKE QUIZ' : 'ทำแบบทดสอบใหม่'}
        </button>
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all font-light tracking-wide">
          {language === 'en' ? 'SHARE RESULT' : 'แชร์ผลลัพธ์'}
        </button>
      </motion.div>
    </motion.div>
  );
}

function DetailCard({ title, content }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="border border-blue-500/20 rounded-lg p-6 bg-slate-900/40 backdrop-blur hover:bg-slate-900/60 transition-colors"
    >
      <p className="text-blue-300/60 text-xs font-mono tracking-widest mb-3">
        {title}
      </p>
      <p className="text-blue-100/70 text-sm leading-relaxed font-light">
        {content}
      </p>
    </motion.div>
  );
}
