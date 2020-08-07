import React, { Component, useState } from "react";
import { List } from "antd";
import "antd/dist/antd.css";
//import { redirectPage } from "@reach/router";
import { Menu, Dropdown, Layout } from "antd";
import { DownOutlined } from "@ant-design/icons";
import SearchBar from "./SearchBar";
import AddGroup from "./AddGroup";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default function SideBar(props) {
  let myPages = props.myPages;
  const [addGroup, setAddGroup] = React.useState(false);
  return (
    <>
      <Sider
        width={"25%"}
        style={{
          overflow: "auto",
          height: "100vh",

          position: "fixed",
          left: 0,
        }}
      >
        <SearchBar redirectPage={props.redirectPage} allPages={props.allPages} />
        <Menu
          theme="dark"
          selectedKeys={[props.selectedPageName === "" ? ".ho!!me." : props.selectedPageName]}
          defaultOpenKeys={["c", "g"]}
          mode="inline"
        >
          <Menu.Item
            key=".ho!!me."
            onClick={() => {
              props.redirectPage("/");
            }}
          >
            Home
          </Menu.Item>
          <SubMenu key="c" title="Classes">
            {myPages
              .filter((page) => {
                return page.pageType === "Class";
              })
              .map((page) => {
                return (
                  <Menu.Item
                    key={page.name}
                    onClick={() => {
                      props.redirectPage("/" + page.pageType.toLowerCase() + "/" + page.name);
                    }}
                  >
                    {page.name}
                  </Menu.Item>
                );
              })}
          </SubMenu>
          <SubMenu key="g" title="Groups">
            {myPages
              .filter((page) => {
                return page.pageType === "Group";
              })
              .map((page) => {
                return (
                  <Menu.Item
                    key={page.name}
                    onClick={() => {
                      props.redirectPage("/" + page.pageType.toLowerCase() + "/" + page.name);
                    }}
                  >
                    {page.name}
                  </Menu.Item>
                );
              })}
          </SubMenu>
          <Menu.Item
            key=".add!!group."
            onClick={() => {
              setAddGroup(true);
            }}
          >
            Create Group
          </Menu.Item>
          <Menu.Item
            key=".log!!out."
            onClick={() => {
              props.logout();
            }}
          >
            Logout
          </Menu.Item>

          {/* <Menu.Item
            key=".log!!state."
            onClick={() => {
              props.logState();
            }}
          >
            Log State
          </Menu.Item> */}
        </Menu>
      </Sider>
      <AddGroup visible={addGroup} setVisible={setAddGroup} redirectPage={props.redirectPage} />
      {/*
    <List>
        <List.Item onClick={() => {
                    
                    props.redirectPage("/")
                }}>
                    Home
        </List.Item>
                
    </List>
    
    <List 
        dataSource = {props.pageIds}
        renderItem = {(pageId) => {
            let page = props.allPages.filter((page) => {
                return page._id === pageId
            })[0]
            let name = page.name
            
            let isSelected = (name === props.selectedPageName)
            return <List.Item
                onClick={() => {
                    
                    props.redirectPage("/" + page.pageType.toLowerCase() + "/"+name)
                }}
            >
                {isSelected ? <b>{name}</b> : name}
            </List.Item>;
        }}
    />  */}
    </>
  );
}