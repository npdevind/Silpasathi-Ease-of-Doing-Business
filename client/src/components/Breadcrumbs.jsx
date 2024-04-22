import React from "react";
import { useMatches } from "react-router";

const Breadcrumbs = () => {
  let matches = useMatches();
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));

  return (
    <>
      {crumbs.map((crumb, index) => (
        <span key={index}>{crumb}</span>
      ))}
    </>
  );
};

export default Breadcrumbs;
