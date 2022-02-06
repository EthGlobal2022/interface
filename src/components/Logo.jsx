import React from "react";
import Link from "next/link";

function Logo() {
	return (
		<div style={{ display: "flex",color:"#fff",fontSize:"2rem",fontWeight:"600",justifySelf:"left" }}>
			<Link href="/">
                <a>Embark</a>
              </Link>
		</div>
	);
}

export default Logo;
