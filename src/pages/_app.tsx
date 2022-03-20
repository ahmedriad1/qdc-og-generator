import { AppProps } from "next/app";
import { SEO } from "../components/SEO";
import "@/styles/tailwind.css";
import "@/styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <SEO />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
