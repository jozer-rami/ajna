'use client';
import { useEffect, useState } from 'react';

const messages = [
  `You are not your story; you are the consciousness that witnesses it. What would happen if you stopped identifying with your past and simply were?`,
  `True freedom is not external... it is remembering that you are not what happens, but the one who observes. In which areas of your life do you still believe yourself to be a prisoner?`,
  `Peace does not arrive... it emerges when you stop resisting what is. What are you trying to change that is simply asking to be accepted?`,
  `Your essence is conscious silence. Everything else is fleeting noise. How often do you dwell in that silence that reveals you?`,
  `You are not here to become someone... but to remember who you are. How many masks have you accumulated in the attempt to “be better”?`,
  `You are eternal… but you’ve grown used to seeing from within time. What’s keeping you from experiencing now as the only truth?`,
  `Awakening is not about changing your life… it's about waking up from the character you thought you were. What identity are you willing to release to inhabit your truth?`,
  `Nothing is missing in you; you’ve just disconnected from your own light. What thoughts are still feeding the illusion of your insufficiency?`,
  `You are the space where everything occurs, not what occurs in that space. What part of you still believes you are the emotion you feel?`,
  `You don’t need to look for purpose… you are the purpose. What happens within you when you stop doing and simply are?`,
  `Consciousness is not something you find… it reveals itself when the illusory self surrenders. What part of you still believes it needs to achieve something to “arrive”?`,
  `Being is enough. From there, everything flows effortlessly. Where are you still striving to be what you already are?`,
  `You are formless love… temporarily manifested in form. What beliefs are keeping you from recognizing yourself as the love you seek?`,
  `Your light doesn’t need validation… just permission to express itself. What fear is keeping your true energy from shining?`,
  `Silence is not emptiness… it is fullness without words. Do you give yourself space to hear what only silence can reveal?`,
  `You don’t need to change anything… only awaken to what you already are. What part of you believes that only by being different will you deserve peace?`,
  `What is essential in you is untouchable… you’ve just forgotten it’s still there. When was the last time you inhabited your own divinity?`,
  `The soul doesn’t shout… it whispers from eternity. What do you need to silence in order to hear your truth?`,
  `All healing is a return home, not an improvement of the ego. Are you healing to love your truth… or to keep controlling?`,
  `You are the eternal witness of the fleeting. That never changes. What part of you still clings to the transient, believing it’s real?`,
  `When you align with your essence, life stops feeling like struggle. What aspects of your life flow… and which ones resist your true self?`,
  `Form may hurt, but you are not the form. How can you hold your humanity from a place of consciousness?`,
  `Your mind fears disappearing… your soul longs to expand. Which of those two voices are you choosing to follow today?`,
  `You don’t need protection when you remember you are one with the All. What defense are you willing to surrender to inhabit your truth?`,
  `Being presence is the greatest medicine. What would your day be like if you walked consciously knowing you are already whole?`,
  `Divinity is not far… it vibrates in every breath you take. Do you allow yourself to feel God within… or are you only looking outside?`,
  `Essence has no name, no form… it just is. Are you ready to stop defining yourself and simply experience?`,
  `True love is not something you seek… it reveals itself when you release fear. What fear can you offer today to the fire of your awareness?`,
  `Oneness is not achieved… it is remembered. Where do you still believe you are separate from life?`,
  `You are the eternal witness… the fire, the water, the sky, the center. What part of you needs to return to the Source in order to recognize itself?`,
];

export const RandomMessage = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, []);
  return <p className="text-center italic">{message}</p>;
};
