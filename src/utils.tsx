/** module for utility functions  */
import { useEffect, useRef } from 'react';

/** Declarative setInterval */
export function useInterval(cb: () => void, delay?: number): void {
  const savedCallback: any = useRef();

  useEffect(
    function storeLatestCallback() {
      savedCallback.current = cb;
    },
    [cb]
  );

  useEffect(
    function setupIntervalTimer() {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },
    [delay]
  );
}

/** Convert GraphQL Relay Connection to native array-object pattern */
export function reduceGqlConnection(connection: { edges: [{ node: any }] }) {
  return connection.edges.map((edge) => edge.node);
}

/** Placeholder Image API factory */
export function placeholder(width: number, height: number): string {
  return `https://via.placeholder.com/${width}x${height}`;
}
