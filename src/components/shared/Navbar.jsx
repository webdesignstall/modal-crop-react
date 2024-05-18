import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-300 py-4 flex justify-center items-center">
      <ul className="flex justify-center items-center gap-5">
        <li>
          <Link
            className="text-lg font-semibold bg-blue-600 text-white px-4 py-1 rounded-md"
            href={"/crop"}
          >
            Crop Image
          </Link>
        </li>
        <li>
          <Link
            className="text-lg font-semibold bg-blue-600 text-white px-4 py-1 rounded-md"
            href={"/form"}
          >
            Multi Steps Form
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
