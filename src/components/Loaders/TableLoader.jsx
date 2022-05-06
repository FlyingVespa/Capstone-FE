import React from "react";
import ContentLoader from "react-content-loader";

const TableLoader = (props) => (
  <ContentLoader
    width={"100%"}
    height={400}
    viewBox="0  100 1200 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="66" y="259" rx="10" ry="10" width="85" height="19" />
    <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
    <rect x="401" y="259" rx="10" ry="10" width="85" height="19" />
    <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />
    <rect x="730" y="258" rx="10" ry="10" width="85" height="19" />
    <rect x="851" y="257" rx="10" ry="10" width="85" height="19" />

    <rect x="66" y="317" rx="10" ry="10" width="85" height="19" />
    <rect x="187" y="318" rx="10" ry="10" width="169" height="19" />
    <rect x="401" y="317" rx="10" ry="10" width="85" height="19" />
    <rect x="522" y="318" rx="10" ry="10" width="169" height="19" />
    <rect x="730" y="316" rx="10" ry="10" width="85" height="19" />
    <rect x="851" y="315" rx="10" ry="10" width="85" height="19" />

    <rect x="66" y="380" rx="10" ry="10" width="85" height="19" />
    <rect x="187" y="381" rx="10" ry="10" width="169" height="19" />
    <rect x="401" y="380" rx="10" ry="10" width="85" height="19" />
    <rect x="522" y="381" rx="10" ry="10" width="169" height="19" />
    <rect x="730" y="379" rx="10" ry="10" width="85" height="19" />
    <rect x="851" y="378" rx="10" ry="10" width="85" height="19" />


 
    <rect x="977" y="257" rx="10" ry="10" width="169" height="19" />
    <rect x="977" y="315" rx="10" ry="10" width="169" height="19" />
    <rect x="977" y="378" rx="10" ry="10" width="169" height="19" />
  </ContentLoader>
);

export default TableLoader;
