"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CupcakeIcon, CyberpunkIcon, DropdownIcon, MoonFilledIcon, SunFilledIcon, SunsetIcon } from "./irons";

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
          <div tabIndex={0} role="button" className="btn btn-ghost m-1">

            {{
            'light':(
              <SunFilledIcon size={24}/>
            ),
            'dark':(
              <MoonFilledIcon size={24}/>
            ),
            'cupcake':(
              <CupcakeIcon size={24}/>
            ),
            'cyberpunk':(
              // <CyberpunkIcon size={24} color="oklch(var(--p))"/>
              <CyberpunkIcon size={24} color=""/>
            ),
            'sunset':(
              <SunsetIcon size={24} color="white"/>
            ) 
           }[themeProps.resolvedTheme!]}
            <DropdownIcon size={12} color="gray"/>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
          >
            <li className="relative">
              {/* <SunsetIcon className="absolute right-4 top-1/2 translate-y-[-50%] z-50 " size={24}/> */}
              {/* <div> */}
              <input
                type="radio"
                name="theme-dropdown"
                className="btn btn-sm btn-block btn-ghost justify-start "
                aria-label={`System (${themeProps.systemTheme})`}
                value="system"
                onClick={() => themeProps.setTheme("system")}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cupcake"
                value="cupcake"
                onClick={() => themeProps.setTheme("cupcake")}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cyberpunk"
                value="cyberpunk"
                onClick={() => themeProps.setTheme("cyberpunk")}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Sunset"
                value="sunset"
                onClick={() => themeProps.setTheme("sunset")}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
