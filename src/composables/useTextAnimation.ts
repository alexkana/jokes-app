import { ref } from 'vue';
import { ANIMATION } from '@constants';

export function useTextAnimation(typingSpeed = ANIMATION.TYPING_SPEED) {
  const displayedText = ref('');
  const isTyping = ref(false);

  const animateTyping = (text: string) => {
    if (!text) return;

    isTyping.value = true;
    displayedText.value = '';

    // Add a small delay before starting the typing animation
    setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          displayedText.value += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          // Add a slight delay before showing the action buttons
          setTimeout(() => {
            isTyping.value = false;
          }, 300);
        }
      }, typingSpeed);
    }, ANIMATION.FADE_DURATION); // Delay before typing starts
  };

  return {
    displayedText,
    isTyping,
    animateTyping,
  };
}
