'use client';

import { SelectedFileType, viewFiles } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type SelectedFilesContextType = {
  selectedFiles: SelectedFileType[];
  setSelectedFiles: Dispatch<SetStateAction<SelectedFileType[]>>}
type ViewFilesContextType = {
  viewFiles: viewFiles;
  setViewFiles: Dispatch<SetStateAction<viewFiles>>
};

const SelectedFilesContext = createContext<SelectedFilesContextType | null>(null);
const ViewFilesContext = createContext<ViewFilesContextType | null>(null);

export default function FilesProvider({ children }: Readonly<{ children: React.ReactNode }>) {


  const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);
  const [viewFiles, setViewFiles] = useState<viewFiles>([]);

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