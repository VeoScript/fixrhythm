import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ComposeForm from './ComposeForm'

interface TypeProps {
  host: any
}

const ComposeCard: React.FC<TypeProps> = ({ host }) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        className="flex justify-center w-full px-5 py-2 text-pantone-white bg-pantone-red rounded-lg transition ease-linear duration-200 hover:bg-opacity-80"
        type="button"
        onClick={openModal}
      >
        <span className="font-light text-xs">Compose</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
          onClose={closeModal}
        >
          <div className="min-h-screen px-0 md:px-4 text-center">
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
              <div className="inline-block w-full max-w-full md:max-w-4xl h-screen md:h-full overflow-hidden text-left align-middle transition-all transform text-pantone-darkblack dark:text-pantone-white bg-pantone-white dark:bg-pantone-black bg-opacity-10 dark:bg-opacity-10 backdrop-blur-sm shadow-xl rounded-none md:rounded-xl border-0 md:border-2 border-pantone-white border-opacity-10">
                <div className="flex flex-col w-full h-full overflow-y-auto">
                  <div className="flex flex-row items-center justify-between w-full px-5 py-3 bg-pantone-white dark:bg-pantone-darkblack border-b-2 border-pantone-white border-opacity-5">
                    <h3 className="font-black text-sm md:text-xl text-pantone-red">FIXRHYTHM</h3>
                    <h3 className="font-normal dark:font-light text-[12px] md:text-sm">Create Composition</h3>
                  </div>
                  <ComposeForm
                    host={host}
                    closeModal={closeModal}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ComposeCard