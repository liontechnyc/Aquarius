import React from 'react';
import { Image, Block, Collection, UX } from '@liontechnyc/gemini';
import keys from 'lodash/keys';
import { placeholder } from '../utils';

const mapSocialIcons: { [media: string]: string } = {
  facebook: 'fab fa-facebook-square',
  instagram: 'fab fa-instagram',
  linkedin: 'fab fa-linkedin',
  github: 'fab fa-github',
  google: 'fab fa-google-plus-g',
};

export interface FooterProps {
  company: string;
  header: string;
  logo: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  social: {
    [media: string]: string;
  };
}

const Footer = ({ company, header, logo, contact, social }: FooterProps) => {
  const socialContent = keys(social).map((mediaChannel, id) => (
    <li key={id}>
      <a href={social[mediaChannel]}>
        <i className={mapSocialIcons[mediaChannel]} />
      </a>
    </li>
  ));
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
          <span>
            © {new Date().getFullYear()} <strong>{company}</strong> All Rights
            Reserved
          </span>
          <span>
            <Collection
              containerClass="footer__credits--social"
              direction="horizontal"
              renderAs="ul"
              align={{ horizontal: 'space-between', vertical: 'center' }}
              items={socialContent}
              fluid={true}
            />
          </span>
          <span>
            Made By &nbsp;
            <em>
              <a href="https://liontech.nyc">LionTechNYC</a>
            </em>
            &nbsp; with {`💕`}
          </span>
        </p>
      </Block>
    </Block>
  );
};

export default Footer;
