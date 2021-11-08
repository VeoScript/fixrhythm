import React from 'react'
import { useForm } from 'react-hook-form'
import FormLoader from '~/utils/FormLoader'
import { RiMeteorFill, RiMusic2Fill, RiBookOpenFill } from 'react-icons/ri'

interface TypeProps {
  host: any
  closeModal: any
}

interface FormData {
  title: string
  description: string
  composition_category: string
  content_editor: string
}

const ComposeForm: React.FC<TypeProps> = ({ host, closeModal }) => {

  const [changeStatus, setChangeStatus] = React.useState("")

  const defaultValues = {
    title: "",
    description: "",
    composition_category: "",
    content_editor: ""
  }

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm({ defaultValues })

  React.useEffect(() => {
    register('content_editor', { required: true })
  }, [register])

  async function onDraft(formData: FormData) {
    const userId = host.uuid
    const title = formData.title
    const description = formData.description
    const composition_category = formData.composition_category
    const content_editor = formData.content_editor

    if(document.getElementById('content_editor')!.innerText.trim().length === 0 || content_editor === '') return

    await fetch('/api/compositions/create/draft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        composition_category,
        content_editor,
        userId
      })
    })

    reset()
    closeModal()
  }

  async function onPublish(formData: FormData) {
    const userId = host.uuid
    const title = formData.title
    const description = formData.description
    const composition_category = formData.composition_category
    const content_editor = formData.content_editor

    if(document.getElementById('content_editor')!.innerText.trim().length === 0 || content_editor === '') return

    await fetch('/api/compositions/create/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        composition_category,
        content_editor,
        userId
      })
    })

    reset()
    closeModal()
  }

  function handleLineBreak(e: any) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
    }
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
          <div className="flex items-center w-full px-1 text-pantone-white bg-transparent rounded-tr-md border-t border-r border-pantone-white border-opacity-10">
            <select
              className="w-full px-3 py-[1.2rem] text-sm text-pantone-white text-opacity-50 bg-transparent outline-none cursor-pointer"
              {...register("composition_category", { required: true })}
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
        <div className="flex items-center w-full px-1 whitespace-pre-wrap rounded-b-md text-pantone-white bg-transparent border-t border-b border-l border-r border-pantone-white border-opacity-10">
          <div
            id="content_editor"
            className="w-full h-full max-h-[20rem] overflow-y-auto p-5 text-sm bg-transparent whitespace-pre-wrap outline-none"
            placeholder="Type your lyrics here, shift+enter for new line."
            contentEditable
            spellCheck={false}
            onInput={(e: any) => setValue('content_editor', e.currentTarget.textContent, { shouldValidate: true })}
            onKeyPress={handleLineBreak}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full px-3 py-2 bg-pantone-darkblack">
        {!isSubmitting && (
          <React.Fragment>
            <button
              className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm text-pantone-white bg-pantone-gray rounded-l-lg border-r border-pantone-white border-opacity-10 transition ease-linear duration-200 hover:bg-opacity-50"
              type="button"
              onClick={handleSubmit(onDraft)}
            >
              Draft
            </button>
            <button
              className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm text-pantone-white bg-pantone-gray transition ease-linear duration-200 hover:bg-opacity-50"
              type="button"
              onClick={handleSubmit(onPublish)}
            >
              Publish
            </button>
          </React.Fragment>
        )}
        {isSubmitting && (
          <div className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm text-pantone-white bg-pantone-gray rounded-l-lg border-r border-pantone-white border-opacity-10">
            <FormLoader
              width="20px"
              height="20px"
              color="#C71F2D"
            />
          </div>
        )}
        <button
          className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm text-pantone-white bg-pantone-gray rounded-r-lg border-l border-pantone-white border-opacity-10 transition ease-linear duration-200 hover:bg-opacity-50"
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