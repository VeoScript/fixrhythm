import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { RiChatDeleteLine } from 'react-icons/ri'

interface TypeProps {
  host: any
  comment: any
}

const DeleteComment: React.FC<TypeProps> = ({ host, comment }) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function onDeleteComment() {
    const commentId = comment.uuid
    const userId = host.uuid

    await fetch('/api/comments/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        commentId
      })
    })

    closeModal()
  }

  return (
    <>
      <div className="flex">
        <button onClick={openModal}>
          <RiChatDeleteLine className="w-4 h-4 ml-5 text-pantone-white text-opacity-30" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform text-pantone-white bg-pantone-darkblack bg-opacity-10 backdrop-blur-sm shadow-xl rounded-xl border-2 border-pantone-white border-opacity-10">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row items-center justify-between w-full px-5 py-3 bg-pantone-darkblack">
                    <h3 className="font-black text-xl text-pantone-red">FIXRHYTHM</h3>
                    <h3 className="font-light text-sm">Delete Comment</h3>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col items-center w-full p-3">
                      <p className="font-light text-sm text-pantone-white">
                        Delete your comment permanently?
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full px-3 py-2 bg-pantone-darkblack">
                      <button
                        className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm text-pantone-white bg-pantone-gray rounded-l-lg transition ease-linear duration-200 hover:bg-opacity-50"
                        type="button"
                        onClick={onDeleteComment}
                      >
                        Delete
                      </button>
                      <button
                        className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm text-pantone-white bg-pantone-gray rounded-r-lg border-l border-pantone-white border-opacity-10 transition ease-linear duration-200 hover:bg-opacity-50"
                        type="button"
                        onClick={() => closeModal()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default DeleteComment