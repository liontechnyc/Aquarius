import React, { useLayoutEffect } from 'react';

export interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  useLayoutEffect(() => {
    typeof window !== 'undefined' && window.scrollTo(0, 0);
  });
  return <>{children}</>;
};

export default Page;
