import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NotFound from "./404";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Layout>
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <>
          {router.route === "/404" ? (
            <NotFound />
          ) : (
            <Component {...pageProps} />
          )}
        </>
      )}
    </Layout>
  );
}
