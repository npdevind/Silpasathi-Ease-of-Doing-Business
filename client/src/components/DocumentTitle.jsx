import { useEffect } from "react";

const DocumentTitle = ({ title }) => {
  useEffect(() => {
    document.title =
      title +
      ` | Silpasathi || State Online Single Window Services || Ease of Doing Business || Government of West Bengal`;
    return () => {
      //document.title = title;
    };
  }, [title]);

  return null; // This component doesn't render anything in the DOM
};

export default DocumentTitle;
