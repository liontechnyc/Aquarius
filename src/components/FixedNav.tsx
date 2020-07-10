import React, { useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Navbar, { NavbarProps } from './Navbar';

export interface FixedNav extends NavbarProps {
  revealAt?: number;
}

const FixedNav = ({ revealAt, ...props }: FixedNav) => {
  const [isVisible, setVisibility] = useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y < prevPos.y;
      if (isShow !== isVisible) setVisibility(isShow);
    },
    [isVisible]
  );

  return isVisible ? (
    <div className="navigation--fixed">
      <Navbar {...props} />
    </div>
  ) : (
    <></>
  );
};

export default FixedNav;
