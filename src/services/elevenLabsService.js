// Default voice ID (you can change this to any ElevenLabs voice ID)
const DEFAULT_VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Adam voice

/**
 * Converts text to speech using ElevenLabs API and plays the audio
 * @param {string} text - The text to convert to speech
 * @param {string} voiceId - The ElevenLabs voice ID (optional, uses default if not provided)
 * @param {Function} onComplete - Optional callback function called when audio finishes playing
 * @returns {Promise<void>}
 */
export const speakText = async (text, voiceId = DEFAULT_VOICE_ID, onComplete = null) => {
  try {
    console.log('🔊 speakText called with:', { text: text.substring(0, 50) + '...', voiceId });
    console.log('🔑 API Key present:', !!import.meta.env.VITE_ELEVENLABS_API_KEY);
    
    // Check if API key is configured
    if (!import.meta.env.VITE_ELEVENLABS_API_KEY || import.meta.env.VITE_ELEVENLABS_API_KEY === 'your_elevenlabs_api_key_here') {
      console.warn('ElevenLabs API key not configured, falling back to browser TTS');
      fallbackToSpeechSynthesis(text);
      return;
    }

    console.log('🎯 Calling ElevenLabs API directly...');
    
    // Generate speech using ElevenLabs REST API directly
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
    }

    console.log('✅ ElevenLabs API response received');

    // Get audio data as blob
    const audioBlob = await response.blob();
    console.log('📦 Audio blob size:', audioBlob.size);
    
    // Create audio URL and play
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    // Clean up the URL after audio finishes playing
    audio.addEventListener('ended', () => {
      URL.revokeObjectURL(audioUrl);
      console.log('🔇 ElevenLabs audio finished playing');
      
      // Call the completion callback if provided
      if (onComplete && typeof onComplete === 'function') {
        console.log('📞 Calling completion callback');
        onComplete();
      }
    });
    
    console.log('🎵 Playing ElevenLabs audio...');
    // Play the audio
    await audio.play();
    
  } catch (error) {
    console.error('❌ ElevenLabs TTS error:', error);
    console.log('🔄 Falling back to browser TTS');
    
    // Fallback to browser speech synthesis
    fallbackToSpeechSynthesis(text, onComplete);
  }
};

/**
 * Fallback function using browser's built-in speech synthesis
 * @param {string} text - The text to speak
 * @param {Function} onComplete - Optional callback function called when speech finishes
 */
const fallbackToSpeechSynthesis = (text, onComplete = null) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-IN';
    
    // Add event listener for completion callback
    if (onComplete && typeof onComplete === 'function') {
      utterance.addEventListener('end', () => {
        console.log('📞 Fallback TTS completion callback');
        onComplete();
      });
    }
    
    window.speechSynthesis.speak(utterance);
  }
};

/**
 * Speaks two texts sequentially: first the question, then the answer
 * @param {string} questionText - The question text to speak first
 * @param {string} answerText - The answer text to speak after the question
 * @param {string} questionVoiceId - The ElevenLabs voice ID for the question (optional, uses default if not provided)
 * @param {string} answerVoiceId - The ElevenLabs voice ID for the answer (optional, uses default if not provided)
 * @param {Function} onAnswerStart - Optional callback called when answer audio begins
 * @param {Function} onComplete - Optional callback called when all audio finishes
 * @returns {Promise<void>}
 */
export const speakSequentially = async (questionText, answerText, questionVoiceId = DEFAULT_VOICE_ID, answerVoiceId = DEFAULT_VOICE_ID, onAnswerStart = null, onComplete = null) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('🎯 Speaking sequentially:', { 
        question: questionText.substring(0, 30) + '...', 
        answer: answerText.substring(0, 30) + '...',
        questionVoice: questionVoiceId,
        answerVoice: answerVoiceId
      });

      // First, speak the question with a completion callback
      speakText(questionText, questionVoiceId, () => {
        console.log('✅ Question audio completed');
        
        // Generate random pause between 2-4 seconds (2000-4000ms)
        const randomPause = Math.floor(Math.random() * 2000) + 2000;
        console.log(`⏸️ Random pause: ${randomPause}ms`);
        
        // Wait for the random pause, then speak the answer
        setTimeout(() => {
          console.log('🎙️ Starting answer audio...');
          
          // Start the answer audio first
          speakText(answerText, answerVoiceId, () => {
            console.log('✅ Sequential speaking completed');
            
            // Call the onComplete callback if provided
            if (onComplete && typeof onComplete === 'function') {
              console.log('📞 Calling onComplete callback');
              onComplete();
            }
            
            resolve();
          });
          
          // Show visual content after a 1-2 second delay from answer start
          if (onAnswerStart && typeof onAnswerStart === 'function') {
            const visualDelay = Math.floor(Math.random() * 1000) + 1000; // 1000-2000ms (1-2 seconds)
            console.log(`📺 Visual content will appear in ${visualDelay}ms`);
            
            setTimeout(() => {
              console.log('🎬 Triggering visual content display');
              onAnswerStart();
            }, visualDelay);
          }
          
        }, randomPause);
      });
      
    } catch (error) {
      console.error('❌ Sequential speaking error:', error);
      
      // Fallback: just speak the answer if there's an issue
      fallbackToSpeechSynthesis(answerText, () => resolve());
      reject(error);
    }
  });
};

/**
 * Stops any currently playing audio or speech
 */
export const stopSpeaking = () => {
  // Stop browser speech synthesis
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  
  // Note: For ElevenLabs audio, we'd need to track the audio element
  // to stop it. For now, this handles the fallback case.
};

// Export voice IDs for easy reference
export const VOICE_IDS = {
  ADAM: 'pNInz6obpgDQGcFmaJgB', // Male, American
  ANTONI: 'ErXwobaYiN019PkySvjV', // Male, American
  ARNOLD: 'VR6AewLTigWG4xSOukaG', // Male, American
  BELLA: 'EXAVITQu4vr4xnSDxMaL', // Female, American
  DOMI: 'AZnzlk1XvdvUeBnXmlld', // Female, American
  ELLI: 'MF3mGyEYCl7XYWbV9V6O', // Female, American
  JOSH: 'TxGEqnHWrfWFTfGW9XjX', // Male, American
  RACHEL: 'piTKgcLEGmPE4e6mEKli', // Female, American
  SAM: 'yoZ06aMxZJJ28mfd3POQ', // Male, American
};