import React from 'react';
import { UX } from '@liontechnyc/gemini';

export const wrapRootElement = ({ element, props }) => {
  return <UX.Provider ssr>{element}</UX.Provider>;
};
