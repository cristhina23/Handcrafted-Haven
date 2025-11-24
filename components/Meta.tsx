"use client";

import Head from "next/head";

interface MetaProps {
  title: string;
}

const Meta: React.FC<MetaProps> = ({ title }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
