import { PropsWithChildren } from "react";
import { Header } from "../../../../common/components/Header/Header";
import "./Layout.scss";

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className="popup">
      <Header />
      <div className="content">{children}</div>
    </div>
  );
};

export { Layout };
