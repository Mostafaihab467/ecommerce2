# Internationalization (i18n) Implementation Guide

This guide provides step-by-step instructions to implement Arabic and English language support with RTL/LTR direction in your React e-commerce application.

## 📦 Required Packages

First, install the necessary packages:

```bash
npm install react-i18next i18next i18next-browser-languagedetector i18next-http-backend
```

## 🏗️ Project Structure

```
src/
├── i18n/
│   ├── index.ts                    # i18n configuration
│   └── locales/
│       ├── en/
│       │   └── translation.json    # English translations
│       └── ar/
│           └── translation.json    # Arabic translations
├── contexts/
│   └── LanguageContext.tsx         # Language context provider
├── components/
│   └── LanguageSwitcher.tsx        # Language switcher component
└── styles/
    └── rtl.scss                    # RTL-specific styles
```

## 🔧 Implementation Steps

### 1. Initialize i18n (src/i18n/index.ts)
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en/translation.json';
import arTranslations from './locales/ar/translation.json';

const resources = {
  en: { translation: enTranslations },
  ar: { translation: arTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

### 2. Language Context (src/contexts/LanguageContext.tsx)
```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  isRTL: boolean;
  changeLanguage: (language: string) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [isRTL, setIsRTL] = useState<boolean>(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    setIsRTL(savedLanguage === 'ar');
    i18n.changeLanguage(savedLanguage);
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
  }, [i18n]);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    setIsRTL(language === 'ar');
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, isRTL, changeLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

### 3. Language Switcher Component (src/components/LanguageSwitcher.tsx)
```typescript
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, isRTL } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="outline-light" 
        className="language-switcher-btn"
        style={{ direction: isRTL ? 'rtl' : 'ltr', minWidth: '120px' }}
      >
        <span className="flag-icon">
          {languages.find(lang => lang.code === currentLanguage)?.flag}
        </span>
        <span className="language-name ms-2">
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="language-dropdown-menu">
        {languages.map((language) => (
          <Dropdown.Item
            key={language.code}
            onClick={() => changeLanguage(language.code)}
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
```

### 4. Update App.tsx
```typescript
import { LanguageProvider } from './contexts/LanguageContext';
import './i18n';
import './styles/rtl.scss';

function App() {
  return (
    <LanguageProvider>
      {/* Your existing app content */}
    </LanguageProvider>
  );
}
```

### 5. Using Translations in Components
```typescript
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <h1>{t('common.welcome')}</h1>
      <p>{t('auth.signIn')}</p>
      <button>{t('common.submit')}</button>
    </div>
  );
}
```

## 🎨 RTL Styling (src/styles/rtl.scss)

The RTL styles are already created and include:
- Text alignment adjustments
- Margin and padding reversals
- Bootstrap component RTL support
- Custom component RTL adjustments
- Form and navigation RTL support

## 📝 Translation Keys

### Common Keys
- `common.loading` - Loading text
- `common.error` - Error messages
- `common.success` - Success messages
- `common.cancel` - Cancel button
- `common.save` - Save button
- `common.delete` - Delete button
- `common.close` - Close button
- `common.back` - Back button
- `common.search` - Search functionality

### Navigation Keys
- `navigation.home` - Home link
- `navigation.products` - Products link
- `navigation.cart` - Cart link
- `navigation.orders` - Orders link
- `navigation.profile` - Profile link
- `navigation.login` - Login link
- `navigation.register` - Register link
- `navigation.logout` - Logout link

### Authentication Keys
- `auth.signIn` - Sign in text
- `auth.signUp` - Sign up text
- `auth.email` - Email field
- `auth.password` - Password field
- `auth.confirmPassword` - Confirm password field
- `auth.name` - Name field
- `auth.forgotPassword` - Forgot password link
- `auth.rememberMe` - Remember me checkbox
- `auth.newCustomer` - New customer text
- `auth.alreadyHaveAccount` - Already have account text

### Product Keys
- `product.title` - Product title
- `product.name` - Product name
- `product.price` - Price label
- `product.description` - Description label
- `product.category` - Category label
- `product.brand` - Brand label
- `product.rating` - Rating label
- `product.reviews` - Reviews label
- `product.inStock` - In stock text
- `product.outOfStock` - Out of stock text
- `product.addToCart` - Add to cart button
- `product.quantity` - Quantity label
- `product.productImages` - Product images text
- `product.manageProduct` - Manage product text

### Cart Keys
- `cart.title` - Cart title
- `cart.empty` - Empty cart message
- `cart.items` - Items label
- `cart.subtotal` - Subtotal label
- `cart.tax` - Tax label
- `cart.shipping` - Shipping label
- `cart.total` - Total label
- `cart.checkout` - Checkout button
- `cart.continueShopping` - Continue shopping button

### Order Keys
- `order.title` - Order title
- `order.orders` - Orders label
- `order.orderId` - Order ID label
- `order.orderDate` - Order date label
- `order.orderStatus` - Order status label
- `order.orderTotal` - Order total label
- `order.myOrders` - My orders text
- `order.placeOrder` - Place order button

## 🔄 Component Updates Required

### 1. Header Component
- Add LanguageSwitcher component
- Replace hardcoded text with translation keys
- Add RTL support for navigation

### 2. LoginScreen Component
- Replace all hardcoded text with translation keys
- Add RTL support for form layout

### 3. ProductScreen Component
- Replace product information text with translation keys
- Add RTL support for product details

### 4. CartScreen Component
- Replace cart-related text with translation keys
- Add RTL support for cart layout

### 5. All Other Components
- Replace hardcoded text with appropriate translation keys
- Add RTL support where needed

## 🚀 Usage Examples

### Basic Translation
```typescript
const { t } = useTranslation();
return <h1>{t('common.welcome')}</h1>;
```

### With Variables
```typescript
const { t } = useTranslation();
return <p>{t('product.price', { price: '$99.99' })}</p>;
```

### RTL Support
```typescript
const { isRTL } = useLanguage();
return (
  <div style={{ direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}>
    {t('product.description')}
  </div>
);
```

### Language Switching
```typescript
const { changeLanguage, currentLanguage } = useLanguage();
return (
  <button onClick={() => changeLanguage(currentLanguage === 'en' ? 'ar' : 'en')}>
    Switch Language
  </button>
);
```

## 📱 Responsive Considerations

- Ensure RTL layouts work on mobile devices
- Test language switching on different screen sizes
- Verify text alignment and spacing in both directions

## 🧪 Testing

1. Test language switching functionality
2. Verify RTL layout displays correctly
3. Check that all text is properly translated
4. Test form inputs and validation messages
5. Verify navigation and breadcrumbs work in both languages

## 🔧 Troubleshooting

### Common Issues:
1. **Text not translating**: Check translation key exists in both language files
2. **RTL not working**: Ensure `document.documentElement.dir` is set correctly
3. **Styling issues**: Check RTL CSS is properly loaded
4. **Language not persisting**: Verify localStorage is working

### Debug Mode:
Enable debug mode in i18n config to see missing translations:
```typescript
i18n.init({
  debug: true,
  // ... other config
});
```

This implementation provides a complete internationalization solution for your e-commerce application with Arabic and English support, including RTL/LTR direction handling. 