import NavButton from '../NavButton/NavButton';

export default function Header({ hideButton = false }) {
  return (
    <header className="flex tracking-wider bg-white/40 ring-tint w-full p-2 rounded-md">
      <h1 className="text-dark font-semibold font-cursive text-4xl ring-tint p-2 rounded-md w-full text-center">
        <span className="text-teal">friends</span>.
        <span className="text-orange">map</span>(🗺️)
      </h1>
      {!hideButton && (
        <div className="flex justify-end w-full">
          <NavButton />
        </div>
      )}
    </header>
  );
}
