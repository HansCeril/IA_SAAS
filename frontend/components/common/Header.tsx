import Link from "next/link";
import { FileText } from "lucide-react";

const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <Link href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            ResumeAI
          </span>
        </Link>
      </div>
      <div>
        <Link href="/#pricing"> Princing</Link>
      </div>
      <div>
        <Link href="/#signin"> SignIn</Link>
      </div>
    </nav>
  );
};

export default Header;
