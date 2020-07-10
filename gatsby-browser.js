import React from 'react';
import { UX } from '@liontechnyc/gemini';

export const wrapRootElement = ({ element, props }) => {
  return <UX.Provider>{element}</UX.Provider>;
};