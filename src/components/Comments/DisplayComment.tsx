/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Moment from 'react-moment'
import FormLoader from '~/utils/FormLoader'
import AutoScroll from '@brianmcallister/react-auto-scroll'
import DeleteComment from './DeleteComment'
import { useForm } from 'react-hook-form'
import { useTheme } from 'next-themes'
import { RiSendPlane2Line } from 'react-icons/ri'

interface TypeProps {
  host: any
  get_composition: any
}

interface FormData {
  comment_content: string
}

const DisplayComment: React.FC<TypeProps> = ({ host, get_composition }) => {

  const { theme } = useTheme()

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
    sendOnNotification(formData)
  }

  // send this request to notification as type of Comments Notification
  async function sendOnNotification(formData: FormData) {
    const fromUserId = host.uuid
    const toUserId = get_composition.user.uuid
    const compositionId = get_composition.uuid
    const content = formData.comment_content
    const notification_type = "Comments"
    const notification_message = `commented: ${ content } on your composition`

    // if the user commented on her own post, function will be return
    //(para di agad mapuno yung database ko eh, yung notification is para nalang sa mga other users na nagcomment sa post mo)
    if(host.uuid === get_composition.user.uuid) return

    await fetch('/api/notifications/likes_and_comments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        notification_type,
        notification_message,
        compositionId,
        fromUserId,
        toUserId
      })
    })
  }

  function handleKeyPress(e: any) {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(onComment)()
    }
  }

  return (
    <div className="sticky top-5 flex flex-col w-full max-w-full md:max-w-sm rounded-none md:rounded-2xl bg-pantone-gray dark:bg-pantone-darkblack bg-opacity-5 dark:bg-opacity-100 md:border-0 border-t border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-5">
      <div className="flex flex-row items-center justify-between w-full px-5 py-5">
        <h3 className="text-xs md:text-sm text-pantone-black dark:text-pantone-white">Live Comments</h3>
        <h3 className="text-[10px] text-pantone-black dark:text-pantone-white">
          { get_composition.comments.length }&nbsp;
          {get_composition.comments.length > 1 ? 'Comments' : 'Comment'}
        </h3>
      </div>
      <AutoScroll
        showOption={false}
        scrollBehavior="auto"
        className="flex flex-col w-full h-full max-h-[23rem] overflow-y-scroll my-scrollbar"
      >
        {get_composition.comments.map((comment: any, i: number) => (
          <div className="flex flex-row items-center justify-between w-full px-5 py-5 border-t border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-5" key={i}>
            <div className="flex flex-col items-start space-y-5">
              <Link href={`/${comment.user.username}`}>
                <a className="flex items-start space-x-2">
                  <img
                    className="w-7 h-7 object-cover rounded-full bg-[#CBD0E2] dark:bg-pantone-gray"
                    src={`${ comment.user.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${comment.user.profile[0].version}/${comment.user.profile[0].publicId}.${comment.user.profile[0].format}` : `https://ui-avatars.com/api/?name=${comment.user.name}&background=${theme === 'dark' ? '2B2F31' : 'CBD0E2'}&color=${theme === 'dark' ? 'FF3C3C' : '333333'}` }`}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] hover:underline text-pantone-black dark:text-pantone-white">{ comment.user.username }</span>
                    <span className="text-[10px] text-pantone-black dark:text-pantone-white text-opacity-90 dark:text-opacity-30">{ comment.user.account_type }</span>
                  </div>
                </a>
              </Link>
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col pl-3 space-y-3">
                  <div className="flex items-start whitespace-pre-wrap space-x-1 text-xs text-pantone-black dark:text-pantone-white text-opacity-90 dark:text-opacity-80">
                    <span className="font-bold text-[#80a700] dark:text-[#BDF705]">&bull;</span>
                    <span>{ comment.content }</span>
                  </div>
                  <div className="flex font-light text-[8px] text-pantone-black dark:text-pantone-white text-opacity-90 dark:text-opacity-30">
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
      <div className="flex flex-row items-center w-full border-t border-pantone-gray dark:border-pantone-white border-opacity-5 dark:border-opacity-5">
        <form
          className="flex flex-row items-start w-full px-5 space-x-2"
          onSubmit={handleSubmit(onComment)}
        >
          <div className="flex flex-row items-end w-full py-5">
            <div
              id="comment_content"
              className={`${isSubmitting ? 'hidden' : 'block'} w-full h-full max-h-[5rem] cursor-text overflow-y-scroll my-scrollbar text-[11px] md:text-[12px] bg-transparent whitespace-pre-wrap outline-none text-pantone-gray dark:text-pantone-white`}
              placeholder="Type your comment here..."
              contentEditable
              spellCheck={false}
              onInput={(e: any) => setValue('comment_content', e.currentTarget.textContent, { shouldValidate: true })}
              onKeyPress={handleKeyPress}
            />
            {isSubmitting && (
              <div className="w-full h-full cursor-wait text-[11px] md:text-[12px] text-pantone-gray dark:text-pantone-white text-opacity-50 dark:text-opacity-40 bg-transparent whitespace-pre-wrap outline-none">
                Sending...
              </div>
            )}
            {!isSubmitting && (
              <button title="Send Comment" type="submit">
                <RiSendPlane2Line className="w-5 h-5 text-pantone-gray dark:text-pantone-white text-opacity-50 dark:text-opacity-50 transition ease-linear duration-200 hover:scale-95" />
              </button>
            )}
            {isSubmitting && (
              <FormLoader
                width="20px"
                height="20px"
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