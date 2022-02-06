import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Menu } from "antd";
import Link from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

function MenuItems({ isOpen, onClose }) {
  const { pathname } = useRouter();
  useEffect(() => {
    onClose();
  }, [pathname]);
  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay backdropBlur={"2px"} />
      <DrawerContent>
        {/* <DrawerHeader background={"#492966"} color="#fff" borderBottomWidth='1px'>Side Drawer</DrawerHeader> */}
        <DrawerBody padding={"0"} background={"#492966"}>
          <Menu
            theme="dark"
            mode="vertical"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "17px",
              fontWeight: "500",
              width: "100%",
              justifyContent: "center",
              background: "transparent",
            }}
            defaultSelectedKeys={[pathname]}
            // inlineCollapsed={open}
          >
            <Menu.Item key="/1inch">
              <Link href="/1inch">
                <a>🏦 Dex</a>
              </Link>
            </Menu.Item>

            <Menu.Item key="/erc20balance">
              <Link href="/erc20balance">
                <a>💰 Balances</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/erc20transfers">
              <Link href="/erc20transfers">
                <a>💸 Transfers</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/nftBalance">
              <Link href="/nftBalance">
                <a>🖼 NFTs</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/nftMinter">
              <Link href="/nftMinter">
                <a>🖼 Minter</a>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="/newsFeed">
              <Link href="/newsFeed">
                <a>📰 News</a>
              </Link>
            </Menu.Item> */}
          </Menu>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MenuItems;
