import React, { useState, useMemo } from 'react';

// --- Global Type Definitions ---

// Define the structure for a color palette
interface Palette {
  name: string;
  colors: string[];
}

// --- Global Constants (Fonts and Colors) ---

const FONT_OPTIONS: string[] = [
  'Kids Bus',
  'Biscuit Glitch',
  'Super Joyful'
];

const PALETTES: Palette[] = [
  { name: 'Sunset Serenity Shades', colors: ['#ffb7a1', '#ffb7a1', '#f0bc68', '#aab8bb', '#c4d7d1', '#5f9595'] },
  { name: 'Bubblegum Beach Sunset', colors: ['#ff5883', '#ff91ad', '#fec9d7', '#b9eee1', '#79d3be', '#39b89a'] },
  { name: 'Cotton Candy Skies', colors: ['#cdb4db', '#e6bedc', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff'] },
  { name: 'Velvet Touch Sunset', colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#ec8c74'] },
  { name: 'Electric Rainbow Burst', colors: ['#01befe', '#ffdd00', '#ff7d00', '#ff006d', '#adff02', '#8f00ff'] },
  { name: 'Summer Sunset Paradise', colors: ['#ef476f', '#f78c6b', '#ffd166', '#00FF00', '#118ab2', '#073b4c'] },
];

const STICKER_PAGE = {
  title: 'Custom Sticker Creator',
  content: 'Use the controls below to design your personalized text sticker.',
};

// --- Sub-Component: Sticker Generator ---

const StickerGeneratorComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>('STICKER');
  const [size, setSize] = useState<'small' | 'big'>('small');
  const [font, setFont] = useState<string>(FONT_OPTIONS[0]);
  const [palette, setPalette] = useState<Palette>(PALETTES[0]);
  const [stickerGenerated, setStickerGenerated] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const minLength = 3;
  const maxLength = 8;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setInputText(value);
    setStickerGenerated(false); // Reset sticker display on input change

    if (value.length < minLength || value.length > maxLength) {
      setError(`Text must be between ${minLength} and ${maxLength} characters.`);
    } else {
      setError('');
    }
  };

  const handleGenerate = () => {
    // Only generate if there is no error and the text is within limits
    if (!error && inputText.length >= minLength && inputText.length <= maxLength) {
      setStickerGenerated(true);
    }
  };

  const generatedSticker = useMemo(() => {
    if (!stickerGenerated || error || inputText.length === 0) {
      return null;
    }

    // Determine font size class based on selection for CSS control
    const sizeClass = size === 'big' ? 'sticker-big' : 'sticker-small';
    const text = inputText.toUpperCase();

    return (
      <div className="sticker-output-area">
        <p className="sticker-label">Generated Sticker Preview:</p>
        <div className="sticker-text-container" style={{ fontFamily: font }}>
          {text.split('').map((char, index) => {
            // Cycle through the selected palette colors
            const colorIndex = index % palette.colors.length;
            const charColor = palette.colors[colorIndex];

            return (
              <span
                key={index}
                // Apply the size class for responsive control
                className={`sticker-char ${sizeClass}`}
                style={{
                  color: charColor,
                  // textShadow is now managed entirely in CSS to handle the complex stacking
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    );
  }, [stickerGenerated, error, inputText, size, font, palette]);

  return (
    <div className="sticker-generator-content">
      {/* 1. Input Section */}
      <div className="input-group">
        <label htmlFor="sticker-text">Sticker Text (Min: 3, Max: 8 characters)</label>
        <input
          id="sticker-text"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          maxLength={maxLength}
          placeholder="Enter name (e.g., GEMINI)"
          className={`text-input ${error ? 'input-error' : ''}`}
        />
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="options-grid">
        {/* 2. Size Option */}
        <div className="input-group">
          <label>Text Size</label>
          <div className="radio-group">
            <input type="radio" id="size-small" name="size" checked={size === 'small'} onChange={() => setSize('small')} />
            <label htmlFor="size-small">Small</label>
            <input type="radio" id="size-big" name="size" checked={size === 'big'} onChange={() => setSize('big')} />
            <label htmlFor="size-big">Big</label>
          </div>
        </div>

        {/* 3. Font Option */}
        <div className="input-group">
          <label htmlFor="font-select">Font Selection</label>
          <select 
            id="font-select" 
            value={font} 
            onChange={(e) => setFont(e.target.value)}
            className="select-input"
          >
            {FONT_OPTIONS.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* 4. Color Palette Option */}
        <div className="input-group">
          <label htmlFor="palette-select">Color Palette</label>
          <select 
            id="palette-select" 
            value={palette.name} 
            onChange={(e) => setPalette(PALETTES.find(p => p.name === e.target.value) || PALETTES[0])}
            className="select-input"
          >
            {PALETTES.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. Generate Button */}
      <button
        className="generate-button"
        onClick={handleGenerate}
        disabled={!!error || inputText.length < minLength}
      >
        Generate Sticker
      </button>

      {/* 6. Sticker Display */}
      {generatedSticker}
    </div>
  );
};

// --- Main Layout Component ---

const App: React.FC = () => {
  // Define traditional CSS styles as a string to be injected via <style>
  const cssStyles: string = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

    /* BASE STYLES */
    body {
      margin: 0;
      font-family: 'Inter', sans-serif;
      background-color: #f3f4f6;
    }

    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      max-width: 800px; /* Reduced max-width for better focus */
      margin: 0 auto;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
      border-radius: 1rem;
      overflow: hidden;
    }

    /* HEADER STYLES */
    .header {
      background-color: #1F2937; /* Dark Gray background */
      padding: 1rem 2rem;
      display: flex;
      justify-content: center; /* Center the logo/title */
      align-items: center;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    }

    .logo {
      font-size: 1.8rem;
      font-weight: 700;
      color: #F9FAFB;
      text-decoration: none;
    }

    /* MAIN CONTENT STYLES */
    .main-content {
      padding: 2rem;
      flex-grow: 1;
      position: relative;
    }

    .page-card {
      background-color: #ffffff;
      padding: 0; 
      border-radius: 0.75rem;
    }

    .page-card h1 {
      color: #111827;
      font-size: 2rem;
      margin-top: 0;
      margin-bottom: 0.5rem;
      border-bottom: 2px solid #6366F1;
      padding-bottom: 0.5rem;
    }

    .page-card p {
      color: #4B5563;
      font-size: 1.125rem;
      line-height: 1.75;
      margin-bottom: 1.5rem;
    }
    
    /* --- STICKER GENERATOR STYLES --- */
    .sticker-generator-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .input-group label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .text-input, .select-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #D1D5DB;
      border-radius: 0.5rem;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.06);
      transition: border-color 0.2s;
    }
    
    .text-input:focus, .select-input:focus {
        outline: none;
        border-color: #6366F1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
    }
    
    .input-error {
        border-color: #EF4444 !important;
    }

    .error-message {
      color: #EF4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    
    .radio-group input[type="radio"] {
        margin-right: 0.5rem;
    }

    .radio-group label {
        display: inline-block;
        font-weight: 400;
        margin-right: 1.5rem;
        cursor: pointer;
    }

    .generate-button {
      padding: 1rem 2rem;
      background-color: #4F46E5;
      color: white;
      font-size: 1.125rem;
      font-weight: 700;
      border: none;
      border-radius: 0.75rem;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      box-shadow: 0 4px #4338CA;
    }
    
    .generate-button:hover:not(:disabled) {
        background-color: #6366F1;
    }
    
    .generate-button:active:not(:disabled) {
        transform: translateY(2px);
        box-shadow: 0 2px #4338CA;
    }
    
    .generate-button:disabled {
        background-color: #9CA3AF;
        cursor: not-allowed;
        box-shadow: none;
    }
    
    /* Sticker Output Area */
    .sticker-output-area {
        margin-top: 2rem;
        padding: 2rem 1rem;
        border: 2px dashed #9CA3AF;
        border-radius: 1rem;
        text-align: center;
        background-color: #e3e3e3ff;
        overflow-x: auto;
    }

    .sticker-label {
        font-size: 1rem;
        color: #6B7280;
        margin-bottom: 1rem;
    }

    .sticker-text-container {
        white-space: nowrap; 
        display: inline-block;
        line-height: 1;
    }

    .sticker-char {
        display: inline-block;
        font-weight: 900;
        letter-spacing: -1px; /* Slightly negative for snappier text */
        transition: color 0.3s, font-size 0.3s;
        
        /* --- NEW: Multi-Shadow Outline (4px thickness) --- */
        text-shadow:
          /* White Outline Shadows (4px thick outline) */
          4px 0 0 #FFFFFF, -4px 0 0 #FFFFFF,  /* Horizontal */
          0 4px 0 #FFFFFF, 0 -4px 0 #FFFFFF,  /* Vertical */
          3px 3px 0 #FFFFFF, -3px -3px 0 #FFFFFF, /* Diagonal */
          3px -3px 0 #FFFFFF, -3px 3px 0 #FFFFFF, /* Diagonal */
          
          /* The original Dark Drop Shadow (applied last for stacking) */
          8px 8px 4px rgba(0, 0, 0, 0.4); 
    }

    /* Desktop Sticker Sizes */
    .sticker-small {
        font-size: 40px; 
    }
    
    .sticker-big {
        font-size: 64px; 
    }


    /* FOOTER STYLES */
    .footer {
      padding: 1rem 2rem;
      text-align: center;
      color: #9CA3AF;
      font-size: 0.875rem;
      border-top: 1px solid #E5E7EB;
      background-color: #F9FAFB;
    }

    /* RESPONSIVENESS (Mobile First Adjustments) */
    @media (max-width: 600px) {
      .header {
        padding: 1rem;
      }
      .logo {
        font-size: 1.5rem;
      }
      .main-content {
        padding: 1rem;
      }
      
      /* Force inputs into a single column on mobile and reduce gap */
      .options-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      /* Mobile Sticker Sizes (Scaling down for small screens) */
      .sticker-small {
          font-size: 32px; 
      }
      
      .sticker-big {
          font-size: 48px; 
      }
      
      .sticker-output-area {
        padding: 1rem 0.5rem;
      }
    }
  `;

  return (
    <div className="app-container">
      {/* Injecting CSS into the head via a style tag, mimicking a linked stylesheet */}
      <style>{cssStyles}</style>

      <header className="header">
        <div className="logo">Sticker Generator App</div>
      </header>

      <main className="main-content">
        <div className="page-card">
          <h1>{STICKER_PAGE.title}</h1>
          <p>{STICKER_PAGE.content}</p>
          <StickerGeneratorComponent />
        </div>
      </main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Sticker Generator | Ready for Vercel
      </footer>
    </div>
  );
};

export default App;