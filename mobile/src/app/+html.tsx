import { ScrollViewStyleReset, useServerDocumentContext } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function RootHtml({ children }: PropsWithChildren) {
  const { headNodes, bodyNodes, htmlAttributes, bodyAttributes } = useServerDocumentContext();
  return (
    <html {...htmlAttributes} lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F7F3E9" />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23F7F3E9'/%3E%3Cpath d='M18 16v32m28-32v32M18 32h28' stroke='%23A4422D' stroke-width='7'/%3E%3C/svg%3E"
        />
        <meta
          name="description"
          content="HispaGo: Plaza de España · Una historia para mirar despacio. Prototipo de una guía narrativa; material editorial en revisión."
        />
        <title>HispaGo · Sevilla, a tu paso</title>
        <ScrollViewStyleReset />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
