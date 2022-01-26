/* eslint-disable @next/next/no-img-element */
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { RiCameraFill } from 'react-icons/ri'

interface TypeProps {
  host: any
  get_profile: any
}

const UploadProfilePhoto: React.FC<TypeProps> = ({ host, get_profile }) => {
  
  const [previewProfile, setPreviewProfile] = React.useState<any>('')
  const [imageUploaded, setImageUploaded] = React.useState<any>('')

  const {handleSubmit, formState: { isSubmitting }} = useForm()

  async function handleProfileChange(e: any) {
    try {
      // get the selected image from local machine
      setImageUploaded(e.target.files[0])

      var file    = e.target.files[0]
      var reader  = new FileReader()
      var allowedExtensions = /(\.jpg|\.jpeg|\.jfif|\.png)$/i

      // check if the selected file is not an image
      if(e.target.value !== '' && !allowedExtensions.exec(e.target.value)) {
        e.target.value = ''
        setImageUploaded("")
        toast("Please select jpg, jpeg or png only!", {
          style: {
            borderRadius: '10px',
            border: '2px solid #C71F2D',
            padding: '10px',
            fontSize: '14px',
            background: '#1D1F21',
            color: '#FFFFFF'
          }
        })
        return
      }

      // code for previewing selected image
      reader.onloadend = function () {
        setPreviewProfile(reader.result)
      }

      if(file) {
        reader.readAsDataURL(file)
      } else {
        setPreviewProfile("")
      }

      // check if the profile picture is larger than 2MB
      if(e.target.files[0].size > 2097152) {
        setImageUploaded("")
        toast("Profile photo size exceeds 2 MB. Select another one.", {
          style: {
            borderRadius: '10px',
            border: '2px solid #C71F2D',
            padding: '10px',
            fontSize: '14px',
            background: '#1D1F21',
            color: '#FFFFFF'
          }
        })
        return
      }
    } catch(error) {
      console.error(error)
    }
  }

  async function uploadProfilePhoto(e: any) {
    if(!imageUploaded) return

    try {
      const formData = new FormData()
      formData.append('image', imageUploaded)

      // if there is existing profile photo it will be delete to database to update a something new
      if(get_profile.profile[0]) {
        await fetch('/api/account-settings/upload_profile/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        await fetch('/api/account-settings/upload_profile/create', {
          method: 'POST',
          body: formData
        })
      } else {
        await fetch('/api/account-settings/upload_profile/create', {
          method: 'POST',
          body: formData
        })
      }

      setImageUploaded("")
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <React.Fragment>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      {host.username === get_profile.username && (
        <form onSubmit={handleSubmit(uploadProfilePhoto)} className="absolute bottom-3 right-3">
          <label htmlFor="upload_profile">
            <div title="Change Profile" className="cursor-pointer p-2 rounded-full bg-pantone-gray dark:bg-pantone-white bg-opacity-80 dark:bg-opacity-80 transition ease-linear duration-200 transform hover:scale-95">
              <RiCameraFill className="w-5 h-5 text-pantone-white dark:text-pantone-darkblack" />
            </div>
          </label>
          <input
            type="file"
            id="upload_profile"
            className="hidden"
            onChange={handleProfileChange}
            accept=".jpg, .png, .jpeg, .jfif"
          />
          <div className="flex w-full max-w-full">
            {imageUploaded && (
              <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
                {!isSubmitting && (
                  <button 
                    className={`${imageUploaded ? 'z-10 block fixed inset-0 w-full h-full cursor-default focus:outline-none bg-black bg-opacity-50' : 'hidden'}`}
                    type="reset"
                    onClick={() => setImageUploaded("")} 
                  />
                )}
                {isSubmitting && (
                  <button 
                    className={`${imageUploaded ? 'z-10 block fixed inset-0 w-full h-full cursor-default focus:outline-none bg-black bg-opacity-50' : 'hidden'}`}
                    disabled
                  />
                )}
                <div className="flex flex-col items-center w-full max-w-md z-20 overflow-hidden text-pantone-darkblack dark:text-pantone-white bg-pantone-white dark:bg-pantone-black bg-opacity-10 dark:bg-opacity-10 backdrop-blur-sm shadow-xl rounded-xl border-2 border-pantone-white border-opacity-10">
                  <div className="flex flex-row items-center justify-between w-full px-5 py-3 bg-pantone-white dark:bg-pantone-darkblack">
                    <h3 className="font-black text-xl text-pantone-red">FIXRHYTHM</h3>
                    <h3 className="font-normal dark:font-light text-sm">Change Profile</h3>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col items-center w-full p-3 space-y-2">
                      <img
                        className="flex w-full max-w-[11rem] h-[11rem] object-cover rounded-full bg-pantone-white dark:bg-[#1D1F21]"
                        src={previewProfile}
                        alt=""
                      />
                      <p className="font-normal dark:font-light text-[11px] text-pantone-white">This will be the actual layout of your profile photo.</p>
                    </div>
                    <div className="flex flex-row items-center justify-center w-full px-3 py-2 bg-pantone-white dark:bg-pantone-darkblack">
                      {!isSubmitting && (
                        <button
                          className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm rounded-l-lg bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
                          type="submit"
                        >
                          Upload
                        </button>
                      )}
                      {isSubmitting && (
                        <div className="flex justify-center w-full max-w-[8rem] px-3 py-2 cursor-wait outline-none text-sm rounded-lg text-pantone-white bg-pantone-black bg-opacity-80">
                          Uploading...
                        </div>
                      )}
                      {!isSubmitting && (
                        <button
                          className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm rounded-r-lg border-l border-pantone-white border-opacity-10 bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
                          type="button"
                          onClick={() => setImageUploaded("")}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      )}
    </React.Fragment>
  )
}

export default UploadProfilePhoto
