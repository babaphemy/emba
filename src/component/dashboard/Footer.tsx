import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="mt-4 rounded-t-lg bg-white p-6 text-center">
        <p className="text-sm text-gray-600">
          Copyright (c) {new Date().getFullYear()}{" "}
          <strong className="font-semibold">Upper Courses</strong>. Powered by{" "}
          <Link
            href="https://reachai.online/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Everlasting Systems
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
