import { createContext, useContext, useState } from 'react';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { WebSocketProvider } from './routes/WebSocketProvider';

const LanguageContext = createContext();
function App() {
  const [language, setLanguage] = useState('en');
  return (
    <div className="app h-full">
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <WebSocketProvider>
          <AppRoutes />
        </WebSocketProvider>

      </LanguageContext.Provider>

    </div>
  );
}
export const useLanguage = () => useContext(LanguageContext);
export default App;
