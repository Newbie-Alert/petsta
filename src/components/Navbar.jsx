import React from 'react';
import styled from 'styled-components';

function Navbar() {
  return (
    <NavContainer>
      <div>Navbar</div>
    </NavContainer>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  background-color: yellow;
`;
