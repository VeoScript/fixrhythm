import React from 'react'
import Router from 'next/router'

interface TypeProps {
  host: any
  composition: any
  closeModal: any
  postUrl?: any
}

const DeleteForm: React.FC<TypeProps> = ({ host, composition, closeModal, postUrl }) => {

  async function onDelete() {
    const compositionId = composition.uuid
    const userId = host.uuid

    await fetch('/api/compositions/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        compositionId
      })
    })

    closeModal()

    // check if the post will deleted the post display page will redirect to home page (kay deleted naman wala na syay madisplay sa DisplayPostAndComment na component)
    if(postUrl === composition.uuid) {
      Router.replace('/')
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center w-full p-8">
        <p className="font-medium dark:font-light text-sm text-pantone-white">
          Delete <span className="font-bold">{ composition.title }</span> permanently?
        </p>
      </div>
      <div className="flex flex-row items-center justify-center w-full px-3 py-2 bg-pantone-white dark:bg-pantone-darkblack">
        <button
          className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm rounded-l-lg bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm rounded-r-lg border-l border-pantone-white border-opacity-10 bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
          type="button"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteForm