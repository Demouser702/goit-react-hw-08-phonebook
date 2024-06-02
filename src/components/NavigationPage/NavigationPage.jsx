import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import UserMenu from '../UserMenu/UserMenu';
import { useSelector } from 'react-redux';

const NavigationPage = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <nav>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>
            <Link to="/">Home</Link>
          </Tab>
          <Tab>
            <Link to="/register">Register</Link>
          </Tab>
          <Tab>
            <Link to="/login">Login</Link>
          </Tab>
          <Tab>
            <Link to="/contacts">Contacts</Link>
          </Tab>
        </TabList>
      </Tabs>
      {isAuthenticated && <UserMenu />}
    </nav>
  );
};

export default NavigationPage;
