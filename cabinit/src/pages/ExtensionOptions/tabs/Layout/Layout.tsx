import { PropsWithChildren } from "react";
import { NavigationSections } from "../Router/NavigationSection";
import "./Layout.scss";

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className="main">
      <div className="content">
        <div className="header">
          <h1 className="app-title">Cabinit Chorome Extension</h1>
          <NavigationSections />
        </div>

        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export { Layout };
