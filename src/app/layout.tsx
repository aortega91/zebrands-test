import './globals.css';
import React from 'react';
import StoreProvider from '@/src/app/StoreProvider';
import NavBarContainer from '@/src/app/NavBarContainer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-600">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className="h-full"
      >
        <StoreProvider>
          <NavBarContainer>
            {children}
          </NavBarContainer>
        </StoreProvider>
      </body>
    </html>
  );
}
