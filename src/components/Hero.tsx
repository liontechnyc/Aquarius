import React from 'react';
import { Block } from '@liontechnyc/gemini';

export interface HeroProps {
  cta?: string;
  action?: string;
}

const Hero = ({ cta, action }: HeroProps) => {
  return (
    <Block className="hero" fluid={true} centered={true}>
      <div className="hero__content">
        <p className="hero__cta">{cta}</p>
        <a className="btn">{action}</a>
      </div>
    </Block>
  );
};

export default Hero;
