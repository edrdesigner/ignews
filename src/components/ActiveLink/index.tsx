import { ReactElement, cloneElement, useMemo } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
  exactHref?: boolean;
}

export function ActiveLink({
  children,
  activeClassName,
  exactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath, pathname } = useRouter();

  const isActive = useMemo(() => {
    if (exactHref && (asPath === rest.href || asPath === rest.as)) {
      return true;
    }

    if (
      !exactHref &&
      (asPath.startsWith(String(rest.href)) ||
        asPath.startsWith(String(rest.as)))
    ) {
      return true;
    }

    return false;
  }, [asPath, exactHref, rest.href, rest.as]);

  return (
    <Link {...rest}>
      {cloneElement(children, { className: isActive ? activeClassName : '' })}
    </Link>
  );
}
