import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-2xl font-bold text-pink-500">
              upper courses
            </span>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Course Library
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About Us
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
            </div>
          </div>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">
            Request Demo
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
