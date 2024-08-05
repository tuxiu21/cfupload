"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  ComputerIcon,
  CupcakeIcon,
  CyberpunkIcon,
  DropdownIcon,
  MoonFilledIcon,
  SunFilledIcon,
  SunsetIcon,
} from "./icons";

import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { IconSvgProps } from "@/types";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const themeProps = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {mounted && (
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost m-1">
            {
              {
                light: <SunFilledIcon className="h-6 w-6" color="4B4B4B"/>,
                dark: <MoonFilledIcon className="h-6 w-6" />,
                cupcake: <CupcakeIcon className="h-6 w-6" color="4B4B4B"/>,
                cyberpunk: <CyberpunkIcon className="h-6 w-6"  color="#4B4B4B" />,
                sunset: <SunsetIcon className="h-6 w-6" color="#C0C0C0" />,
              }[themeProps.resolvedTheme!]
            }
            <DropdownIcon className="h-2 w-2" color="gray" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
          >
            <li className="relative">
              <input
                type="radio"
                name="theme-dropdown"
                style={
                  {
                    "--url": `url(${reactSvgComponentToMarkupString(
                      ComputerIcon,
                      {
                        size: 24,
                        color: "#969696",
                        xmlns: "http://www.w3.org/2000/svg",
                      }
                    )})`,
                  } as React.CSSProperties
                }
                className="btn btn-sm btn-block btn-ghost justify-start 
                after:bg-[image:var(--url)] after:bg-no-repeat after:bg-right after:w-full 
                after:h-full
                after:flex after:flex-row after:items-center after:justify-start
                "
                aria-label={`System (${themeProps.systemTheme})`}
                value="system"
                onClick={() => themeProps.setTheme("system")}
                defaultChecked={themeProps.theme== "system"}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                style={
                  {
                    "--url": `url(${reactSvgComponentToMarkupString(
                      CupcakeIcon,
                      {
                        size: 24,
                        color: "#969696",
                        xmlns: "http://www.w3.org/2000/svg",
                      }
                    )})`,
                  } as React.CSSProperties
                }
                className="btn btn-sm btn-block btn-ghost justify-start 
                after:bg-[image:var(--url)] after:bg-no-repeat after:bg-right after:w-full 
                after:h-full
                after:flex after:flex-row after:items-center after:justify-start
                "
                aria-label="Cupcake"
                value="cupcake"
                onClick={() => themeProps.setTheme("cupcake")}
                defaultChecked={themeProps.theme== "cupcake"}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                style={
                  {
                    "--url": `url(${reactSvgComponentToMarkupString(
                      CyberpunkIcon,
                      {
                        size: 24,
                        color: "#969696",
                        xmlns: "http://www.w3.org/2000/svg",
                      }
                    )})`,
                  } as React.CSSProperties
                }
                className="btn btn-sm btn-block btn-ghost justify-start 
                after:bg-[image:var(--url)] after:bg-no-repeat after:bg-right after:w-full 
                after:h-full
                after:flex after:flex-row after:items-center after:justify-start
                "
                aria-label="Cyberpunk"
                value="cyberpunk"
                onClick={() => themeProps.setTheme("cyberpunk")}
                defaultChecked={themeProps.theme== "cyberpunk"}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                style={
                  {
                    "--url": `url(${reactSvgComponentToMarkupString(
                      SunsetIcon,
                      {
                        size: 24,
                        color: "#969696",
                        xmlns: "http://www.w3.org/2000/svg",
                      }
                    )})`,
                  } as React.CSSProperties
                }
                className="btn btn-sm btn-block btn-ghost justify-start 
                                after:bg-[image:var(--url)] after:bg-no-repeat after:bg-right after:w-full 
                after:h-full
                after:flex after:flex-row after:items-center after:justify-start
                "
                aria-label="Sunset"
                value="sunset"
                onClick={() => themeProps.setTheme("sunset")}
                defaultChecked={themeProps.theme== "sunset"}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
const reactSvgComponentToMarkupString = (
  Component: React.FC,
  props: IconSvgProps
) =>
  `data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(createElement(Component, props))
  )}`;
