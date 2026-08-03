import type {ReactNode} from 'react';

type CenteredLayoutProps = {
  children: ReactNode;
};

export const CenteredLayout = ({children}: CenteredLayoutProps) => {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        padding: 96,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};
