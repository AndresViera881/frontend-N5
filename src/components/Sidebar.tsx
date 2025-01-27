import React from "react";
import { Link } from "react-router-dom";

interface SidebarLink {
  label: string;
  path: string;
}

interface SidebarProps {
  links: SidebarLink[];
  title?: string;
  isCollapsible?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  links,
  title = "N5",
  isCollapsible = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div
      className={`${
        isCollapsible ? (isOpen ? "w-64" : "w-16") : "w-64"
      } bg-blue-600 text-white flex flex-col h-screen transition-all duration-300`}
    >
      {isCollapsible && (
        <button
          className="p-2 bg-blue-500 hover:bg-blue-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "--" : "--"}
        </button>
      )}

      {isOpen && (
        <div className="p-4 text-xl font-bold border-b border-blue-500">
          {title}
        </div>
      )}

      <nav className="flex-1 p-4">
        <ul>
          {links.map((link, index) => (
            <li key={index} className="mb-2">
              <Link
                to={link.path}
                className="block p-2 rounded hover:bg-blue-500 transition"
              >
                {isOpen ? link.label : link.label[0]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
