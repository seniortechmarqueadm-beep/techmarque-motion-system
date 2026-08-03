import type {ReactNode} from 'react';
import {theme} from '../themes/defaultTheme';

type TitleProps = {
  children: ReactNode;
};

export const Title = ({children}: TitleProps) => {
  return (
    <h1
      style={{
        margin: 0,
        color: theme.colors.foreground,
        fontFamily: theme.typography.headingFontFamily,
        fontSize: 92,
        fontWeight: 700,
        letterSpacing: 0,
        lineHeight: 1.05,
        textAlign: 'center',
      }}
    >
      {children}
    </h1>
  );
};
