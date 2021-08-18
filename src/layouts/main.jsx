import NavBar from "~/components/NavBar"

export default function MainLayout({ children }) {
  return (
    <div className="relative flex flex-col w-full h-screen overflow-hidden bg-pantone-black">
      <div className="fixed top-0 z-50 w-full">
        <NavBar />
      </div>
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-row w-full max-w-sm pt-20 text-white border-r border-white border-opacity-10">
          <span>Left</span>
        </div>
        <div className="flex flex-row w-full max-w-full h-full overflow-y-auto pt-20 text-white">
          { children }
        </div>
        <div className="flex flex-row w-full max-w-sm pt-20 text-white border-l border-white border-opacity-10">
          <span>Right</span>
        </div>
      </div>
    </div>
  )
}