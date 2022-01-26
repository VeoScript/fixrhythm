import React from 'react'

interface TypeProps {
  followers_followingPerPage: any
  totalFollowersFollowing: any
  paginate: any
}

const PaginationButton: React.FC<TypeProps> = ({ followers_followingPerPage, totalFollowersFollowing, paginate }) => {

  const [currentPage, setCurrentPage] = React.useState(0)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [])

  const pageNumbers = []

  const int = Math.ceil(totalFollowersFollowing / followers_followingPerPage)

  if(int === 1) return null

  for(let i = 1; i <= int; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex flex-row items-center justify-center w-full max-w-full px-5 py-2 border-t border-pantone-white border-opacity-5">  
      <div className="flex items-center justify-center rounded-md overflow-hidden space-x-0.5">
        {pageNumbers.includes(currentPage - 1) && (
          <button
            type="button"
            className="cursor-pointer w-[5rem] px-1 py-2 text-xs text-center bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
            onClick={() => {
              setCurrentPage(currentPage - 1)
              paginate(currentPage - 1)
            }}
          >
            Previous
          </button>
        )}
        {pageNumbers.includes(currentPage + 1) && (
          <button
            type="button"
            className="cursor-pointer w-[5rem] px-1 py-2 text-xs text-center bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
            onClick={() => {
              setCurrentPage(currentPage + 1)
              paginate(currentPage + 1)
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default PaginationButton