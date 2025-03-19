export function Logo() {
  return (
    <span className="relative flex w-44 items-center justify-center p-5 px-28">
      <p className="font-[Josefin Sans] text-neutral text-5xl font-bold">Fiszki</p>
      <div className="full-parent">
        <div className="bg-secondary z-background absolute right-0 top-0 h-3/5 w-[90%] rounded-xl" />
        <div className="bg-secondary z-background absolute bottom-0 left-0 h-3/5 w-[90%] rounded-xl" />
      </div>
    </span>
  );
}
