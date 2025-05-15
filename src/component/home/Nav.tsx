const navigationItems = [
  "ARTS & SCIENCE",
  "MARKETING",
  "BUSINESS",
  "PEOPLE & HR",
  "SALES & TRAINING",
  "OPERATION",
  "PRODUCT",
  "LEADERSHIP",
  "RISK & COMPLIANCE",
  "STUDIO",
];
const Nav = () => {
  return (
    <nav className="bg-gray-900 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-6 overflow-x-auto">
          {navigationItems.map((item) => (
            <button
              key={item}
              className="text-white text-sm font-medium whitespace-nowrap hover:text-pink-400 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
export default Nav;
