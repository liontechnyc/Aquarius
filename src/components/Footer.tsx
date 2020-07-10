import React from 'react';
import { Image, Block, Collection } from '@liontechnyc/gemini';
import { placeholder } from '../utils';

// ! TODO - Add social links in Collection items
export interface FooterProps {
  company: string;
  header: string;
  logo: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
}

const Footer = ({ company, header, logo, contact }: FooterProps) => {
  return (
    <Block className="footer" renderAs="footer" isBlockLike={true}>
      <h4 className="footer__contact--header">{header}</h4>
      <h3 className="footer__contact--phone">{contact.phone}</h3>
      <h4 className="footer__contact--address">{contact.address}</h4>
      <h3 className="footer__contact--email">{contact.email}</h3>

      <Block className="footer__credits">
        <Image
          src={logo || placeholder(100, 25)}
          defaultImg={logo || placeholder(100, 25)}
          width={64}
        />
        <p className="footer__credits--signature">
          <span style={{ float: 'left' }}>
            © {new Date().getFullYear()} <strong>{company}</strong> All Rights
            Reserved
          </span>
          <span style={{ float: 'right' }}>
            Made By &nbsp;
            <em>
              <a href="https://liontech.nyc">LionTechNYC</a>
            </em>
            &nbsp; with {`💕`}
          </span>
        </p>
        {/*
         <Collection
          containerClass="footer__credits--social"
          direction="horizontal"
          renderAs="ul"
          items={[<li />, <li />]}
        />
        */}
      </Block>
    </Block>
  );
};

export default Footer;
