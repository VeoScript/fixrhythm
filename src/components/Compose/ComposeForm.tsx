import React from 'react'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'
import FormLoader from '~/utils/FormLoader'
import { RiMeteorFill, RiMusic2Fill, RiBookOpenFill, RiAppleFill, RiSpotifyFill, RiYoutubeFill } from 'react-icons/ri'

interface TypeProps {
  host: any
  closeModal: any
}

interface FormData {
  title: string
  description: string
  composition_category: string
  content_editor: string
  spotify?: string
  applemusic?: string
  youtube?: string
}

const ComposeForm: React.FC<TypeProps> = ({ host, closeModal }) => {

  const { theme } = useTheme()

  const [changeStatus, setChangeStatus] = React.useState("")

  const defaultValues = {
    title: "",
    description: "",
    composition_category: "",
    content_editor: "",
    spotify: "",
    applemusic: "",
    youtube: ""
  }

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({ defaultValues })

  React.useEffect(() => {
    register('content_editor', { required: true })
  }, [register])

  async function onDraft(formData: FormData) {
    const userId = host.uuid
    const title = formData.title
    const description = formData.description
    const composition_category = formData.composition_category
    const content_editor = formData.content_editor
    const spotify = formData.spotify
    const applemusic = formData.applemusic
    const youtube = formData.youtube

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
        spotify,
        applemusic,
        youtube,
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
    const spotify = formData.spotify
    const applemusic = formData.applemusic
    const youtube = formData.youtube

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
        spotify,
        applemusic,
        youtube,
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
    <div className="relative flex flex-col w-full h-screen md:h-full overflow-y-auto text-white bg-gray-700 dark:bg-black bg-opacity-50 dark:bg-opacity-50">
      <div className="flex flex-col w-full h-full p-3 pb-14">
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="flex items-center w-full px-1 rounded-tl-md rounded-tr-md md:rounded-tr-none text-white bg-transparent border-t border-l border-r border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
            <div className="px-3 border-r border-pantone-black dark:border-pantone-white border-opacity-30 dark:border-opacity-30">
              {!changeStatus && (
                <RiMeteorFill className="w-6 h-6 text-white text-opacity-50" />
              )}
              {changeStatus && (
                <React.Fragment>
                  {changeStatus === 'Song' ? <RiMusic2Fill className="w-6 h-6 text-white text-opacity-50" /> : <RiBookOpenFill className="w-6 h-6 text-white text-opacity-50" />}
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
          <div className="flex items-center w-full px-1 text-white bg-transparent rounded-tr-none md:rounded-tr-md border-t border-r border-l md:border-l-0 border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
            <select
              className="w-full px-4 py-[1.2rem] text-sm text-white text-opacity-50 bg-transparent outline-none cursor-pointer"
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
        <div className="px-3 border-t border-l border-r border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
          <input
            className="w-full px-3 py-5 text-sm bg-transparent outline-none"
            type="text"
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </div>
        <div className="flex items-center w-full px-1 whitespace-pre-wrap rounded-b-md text-white bg-transparent border-t border-b border-l border-r border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
          <div
            id="content_editor"
            className="w-full h-full max-h-[15rem] overflow-y-auto p-5 text-sm bg-transparent cursor-text whitespace-pre-wrap outline-none"
            placeholder="Type your lyrics here, shift+enter for new line."
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onPaste={(e) => {
              e.preventDefault();
              var text = e.clipboardData.getData('text/plain')
              document.execCommand('insertText', false, text)
            }}
            onInput={(e: any) => setValue('content_editor', e.currentTarget.textContent, { shouldValidate: true })}
            onKeyPress={handleLineBreak}
          />
        </div>
        <div className="flex flex-col w-full py-3 space-y-2">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-bold text-[10px] md:text-sm text-white text-opacity-50 uppercase">Uploaded in</span>
            <span className="font-bold text-sm text-pantone-red">
              {(errors.spotify || errors.applemusic || errors.youtube) && 'Invalid URL'}
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full overflow-hidden rounded-md border border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
            <div className="flex w-full max-w-full md:max-w-sm px-0 md:px-3">
              <div className="flex items-center pl-3 md:pl-0 pr-3 border-r border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
                <RiSpotifyFill className={`${ errors.spotify ? 'text-pantone-red' : 'text-white text-opacity-50' } w-6 h-6`} />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Spotify Link"
                {...register("spotify", { pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g })}
              />
            </div>
            <div className="flex w-full max-w-full md:max-w-sm px-0 md:px-3 border-t border-b md:border-t-0 md:border-b-0 border-l-0 border-r-0 md:border-l md:border-r border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
              <div className="flex items-center pl-3 md:pl-0 pr-3 border-r border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
                <RiAppleFill className={`${ errors.applemusic ? 'text-pantone-red' : 'text-white text-opacity-50' } w-6 h-6`} />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Apple Music Link"
                {...register("applemusic", { pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g })}
              />
            </div>
            <div className="flex w-full max-w-full md:max-w-sm px-0 md:px-3">
              <div className="flex items-center pl-3 md:pl-0 pr-3 border-r border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
                <RiYoutubeFill className={`${ errors.youtube ? 'text-pantone-red' : 'text-white text-opacity-50' } w-6 h-6`} />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="YouTube Link"
                {...register("youtube", { pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="static md:fixed bottom-0 flex flex-row items-start justify-center w-full mt-10 px-3 py-2 bg-pantone-white dark:bg-pantone-darkblack border-t-2 border-pantone-white border-opacity-5">
        {!isSubmitting && (
          <React.Fragment>
            <button
              className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-[11px] md:text-sm rounded-l-lg bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
              type="button"
              onClick={handleSubmit(onDraft)}
            >
              Draft
            </button>
            <button
              className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-[11px] md:text-sm border-l border-pantone-white dark:border-pantone-white border-opacity-50 dark:border-opacity-10 bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
              type="button"
              onClick={handleSubmit(onPublish)}
            >
              Publish
            </button>
          </React.Fragment>
        )}
        {isSubmitting && (
          <div className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-[11px] md:text-sm text-white bg-pantone-black bg-opacity-80 dark:bg-opacity-100 rounded-l-lg border-r border-pantone-gray dark:border-pantone-white border-opacity-50 dark:border-opacity-10">
            <FormLoader
              width="20px"
              height="20px"
              color={`${ theme === 'dark' ? '#C71F2D' : '#FFFFFF' }`}
            />
          </div>
        )}
        <button
          className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-[11px] md:text-sm rounded-r-lg border-l border-pantone-white dark:border-pantone-white border-opacity-50 dark:border-opacity-10 bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
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