import React from 'react';
import { Link } from 'gatsby';
import { Block, Content, Collection, Image } from '@liontechnyc/gemini';

export interface ServiceProps {
  header?: string;
  cta?: string;
  images: {
    [base: string]: {
      base: string;
      childImageSharp: {
        fixed?: { src: string };
        fluid: { src: string };
        original: { src: string };
      };
    };
  };
  staticImages: { [base: string]: { src: string } };
  content: {
    title: string;
    description: string;
    image: string;
    route: string;
  }[];
}

const Services = ({
  header,
  cta,
  images,
  staticImages,
  content,
}: ServiceProps) => {
  const serviceItems = content.map(
    ({
      title,
      description,
      image,
      route,
    }: {
      title: string;
      description: string;
      image: string;
      route: string;
    }) => {
      const imageContent = images[image];
      const staticImage = staticImages[image];
      return (
        <Block className="services__container">
          <Image
            src={imageContent.childImageSharp.fluid.src}
            defaultImg={staticImage.src}
            square={true}
            width={325}
          />
          <div>
            <Content
              containerClass="services__content"
              {...{ title, description }}
            />
            <Link className="services__cta" to={route}>
              {cta || 'Learn More'}
            </Link>
          </div>
        </Block>
      );
    }
  );
  return (
    <Collection
      direction="vertical"
      containerClass="services"
      align={{ content: 'center' }}
      containerStyle={{ padding: 16, paddingBottom: 128 }}
      items={[<h2>{header}</h2>, ...serviceItems]}
    />
  );
};

export default Services;
