'use client';

import { SelectedFileType, View_Files } from "@/types";
import { createContext, useContext, useState } from "react";

type SelectedFilesContextType = {
  selectedFiles: SelectedFileType[];
  setSelectedFiles: (files: SelectedFileType[]) => void;
};
type ViewFilesContextType = {
  viewFiles: View_Files;
  setViewFiles: (files: View_Files) => void;
};

const SelectedFilesContext = createContext<SelectedFilesContextType | null>(null);
const ViewFilesContext = createContext<ViewFilesContextType | null>(null);

export default function FilesProvider({ children }: Readonly<{ children: React.ReactNode }>) {


  const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);
  const [viewFiles, setViewFiles] = useState<View_Files>([]);

  return (
    <SelectedFilesContext.Provider value={{selectedFiles,setSelectedFiles}}>
      <ViewFilesContext.Provider value={{viewFiles,setViewFiles}}>
        {children}
      </ViewFilesContext.Provider>
    </SelectedFilesContext.Provider>
  );
}

export const useSelectedFiles = () => {
  const context = useContext(SelectedFilesContext);
  if (!context) {
    throw new Error("useFiles must be used within a FilesProvider");
  }
  return context;
}
export const useViewFiles = () => {
  const context = useContext(ViewFilesContext);
  if (!context) {
    throw new Error("useFiles must be used within a FilesProvider");
  }
  return context;
}