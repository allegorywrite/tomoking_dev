import { renderLayout } from '../layout/layout';

export const renderIntroduction = () => renderLayout(`
  <h1>自己紹介</h1>
  <p>こんにちは、私は技術ブロガーです。このブログでは、様々な技術トピックについて書いています。</p>
  <p>ブログを読むには、<a href="/blog/ja/">こちら</a>をクリックしてください。</p>
`);