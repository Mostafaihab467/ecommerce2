import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="outline-light" 
        id="language-dropdown"
        className="language-switcher-btn"
        style={{ 
          direction: isRTL ? 'rtl' : 'ltr',
          minWidth: '120px'
        }}
      >
        <span className="flag-icon">{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
        <span className="language-name ms-2">
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu 
        className="language-dropdown-menu"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        {languages.map((language) => (
          <Dropdown.Item
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
            style={{ 
              direction: language.code === 'ar' ? 'rtl' : 'ltr',
              textAlign: language.code === 'ar' ? 'right' : 'left'
            }}
          >
            <span className="flag-icon">{language.flag}</span>
            <span className="language-name ms-2">{language.name}</span>
            {currentLanguage === language.code && (
              <span className="check-icon ms-auto">✓</span>
            )}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher; 