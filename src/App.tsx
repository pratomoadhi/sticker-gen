import React, { useState, useMemo } from 'react';

// --- Type Definitions for TypeScript ---

// Define the structure for individual page content
interface PageContent {
  title: string;
  content: string;
}

// Define the structure for the entire pages object
type Pages = Record<string, PageContent>;

// Define the props for the NavLink component
interface NavLinkProps {
  pageName: string;
  currentPage: string;
  setPage: (pageName: string) => void;
}

// Define the content for the pages using the Pages type
const pages: Pages = {
  Home: {
    title: "Welcome to Our TypeScript SPA",
    content: "This Single Page Application now uses TypeScript for enhanced safety and maintainability. The client-side routing and traditional CSS styling remain intact, ready for Vercel deployment.",
  },
  About: {
    title: "About This Project",
    content: "This responsive application was built using a single React component file, internal CSS, and TypeScript, proving that type-safe SPAs can be clean and simple.",
  },
  Contact: {
    title: "Get in Touch",
    content: "You can find more information by contacting us at info@example.com. Notice how TypeScript helps ensure all data accessed is correctly structured.",
  },
};

// --- Component Definitions ---

// Helper component for the navigation links
const NavLink: React.FC<NavLinkProps> = ({ pageName, currentPage, setPage }) => (
  <button
    className={`nav-link ${pageName === currentPage ? 'active' : ''}`}
    onClick={() => setPage(pageName)}
    aria-current={pageName === currentPage ? 'page' : undefined}
    style={{
      padding: '0.75rem 1.25rem',
      fontSize: '1rem',
      fontWeight: pageName === currentPage ? '600' : '500',
      color: pageName === currentPage ? '#FFFFFF' : '#D1D5DB',
      backgroundColor: pageName === currentPage ? '#4F46E5' : 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '0.5rem',
      transition: 'all 0.2s',
      margin: '0 0.25rem',
    }}
  >
    {pageName}
  </button>
);

// Main Layout Component
const App: React.FC = () => {
  // Explicitly typing state variables
  const [currentPage, setCurrentPage] = useState<keyof Pages>('Home');
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to simulate loading for transitions

  // Simulate a page change delay for visual effect
  // Argument 'pageName' is typed as a key of Pages
  const handlePageChange = (pageName: keyof Pages) => {
    if (pageName === currentPage) return;
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(pageName);
      setIsLoading(false);
    }, 400); // 400ms transition delay
  };

  // Memoize the current page content with explicit return type PageContent
  const pageContent: PageContent = useMemo(() => {
    // TypeScript ensures pages[currentPage] exists and matches PageContent
    return pages[currentPage];
  }, [currentPage]);

  // Define traditional CSS styles as a string to be injected via <style>
  const cssStyles: string = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

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
      max-width: 1200px;
      margin: 0 auto;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
      border-radius: 1rem;
      overflow: hidden;
    }

    /* HEADER / NAVIGATION STYLES */
    .header {
      background-color: #1F2937; /* Dark Gray background */
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      flex-wrap: wrap; /* Allows wrapping on small screens */
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #F9FAFB;
      margin-right: 1rem;
      text-decoration: none;
    }

    .nav {
      display: flex;
      gap: 0.5rem;
    }

    /* MAIN CONTENT STYLES */
    .main-content {
      padding: 2rem;
      flex-grow: 1;
      position: relative;
      min-height: 300px; /* Ensure space during loading */
    }

    .page-card {
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    .page-card.exiting {
      opacity: 0;
      transform: translateY(-20px);
    }

    .page-card h1 {
      color: #111827;
      font-size: 2rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid #6366F1;
      padding-bottom: 0.5rem;
    }

    .page-card p {
      color: #4B5563;
      font-size: 1.125rem;
      line-height: 1.75;
    }

    /* BUTTON/LINK HOVER EFFECTS */
    .nav-link:hover {
      background-color: #6366F1 !important;
      color: #FFFFFF !important;
    }

    .nav-link.active {
      background-color: #4F46E5 !important;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.5);
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

    /* RESPONSIVENESS */
    @media (max-width: 600px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
      }
      .nav {
        margin-top: 1rem;
        width: 100%;
        justify-content: space-around;
      }
      .nav-link {
        flex: 1;
        text-align: center;
        margin: 0.25rem 0;
      }
      .main-content {
        padding: 1rem;
      }
      .page-card {
        padding: 1.5rem;
      }
    }
  `;

  return (
    <div className="app-container">
      {/* Injecting CSS into the head via a style tag, mimicking a linked stylesheet */}
      <style>{cssStyles}</style>

      <header className="header">
        <a href="#" className="logo">Vercel SPA Demo (TS)</a>
        <nav className="nav">
          {/* We must cast Object.keys result to the correct type array for TypeScript */}
          {(Object.keys(pages) as (keyof Pages)[]).map((pageName) => (
            <NavLink
              key={pageName}
              pageName={pageName}
              currentPage={currentPage}
              setPage={handlePageChange}
            />
          ))}
        </nav>
      </header>

      <main className="main-content">
        {/* Page Content */}
        <div className={`page-card ${isLoading ? 'exiting' : ''}`}>
          <h1>{pageContent.title}</h1>
          <p>{pageContent.content}</p>
        </div>
      </main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Single Page Application Demo | Hosted on Vercel
      </footer>
    </div>
  );
};

export default App;