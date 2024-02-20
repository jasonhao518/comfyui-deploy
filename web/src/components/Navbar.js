const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2">
        <div className="grow">
          <input
            type="text"
            className="w-3/4 rounded-md bg-gray-700 px-4 py-2 text-gray-200"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center"></div>
      </nav>
    </>
  );
};

export default Navbar;
