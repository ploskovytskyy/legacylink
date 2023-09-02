import { type Locale } from "~/lib/translations";

declare global {
  type PageProps<P = object> = {
    params: {
      locale: Locale;
    } & P;
  };

  type Page<P = object> = (
    props: PageProps<P>
  ) => JSX.Element | Promise<JSX.Element>;

  type PropsWithChildren<P = unknown> = P & { children?: ReactNode };
  type PropsWithClassName<P = unknown> = P & { className?: string };
  type PropsWithChildrenAndClassName<P = unknown> = PropsWithClassName<P> &
    PropsWithChildren<P>;

  type Network = {
    id: string;
    name: string;
    disabled: boolean;
  };
}
