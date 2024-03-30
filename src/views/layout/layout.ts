import { renderHeader } from './header';
import { renderFooter } from './footer';

export const renderLayout = (content: string) => `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Tech Blog</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        
        header {
            background-color: #333;
            color: white;
            padding: 1rem;
        }
        
        nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }
        
        nav ul li {
            display: inline;
            margin-right: 1rem;
        }
        
        nav ul li a {
            color: white;
            text-decoration: none;
        }
        
        main {
            padding: 1rem;
        }
        
        footer {
            background-color: #333;
            color: white;
            padding: 1rem;
            text-align: center;
        }
    </style>
  </head>
  <body>
    ${renderHeader()}
    <main>
      ${content}
    </main>
    ${renderFooter()}
  </body>
  </html>
`;