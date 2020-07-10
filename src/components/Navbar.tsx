import React, { useState } from 'react';
import { Link } from 'gatsby';
import { UX, Collection, Image } from '@liontechnyc/gemini';
import NavMenu from './NavMenu';
import { placeholder } from '../utils';

export interface NavbarProps {
  logo?: string;
  title: string;
  routes: { title: string; route: string }[];
}

const Navbar = ({ logo, title, routes }: NavbarProps) => {
  const [navMenuVisibility, setNavMenuVisibility] = useState(false);
  const navItems = routes.map(({ title, route }) => (
    <Link
      activeClassName="active"
      onClick={
        navMenuVisibility ? () => setNavMenuVisibility(false) : undefined
      }
      to={route}
      children={title}
    />
  ));
  return (
    <>
      {/* Mobile navigation */}
      <UX.View at="sm">
        <Collection
          fluid={true}
          renderAs="nav"
          direction="horizontal"
          align={{ vertical: 'center', horizontal: 'space-between' }}
          containerClass="navigation"
          items={[
            <Link to="/">
              <Image
                defaultImg={logo || placeholder(100, 25)}
                height={50}
                width={50}
              />
            </Link>,
            <h4>{title}</h4>,
            <button
              className="navigation__btn"
              onClick={() => setNavMenuVisibility(true)}
            >
              <i className="fas fa-bars" />
            </button>,
          ]}
        />
        <NavMenu
          visible={navMenuVisibility}
          setVisibility={setNavMenuVisibility}
          menuItems={navItems}
          {...{ title }}
        />
      </UX.View>
      {/* Desktop navigation */}
      <UX.View greaterThanOrEqual="lg">
        <Collection
          fluid={true}
          renderAs="nav"
          direction="horizontal"
          align={{ vertical: 'center' }}
          containerClass="navigation"
          items={[
            <Link to="/">
              <Image
                src={logo || placeholder(100, 25)}
                defaultImg={logo || placeholder(100, 25)}
                height={50}
              />
            </Link>,
            ...navItems,
            <h1>{title}</h1>,
          ]}
        />
      </UX.View>
    </>
  );
};

export default Navbar;
