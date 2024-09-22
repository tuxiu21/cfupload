"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  AquaIcon,
  CinnamorollIcon,
  ComputerIcon,
  CupcakeIcon,
  CyberpunkIcon,
  DropdownIcon,
  MoonFilledIcon,
  SunFilledIcon,
  SunsetIcon,
  ValentineIcon,
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
                aqua: <AquaIcon className="h-6 w-6" color="4B4B4B"/>,
                cyberpunk: <CyberpunkIcon className="h-6 w-6"  color="#4B4B4B" />,
                sunset: <SunsetIcon className="h-6 w-6" color="#C0C0C0" />,
                valentine: <ValentineIcon className="h-6 w-6" color="#4B4B4B" />,
                cinnamoroll: <CinnamorollIcon className="h-6 w-6" color="#4B4B4B" />,
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
                      AquaIcon,
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
                aria-label="Aqua"
                value="aqua"
                onClick={() => themeProps.setTheme("aqua")}
                defaultChecked={themeProps.theme== "aqua"}
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
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                style={
                  {
                    "--url": `url(${reactSvgComponentToMarkupString(
                      ValentineIcon,
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
                aria-label="Valentine"
                value="valentine"
                onClick={() => themeProps.setTheme("valentine")}
                defaultChecked={themeProps.theme== "valentine"}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                style={
                  {
                    "--url": `url(${reactSvgComponentToMarkupString(
                      CinnamorollIcon,
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
                aria-label="Cinnamoroll"
                value="cinnamoroll"
                onClick={() => themeProps.setTheme("cinnamoroll")}
                defaultChecked={themeProps.theme== "cinnamoroll"}
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
