import React, { ReactNode,useEffect, useState } from 'react';
import { ContainerStyled } from './styled';
import { TestElement } from '../../enums/TestElement';
import { gameConfig } from '../../config/game-config';

interface Props {
  children: ReactNode;
}
export const GameBox = ({ children }: Props) => {
  const [screenSize, setScreenSize] = useState({ width: gameConfig.container.maxWidth, height: gameConfig.container.maxHeight }),
        handleResize = () => {
          setScreenSize({ 
            width: window.innerWidth <= gameConfig.container.maxWidth ? window.innerWidth - 20 : gameConfig.container.maxWidth, 
            height: window.innerHeight <= gameConfig.container.maxHeight ? window.innerHeight - 20 : gameConfig.container.maxHeight 
          })
        }
  useEffect(() => {
    setScreenSize({ 
      width: window.innerWidth <= gameConfig.container.maxWidth ? window.innerWidth - 20 : gameConfig.container.maxWidth, 
      height: window.innerHeight <= gameConfig.container.maxHeight ? window.innerHeight - 20 : gameConfig.container.maxHeight 
    })

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return <ContainerStyled data-testid={TestElement.GAME_BOX} style={{width:screenSize.width,height:screenSize.height}}>{children}</ContainerStyled>;
};
