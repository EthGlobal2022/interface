import React from "react";
import styles from "styles/Home.module.css";
function Index() {
	return <div className={styles.container}>
		<div className={styles.content}>

		<h1 style={{
		}}>Learn how the</h1>
		<h1 style={{
		}}><span style={{
			color:"#DC00FF"
		}}>Web3</span> works.</h1>

		<div className={styles.newsletterInput}>
			<input placeholder="vitalik@polygon.com" type={"text"}/>
			<button>Get Weekly Learns</button>
		</div>
		</div>
		<img className={styles.earth} src="./earth.jpg"/>
	</div>;
}

export default Index;
