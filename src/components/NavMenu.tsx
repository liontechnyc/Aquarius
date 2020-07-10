import React from 'react';
import styled from 'styled-components';
import { Collection, Modal } from '@liontechnyc/gemini';

export interface NavMenuProps {
  title: string;
  visible: boolean;
  menuItems: React.ReactElement[];
  setVisibility: (visible: boolean) => void;
}

const NavMenuTitle = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavMenu = ({
  title,
  visible,
  menuItems,
  setVisibility,
}: NavMenuProps) => {
  return (
    <Modal {...{ visible }}>
      <Collection
        fluid={true}
        direction="vertical"
        containerClass="navigation__menu"
        itemStyle={{
          padding: '1em',
          width: '100%',
        }}
        items={[
          <NavMenuTitle>
            <h4>{title}</h4>
            <button
              className="navigation__btn"
              onClick={() => setVisibility(false)}
            >
              <i className="fas fa-times" />
            </button>
          </NavMenuTitle>,
          ...menuItems,
        ]}
      />
    </Modal>
  );
};

export default NavMenu;
