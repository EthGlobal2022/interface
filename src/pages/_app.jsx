import React from "react";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";

import BaseLayout from "components/BaseLayout";
import { ChakraProvider } from '@chakra-ui/react'
import "styles/index.css";
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Manrope',
    body: 'Manrope',
  },
})

/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const isServerInfo = Boolean(APP_ID && SERVER_URL);

const Application = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Embark</title>
			</Head>
			< ChakraProvider theme={theme}> 
			<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
				<BaseLayout>
					<Component {...pageProps} isServerInfo={isServerInfo} />
				</BaseLayout>
			</MoralisProvider>
			</ChakraProvider>
		</>
	);
};

export default Application;
