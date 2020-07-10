import React from 'react';
import { UX, Collection, Content } from '@liontechnyc/gemini';
export interface AboutProps {
  header: string;
  content: {
    title: string;
    description: string;
  }[];
}

const About = ({ header, content }: AboutProps) => {
  const aboutItems = content.map((details) => (
    <Content containerClass="about__description" {...details} />
  ));
  return (
    <>
      {/* Mobile View */}
      <UX.View at="sm">
        <Collection
          fluid={true}
          direction="vertical"
          containerClass="about"
          containerStyle={{ padding: 40 }}
          itemStyle={{
            margin: '1em 0',
          }}
          items={[
            <Content
              title="Why Choose Us"
              alignTitle="center"
              containerClass="about__header"
              description={header}
            />,
            ...aboutItems,
          ]}
        />
      </UX.View>
      {/* Desktop View */}
      <UX.View greaterThanOrEqual="md">
        <Content
          title="Why Choose Us"
          alignTitle="center"
          containerClass="about__content"
          containerStyle={{
            display: 'flex',
            flexDirection: 'column',
            flex: ' 1 0',
          }}
          contentClass="about__content--container"
        >
          <p className="about__content--text">{header}</p>
          <Collection
            fluid={true}
            direction="vertical"
            containerClass="about"
            containerStyle={{ padding: 40 }}
            itemStyle={{
              margin: '1em 0',
            }}
            items={aboutItems}
          />
        </Content>
      </UX.View>
    </>
  );
};

export default About;
