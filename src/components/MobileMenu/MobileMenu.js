/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { WEIGHTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import { keyframes } from 'styled-components';

const animationDuration = 0.25;
let timeout;
const MobileMenu = ({ isOpen, onDismiss }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if(timeout && isOpen) {
      clearTimeout(timeout);
    }
  }, [isOpen])

  const handleDismiss = (event) => {
    setIsDismissed(true);

    timeout = setTimeout(() => {
      onDismiss(event);
      setIsDismissed(false);
    }, animationDuration * 1000);
  }

  return (
    <Overlay isOpen={isOpen} $isDismissed={isDismissed} onDismiss={handleDismiss}>
      <Content $isDismissed={isDismissed} aria-label="Menu">
        <ContentInner>
        <CloseButton onClick={handleDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
        <Footer>
          <SubLink href="/terms">Terms and Conditions</SubLink>
          <SubLink href="/privacy">Privacy Policy</SubLink>
          <SubLink href="/contact">Contact Us</SubLink>
        </Footer>
        </ContentInner>
      </Content>
    </Overlay>
  );
};

const FadeIn = keyframes`
  from {
    background: hsl(220deg 5% 40% / 0);
  }

  to {
    background: hsl(220deg 5% 40% / 0.8);
  }
`

const SlideIn = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ $isDismissed }) => $isDismissed ? 'hsl(220deg 5% 40% / 0)' : 'var(--color-backdrop)'};
  display: flex;
  justify-content: flex-end;
  animation: ${FadeIn} ${animationDuration}s;
  transition: background ${animationDuration}s;
`;

const Content = styled(DialogContent)`
  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  animation: ${SlideIn} ${animationDuration}s;
  transform: ${({ $isDismissed }) => $isDismissed ? 'translateX(100%)' : 'translateX(0)'};
  transition: transform ${animationDuration}s;
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`;

const FadeIn2 = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const ContentInner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${FadeIn2} ${animationDuration}s backwards ease-in;
  animation-delay: 0.18s;
`

export default MobileMenu;
