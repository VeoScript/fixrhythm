import NavBar from '~/components/NavBar'
import LeftSideBar from '~/components/LeftSideBar'

export default function MainLayout({ children }) {
  return (
    <div className="flex justify-center w-full max-w-full h-screen overflow-hidden bg-pantone-black">
      <div className="relative flex flex-col w-full max-w-[2400px] h-full bg-pantone-black">
        <div className="fixed top-0 z-50 w-full">
          <NavBar />
        </div>
        <div className="flex flex-row w-full h-full">
          <LeftSideBar />
          <div className="flex flex-row w-full max-w-full h-full pt-16 text-white">
            { children }
          </div>
          <div className="flex flex-row w-full max-w-sm pt-16 text-white border-l border-white border-opacity-10 bg-[#202426]">
            {/* RightSideBar */}
          </div>
        </div>
      </div>
    </div>
  )
}