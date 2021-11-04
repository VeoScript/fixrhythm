import { prisma } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { RiMeteorFill, RiMusic2Fill, RiBookOpenFill } from 'react-icons/ri'

interface TypeProps {
  host: any
  closeModal: any
}

interface FormData {
  title: string
  description: string
  composition_status: string
  content_editor: string
}

const ComposeForm: React.FC<TypeProps> = ({ host, closeModal }) => {

  const [changeStatus, setChangeStatus] = React.useState("")

  const defaultValues = {
    title: "",
    description: "",
    composition_status: "",
    content_editor: ""
  }

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({ defaultValues })

  React.useEffect(() => {
    register('content_editor', { required: true })
  }, [register])

  async function onPublish(formData: FormData) {
    const userId = host.uuid
    const title = formData.title
    const description = formData.description
    const composition_status = formData.composition_status
    const content_editor = formData.content_editor

    await fetch('/api/compositions/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        composition_status,
        content_editor,
        userId
      })
    })

    reset()
    closeModal()
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full p-3">
        <div className="flex flex-row items-center w-full">
          <div className="flex items-center w-full px-1 rounded-tl-md text-pantone-white bg-transparent border-t border-l border-r border-pantone-white border-opacity-10">
            <div className="px-3 border-r border-pantone-white border-opacity-30">
              {!changeStatus && (
                <RiMeteorFill className="w-6 h-6 text-pantone-white text-opacity-50" />
              )}
              {changeStatus && (
                <React.Fragment>
                  {changeStatus === 'Song' ? <RiMusic2Fill className="w-6 h-6 text-pantone-white text-opacity-50" /> : <RiBookOpenFill className="w-6 h-6 text-pantone-white text-opacity-50" />}
                </React.Fragment>
              )}
            </div>
            <input
              className="w-full px-3 py-5 text-sm bg-transparent outline-none"
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
            />
          </div>
          <div className="flex items-center w-full px-1 text-pantone-white bg-transparent border-t border-r border-pantone-white border-opacity-10">
            <select
              className="w-full px-3 py-[1.2rem] text-sm text-pantone-white text-opacity-50 bg-transparent outline-none cursor-pointer"
              {...register("composition_status", { required: true })}
              onInput={(e: any) => {
                switch(e.currentTarget.value) {
                  case 'Song':
                    setChangeStatus('Song')
                    break
                  case 'Poem':
                    setChangeStatus('Poem')
                    break
                  default:
                    setChangeStatus('')
                }
              }}
            >
              <option value="" className="hidden">Composition Type</option>
              <option value="Song" className="bg-pantone-darkblack">Song</option>
              <option value="Poem" className="bg-pantone-darkblack">Poem</option>
            </select>
          </div>
        </div>
        <div className="px-3 border-t border-l border-r border-pantone-white border-opacity-10">
          <input
            className="w-full px-3 py-5 text-sm bg-transparent outline-none"
            type="text"
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </div>
        <div className="flex items-center w-full px-1 rounded-b-md text-pantone-white bg-transparent border-t border-b border-l border-r border-pantone-white border-opacity-10">
          <div
            contentEditable
            id="chatbox"
            className="w-full h-full max-h-[20rem] overflow-y-auto px-3 py-5 text-sm bg-transparent whitespace-pre-wrap outline-none"
            placeholder="Type your lyrics here..."
            onInput={(e: any) => setValue('content_editor', e.currentTarget.textContent, { shouldValidate: true })}
          />
        </div>
      </div>
      {/* {errors.title && <span></span>} */}
      <div className="flex flex-row items-center justify-center w-full px-3 py-2 bg-pantone-darkblack">
        <button
          className="flex justify-center w-full max-w-[5rem] px-3 py-2 text-sm text-pantone-white bg-pantone-gray rounded-l-lg border-r border-pantone-white border-opacity-10 transition ease-linear duration-200 hover:bg-opacity-50"
          type="button"
        >
          Draft
        </button>
        <button
          className="flex justify-center w-full max-w-[5rem] px-3 py-2 text-sm text-pantone-white bg-pantone-gray transition ease-linear duration-200 hover:bg-opacity-50"
          type="button"
          onClick={handleSubmit(onPublish)}
        >
          Publish
        </button>
        <button
          className="flex justify-center w-full max-w-[5rem] px-3 py-2 text-sm text-pantone-white bg-pantone-gray rounded-r-lg border-l border-pantone-white border-opacity-10 transition ease-linear duration-200 hover:bg-opacity-50"
          type="button"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ComposeForm