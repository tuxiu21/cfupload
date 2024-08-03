"use client";

import { SunsetIcon } from "@/components/irons";
import ThemeSwitch from "../components/theme-switch";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { IconSvgProps } from "@/types";

export default function Home() {
  const reactSvgComponentToMarkupString = (
    Component: React.FC,
    props: IconSvgProps
  ) =>
    `data:image/svg+xml,${encodeURIComponent(
      renderToStaticMarkup(createElement(Component, props))
    )}`;
  const url = reactSvgComponentToMarkupString(SunsetIcon, {
    size: 24,
    color: "white",
  });
  console.log(url);

  return (
    <div>
      <input
        type="radio"
        name="theme-dropdown"
        aria-label={`System ()`}
        value="system"
      />
    </div>
  );
}
