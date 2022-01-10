import React from 'react'
import { Menu, Button } from 'antd';
import 'antd/dist/antd.min.css';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CompassOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';


const { SubMenu } = Menu;

class SideBar extends React.Component {
  state = {
    collapsed: true,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className='sidebar-box' style={{ width: 200,  zIndex: 1,  position: 'relative'}}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{
          marginTop: 7,
          marginBottom: 7 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu 
          defaultSelectedKeys={[null]}
          defaultOpenKeys={[null]}
          mode='inline'
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<CompassOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          
        </Menu>
      </div>
    );
  }
}

export default SideBar
