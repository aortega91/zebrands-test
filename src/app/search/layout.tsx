import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div>CUSTOM LAYOUT</div>
      {children}
    </main>
  );
}
