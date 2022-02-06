import React, { useState } from "react";
import { Layout } from "antd";
import Text from "antd/lib/typography/Text";

import Account from "./Account";
import Chains from "./Chains";
import TokenPrice from "./TokenPrice";
import NativeBalance from "./NativeBalance";
import MenuItems from "./MenuItems";
import Logo from "./Logo";

import "antd/dist/antd.css";
import "styles/style.module.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDisclosure } from "@chakra-ui/react";

const { Header, Footer } = Layout;

const styles = {
	content: {
		display: "flex",
		justifyContent: "center",
		fontFamily: "Manrope, sans-serif",
		color: "#fff",
		marginTop: "130px",
		padding: "10px",
	},
	header: {
		position: "fixed",
		zIndex: 1,
		width: "100%",
		background: "#0D0D0D",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		fontFamily: "Manrope, sans-serif",
		borderBottom: "2px solid rgba(220, 0, 255, 0.06)",
		padding: "0 10px",
		boxShadow: "0 1px 10px rgba(220, 0, 255, 0.1)",
	},
	headerRight: {
		display: "flex",
		gap: "20px",
		alignItems: "center",
		fontSize: "15px",
		fontWeight: "600",
		color: "#fff"
	},
	headerLeft: {
		display: "flex",
		gap: "20px",
		alignItems: "center",
		fontSize: "15px",
		fontWeight: "600",
		color: "#fff"
	},
};

function BaseLayout({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
		return (
		<Layout style={{ height: "100vh", overflow: "auto",background:"#0D0D0D" }}>
			<Header style={styles.header}>
			<div style={styles.headerLeft}>
				<button style={{background:"transparent",border:"none",outline:"none",display:"flex",background:"#492966",
		border: "2px solid #DC00FF",color:"#fff",fontSize:"1.5rem",padding:"0.25rem 0.75rem",borderRadius:"0.5rem"}} onClick={()=>{
					if(isOpen)
					onClose()
					else
					onOpen()}}>
				{isOpen?<MenuUnfoldOutlined  theme="dark"/>:<MenuFoldOutlined theme="dark"/>}
				</button>
				<Logo />
				</div>

				<div style={styles.headerRight}>
					<Chains />
					<TokenPrice
						address='0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
						chain='eth'
						image='https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/'
						size='40px'
					/>
					<NativeBalance />
					<Account />
				</div>
			</Header>
			<div style={styles.content}>
				<MenuItems isOpen={isOpen}  onClose={onClose}/>
				{children}
			</div>
		</Layout>
	);
}

export default BaseLayout;
