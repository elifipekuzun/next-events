import React from 'react';
import Link, { LinkProps } from 'next/link';

import styles from './button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  typeName?: string;
  onClick?: React.MouseEventHandler;
}

export const Button: React.FC<ButtonProps & LinkProps> = ({
  href,
  children,
  typeName,
  onClick,
}) => {
  return (
    <>
      {typeName === 'button' ? (
        <button onClick={onClick} type="submit" className={styles.btn}>
          {children}
        </button>
      ) : (
        <Link href={href}>
          <a className={styles.btn}>{children}</a>
        </Link>
      )}
    </>
  );
};
