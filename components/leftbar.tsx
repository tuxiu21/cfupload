
import { CreateFileIcon, FileUploadIcon, FolderIcon, FolderUploadIcon, PlusIcon } from "@/components/icons";


export default function LeftBar() {
  return (
    <div className="sm:min-w-72 ">
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-primary max-sm:btn-square m-1"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="max-sm:hidden">New</span>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <button>
              <FolderIcon className="h-5 w-5" />
              Folder
            </button>
            <div className="divider my-0"></div>
          </li>
          <li>
            <button>
              <FileUploadIcon className="h-5 w-5" />
              File Upload
            </button>
            <button>
              <FolderUploadIcon className="h-5 w-5" />
              Folder Upload
            </button>
            <div className="divider  my-0"></div>
          </li>
          <li>
            <button>
              <CreateFileIcon className="h-5 w-5" />
              Create File
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
