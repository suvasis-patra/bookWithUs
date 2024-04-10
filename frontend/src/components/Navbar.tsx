import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="w-full mx-auto bg-slate-100">
      <div className="flex justify-between items-center px-8 md:px-12 lg:px-16 py-6 border-b-[1px] border-neutral-300 max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold text-rose-500">
            Book<span className="text-black">With</span>Us
          </h1>
        </div>
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
