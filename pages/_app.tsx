import '../styles/globals.scss';
import '../styles/index.css';
import 'antd/dist/antd.min.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
