import NavButton from '../NavButton/NavButton';

export default function Header() {
  return (
    <header className="flex items-center gap-7 justify-between tracking-wider text-left bg-white ring-tint bg-opacity-40 w-full p-3 rounded-md">
      <h1 className="text-dark font-semibold font-cursive text-3xl  ">
        <span className="text-teal">friends</span>.
        <span className="text-orange">map</span>(🗺️)
      </h1>
      <NavButton />
    </header>
  );
}
