import React from 'react';
import styled from 'styled-components';

// Styled components for the layout and visual elements
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f4f6f8; /* Light grey background */
`;

const Header = styled.header`
  background-color: #232a31; /* Dark header background */
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const HeaderUserActions = styled.div`
  font-size: 0.9rem;
`;

const HeaderLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-left: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = styled.aside`
  background-color: #2d3748; /* Dark sidebar background */
  color: #fff;
  width: 250px;
  padding: 1rem;
`;

const SidebarSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SidebarTitle = styled.h2`
  font-size: 1.1rem;
  margin-top: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #4a5568;
`;

const SidebarLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

const SidebarLink = styled.a`
  color: #cbd5e0;
  text-decoration: none;
  font-size: 0.95rem;

  &:hover {
    color: #fff;
  }
`;

const SidebarActions = styled.span`
  font-size: 0.8rem;
  color: #a0aec0;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem;
`;

const ContentSection = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(249, 248, 248);
`;

const ContentTitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

function AdminDashboard() {
  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarSection>
          <SidebarTitle>Site administration</SidebarTitle>
        </SidebarSection>

        <SidebarSection>
          <SidebarTitle>ACCOUNTS</SidebarTitle>
          <SidebarLinkContainer>
            <SidebarLink href="http://127.0.0.1:8000/admin/accounts/user_address/">User addresss</SidebarLink>
            
          </SidebarLinkContainer>
          <SidebarLinkContainer>
            <SidebarLink href="http://127.0.0.1:8000/admin/accounts/user/">Users</SidebarLink>
           
          </SidebarLinkContainer>
        </SidebarSection>

        <SidebarSection>
          <SidebarTitle>AUTHENTICATION AND AUTHORIZATION</SidebarTitle>
          <SidebarLinkContainer>
            <SidebarLink href="http://127.0.0.1:8000/admin/auth/group/">Groups</SidebarLink>
            
          </SidebarLinkContainer>
        </SidebarSection>

        <SidebarSection>
          <SidebarTitle>ORDERS</SidebarTitle>
          <SidebarLinkContainer>
            <SidebarLink href="#">Cart items</SidebarLink>
           
          </SidebarLinkContainer>
          <SidebarLinkContainer>
            <SidebarLink href="#">Orders</SidebarLink>
            
          </SidebarLinkContainer>
        </SidebarSection>

        <SidebarSection>
          <SidebarTitle>PRODUCTS</SidebarTitle>
          <SidebarLinkContainer>
            <SidebarLink href="#">Brand names</SidebarLink>
           
          </SidebarLinkContainer>
          <SidebarLinkContainer>
            <SidebarLink href="#">Categorys</SidebarLink>
            
          </SidebarLinkContainer>
          <SidebarLinkContainer>
            <SidebarLink href="#">Productss</SidebarLink>
            <SidebarLinkContainer>
            <SidebarLink href="http://127.0.0.1:8000/admin/accounts/user_address/add/">Add Change</SidebarLink>
            </SidebarLinkContainer>
          </SidebarLinkContainer>
        </SidebarSection>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>Wolfly Admin Panel</HeaderTitle>
         
        </Header>

       

        {/* You can add more content sections here */}
      </MainContent>
    </DashboardContainer>
  );
}

export default AdminDashboard;