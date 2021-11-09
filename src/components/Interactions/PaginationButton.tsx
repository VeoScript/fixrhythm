import React from 'react'

interface TypeProps {
  followerCredential: any
  followers_followingPerPage: any
  totalFollowersFollowing: any
  paginate: any
}

const PaginationButton: React.FC<TypeProps> = ({ followerCredential, followers_followingPerPage, totalFollowersFollowing, paginate }) => {
  const [currentPage, setCurrentPage] = React.useState(0)

  const pageNumbers = []

  const int = Math.ceil(totalFollowersFollowing / followers_followingPerPage)

  if(int === 1) return null

  for(let i = 1; i <= int; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex items-center justify-center rounded-md overflow-hidden space-x-0.5">
      {pageNumbers.includes(currentPage - 1) && (
        <a
          type="button"
          className="cursor-pointer w-[5rem] px-1 py-2 text-xs text-center bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
          onClick={() => {
            setCurrentPage(currentPage - 1)
            paginate(currentPage - 1)
          }}
        >
          Previous
        </a>
      )}
      {pageNumbers.includes(currentPage + 1) && (
        <a
          type="button"
          className="cursor-pointer w-[5rem] px-1 py-2 text-xs text-center bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
          onClick={() => {
            setCurrentPage(currentPage + 1)
            paginate(currentPage + 1)
          }}
        >
          Next
        </a>
      )}
    </div>
  )
}

export default PaginationButton