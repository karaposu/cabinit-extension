import { SupportedSites } from "../../../../configs/configs";
import { FelixTabs } from "../Router/NavigationSection-types";
import { useRouter } from "../Router/router";
import "./FelixSites.scss";

const FelixSites = () => {
  const { activeTab } = useRouter();

  if (activeTab !== FelixTabs.FelixSites) {
    return null;
  }

  return (
    <div>
      <div className="context">
        <h1 className="section-name">Supported Sites</h1>

        <p>Welcome to Cabinit-Enabled Websites Page!</p>
        <p>
          We gathered the most famous online shopping websites and we custom tailored Cabinit to work perfect with them.
        </p>
        <p>Whenever you are shopping in one of these sites Cabinit will automatically activate itself.</p>
      </div>

      <div className="sites">
        {SupportedSites.map((site) => {
          return (
            <a href={site.url} className="site" key={site.name}>
              <img className="logo" src={site.logo} alt={`site-${site.name}`} />
              <p>{site.name}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export { FelixSites };
