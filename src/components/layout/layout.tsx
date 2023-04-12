import React, { PropsWithChildren } from 'react';
import { Header } from '../header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Header />
      {children}
    </div>
  );
}
