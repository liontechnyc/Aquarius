import React from 'react';
import { UX } from '@liontechnyc/gemini';
import './styles/app.scss';
interface HtmlProps {
  htmlAttributes: object;
  headComponents: [];
  bodyAttributes: object;
  preBodyComponents: [];
  body: string;
  postBodyComponents: [];
}

const HTML = (props: HtmlProps) => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <script
          src="https://kit.fontawesome.com/5ff6aed892.js"
          crossOrigin="anonymous"
        />
        {props.headComponents}
        {/* Inject @artsy/fresnel styles in to the head */}
        <style>{UX.mediaStyle}</style>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;
