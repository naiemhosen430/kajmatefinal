import LeftBar from "./_components/shared/LeftBar";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="flex">
        <div className="lg:w-[15%]">
          <LeftBar />
        </div>
        <div className="lg:w-[85%] w-full scrollbar-hidden h-screen overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
