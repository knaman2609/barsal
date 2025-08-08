// Default voice ID (you can change this to any ElevenLabs voice ID)
const DEFAULT_VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Adam voice

/**
 * Converts text to speech using ElevenLabs API and plays the audio
 * @param {string} text - The text to convert to speech
 * @param {string} voiceId - The ElevenLabs voice ID (optional, uses default if not provided)
 * @returns {Promise<void>}
 */
export const speakText = async (text, voiceId = DEFAULT_VOICE_ID) => {
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
    });
    
    console.log('🎵 Playing ElevenLabs audio...');
    // Play the audio
    await audio.play();
    
  } catch (error) {
    console.error('❌ ElevenLabs TTS error:', error);
    console.log('🔄 Falling back to browser TTS');
    
    // Fallback to browser speech synthesis
    fallbackToSpeechSynthesis(text);
  }
};

/**
 * Fallback function using browser's built-in speech synthesis
 * @param {string} text - The text to speak
 */
const fallbackToSpeechSynthesis = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any previous speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
  }
};

/**
 * Speaks two texts sequentially: first the question, then the answer
 * @param {string} questionText - The question text to speak first
 * @param {string} answerText - The answer text to speak after the question
 * @param {string} voiceId - The ElevenLabs voice ID (optional, uses default if not provided)
 * @returns {Promise<void>}
 */
export const speakSequentially = async (questionText, answerText, voiceId = DEFAULT_VOICE_ID) => {
  try {
    console.log('🎯 Speaking sequentially:', { 
      question: questionText.substring(0, 30) + '...', 
      answer: answerText.substring(0, 30) + '...' 
    });

    // First, speak the question
    await speakText(questionText, voiceId);
    
    // Add a small pause between question and answer
    await new Promise(resolve => setTimeout(resolve, 800)); // 0.8 second pause
    
    // Then, speak the answer
    await speakText(answerText, voiceId);
    
    console.log('✅ Sequential speaking completed');
    
  } catch (error) {
    console.error('❌ Sequential speaking error:', error);
    
    // Fallback: just speak the answer if there's an issue
    fallbackToSpeechSynthesis(answerText);
  }
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