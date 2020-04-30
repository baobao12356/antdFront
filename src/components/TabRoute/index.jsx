import React from 'react';

import { StickyContainer, Sticky } from 'react-sticky';
import { Tabs } from 'antd';

import getPage from '@/config/pages';

import useLocalesModel from '@/models/useLocales';
import useTabRouteModel from '@/models/useTabRoute';


const { TabPane } = Tabs;

// tabpane 单独抽离出来，减少多余渲染。优化性能。
// 同时方便多页标签 和单页纯route自由切换。

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
);


const TabRoute = (props) => {
  const { activeKey, tabList, selectTab, closeTab } = useTabRouteModel();
  const { intl } = useLocalesModel();

  return (
    <StickyContainer>
      <Tabs
        // className={styles.tabs}
        activeKey={activeKey}
        renderTabBar={renderTabBar}
        onChange={(key) => selectTab(key)}
        // tabBarExtraContent={operations}
        tabBarStyle={{ background: '#fff' }}
        tabPosition="top"
        tabBarGutter={-1}
        hideAdd
        type="editable-card"
        onEdit={(targetKey) => closeTab(targetKey)}
      >
        {/* <Suspense fallback={<Pageloading tip="loading" />}> */}
        {tabList.map(item => (
          <TabPane tab={intl.get(item.name)} key={item.key}>
            {getPage(item.page)}
          </TabPane>
        ))}
        {/* </Suspense> */}
      </Tabs>
    </StickyContainer>
  )
}

export default TabRoute;
