/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Moment from 'react-moment'
import FormLoader from '~/utils/FormLoader'
import AutoScroll from '@brianmcallister/react-auto-scroll'
import DeleteComment from './DeleteComment'
import { useForm } from 'react-hook-form'
import { RiSendPlane2Line } from 'react-icons/ri'

interface TypeProps {
  host: any
  get_composition: any
}

interface FormData {
  comment_content: string
}

const DisplayComment: React.FC<TypeProps> = ({ host, get_composition }) => {

  const defaultValues = {
    comment_content: "",
  }

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm({ defaultValues })

  React.useEffect(() => {
    register('comment_content', { required: true })
  }, [register])

  async function onComment(formData: FormData) {
    const userId = host.uuid
    const compositionId = get_composition.uuid
    const content = formData.comment_content

    if(document.getElementById('comment_content')!.innerText.trim().length === 0 || content === '') return
    
    await fetch('/api/comments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        compositionId,
        content
      })
    })
    document.getElementById('comment_content')!.innerText = ''
    reset()
  }

  function handleKeyPress(e: any) {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(onComment)()
    }
  }

  return (
    <div className="sticky top-5 flex flex-col w-full max-w-sm rounded-2xl bg-pantone-darkblack">
      <div className="flex flex-row items-center justify-between w-full px-5 py-5">
        <h3 className="text-sm text-pantone white">Live Comments</h3>
        <h3 className="text-[10px] text-pantone-white">
          { get_composition.comments.length }&nbsp;
          {get_composition.comments.length > 1 ? 'Comments' : 'Comment'}
        </h3>
      </div>
      <AutoScroll
        showOption={false}
        scrollBehavior="auto"
        className="flex flex-col w-full h-full max-h-[23rem] overflow-y-auto"
      >
        {get_composition.comments.map((comment: any, i: number) => (
          <div className="flex flex-row items-center justify-between w-full px-5 py-5 border-t border-pantone-white border-opacity-5" key={i}>
            <div className="flex flex-col items-start space-y-5">
              <Link href={`/${comment.user.username}`}>
                <a className="flex items-start space-x-2">
                  <img
                    className="w-7 h-7 object-cover rounded-full bg-pantone-gray"
                    src={comment.user.profile ? comment.user.profile : `https://ui-avatars.com/api/?name=${comment.user.name}&background=343739&color=aaa`}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] hover:underline">{ comment.user.username }</span>
                    <span className="text-[10px] text-pantone-white text-opacity-30">{ comment.user.account_type }</span>
                  </div>
                </a>
              </Link>
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col pl-3 space-y-3">
                  <div className="flex items-start whitespace-pre-wrap text-xs space-x-1">
                    <span className="font-bold text-green-400">&bull;</span>
                    <span>{ comment.content }</span>
                  </div>
                  <div className="flex font-light text-[8px] text-pantone-white text-opacity-30">
                    <Moment date={ comment.date } fromNow />
                  </div>
                </div>
              </div>
            </div>
            {comment.user.username === host.username && (
              <DeleteComment host={host} comment={comment} />
            )}
          </div>
        ))}
      </AutoScroll>
      <div className="flex flex-row items-center w-full border-t border-pantone-white border-opacity-5">
        <form
          className="flex flex-row items-start w-full px-5 space-x-2"
          onSubmit={handleSubmit(onComment)}
        >
          <div className="flex flex-row items-end w-full py-5">
            <div
              id="comment_content"
              className={`${isSubmitting ? 'hidden' : 'block'} w-full h-full max-h-[5rem] cursor-text overflow-y-auto text-[12px] bg-transparent whitespace-pre-wrap outline-none`}
              placeholder="Type your comment here..."
              contentEditable
              spellCheck={false}
              onInput={(e: any) => setValue('comment_content', e.currentTarget.textContent, { shouldValidate: true })}
              onKeyPress={handleKeyPress}
            />
            {isSubmitting && (
              <div className="w-full h-full max-h-[5rem] cursor-text overflow-y-auto text-[12px] text-pantone-white text-opacity-40 bg-transparent whitespace-pre-wrap outline-none">
                Sending...
              </div>
            )}
            {!isSubmitting && (
              <button type="submit">
                <RiSendPlane2Line className="w-5 h-5 text-pantone-white text-opacity-50 transition ease-linear duration-200 hover:scale-95" />
              </button>
            )}
            {isSubmitting && (
              <FormLoader
                width="24px"
                height="24px"
                color="#C71F2D"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default DisplayComment