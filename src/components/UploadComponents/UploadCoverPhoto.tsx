/* eslint-disable @next/next/no-img-element */
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { RiCameraFill } from 'react-icons/ri'

interface TypeProps {
  host: any
  get_profile: any
}

const UploadCoverPhoto: React.FC<TypeProps> = ({ host, get_profile }) => {
  
  const [previewCoverPhoto, setPreviewCoverPhoto] = React.useState<any>('')
  const [imageUploaded, setImageUploaded] = React.useState<any>('')

  const {handleSubmit, formState: { isSubmitting }} = useForm()

  async function handleCoverPhotoChange(e: any) {
    try {
      // check if the file is image or not
      if(e.target.files[0].accept) {
        setImageUploaded("")
        alert("Profile photo size exceeds 2 MB. Select another one.")
        return
      }

      // get the selected image from local machine
      setImageUploaded(e.target.files[0])

      var file    = e.target.files[0]
      var reader  = new FileReader()
      var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i

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
        setPreviewCoverPhoto(reader.result)
      }

      if (file) {
        reader.readAsDataURL(file)
      } else {
        setPreviewCoverPhoto("")
      }

      // check if the profile picture is larger than 2MB
      if(e.target.files[0].size > 2097152) {
        setImageUploaded("")
        toast("Cover photo size exceeds 2 MB. Select another one.", {
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
    } catch (error) {
      console.error(error)
    }
  }

  async function uploadProfilePhoto(e: any) {
    if(!imageUploaded) return

    try {
      const formData = new FormData()
      formData.append('image', imageUploaded)

      // if there is existing cover photo it will be delete to database to update a something new
      if(get_profile.profile[0]) {
        await fetch('/api/account-settings/upload_cover/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        await fetch('/api/account-settings/upload_cover/create', {
          method: 'POST',
          body: formData
        })
      } else {
        await fetch('/api/account-settings/upload_cover/create', {
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
      <div className="flex z-10 w-full">
        {host.username === get_profile.username && (
          <form onSubmit={handleSubmit(uploadProfilePhoto)} className="absolute bottom-3 right-3">
            <label htmlFor="upload_coverphoto">
              <div title="Change Cover Photo" className="cursor-pointer p-2 rounded-full bg-pantone-white bg-opacity-80 transition ease-linear duration-200 transform hover:scale-95">
                <RiCameraFill className="w-5 h-5 text-pantone-darkblack" />
              </div>
            </label>
            <input
              type="file"
              id="upload_coverphoto"
              className="hidden"
              onChange={handleCoverPhotoChange}
              accept=".jpg, .png, .jpeg"
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
                  <div className="flex flex-col items-center w-full max-w-5xl z-20 overflow-hidden text-pantone-white bg-pantone-darkblack bg-opacity-10 backdrop-blur-sm shadow-xl rounded-xl border-2 border-pantone-white border-opacity-10">
                    <div className="flex flex-row items-center justify-between w-full px-5 py-3 bg-pantone-darkblack">
                      <h3 className="font-black text-xl text-pantone-red">FIXRHYTHM</h3>
                      <h3 className="font-light text-sm">Change Cover Photo</h3>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col items-center w-full p-3 space-y-2">
                        <img
                          className="flex w-full h-full max-h-[18rem] object-cover bg-center bg-cover bg-no-repeat bg-[#1D1F21]"
                          src={previewCoverPhoto}
                          alt=""
                        />
                        <p className="font-light text-[11px] text-pantone white">This will be the actual layout of your cover photo.</p>
                      </div>
                      <div className="flex flex-row items-center justify-center w-full px-3 py-2 bg-pantone-darkblack">
                        {!isSubmitting && (
                          <button
                            className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm text-pantone-white bg-pantone-gray rounded-l-lg transition ease-linear duration-200 hover:bg-opacity-50"
                            type="submit"
                          >
                            Upload
                          </button>
                        )}
                        {isSubmitting && (
                          <div className="flex justify-center w-full max-w-[8rem] px-3 py-2 cursor-wait outline-none text-sm text-pantone-white bg-pantone-gray rounded-lg">
                            Uploading...
                          </div>
                        )}
                        {!isSubmitting && (
                          <button
                            className="flex justify-center w-full max-w-[5rem] px-3 py-2 outline-none text-sm text-pantone-white bg-pantone-gray rounded-r-lg border-l border-pantone-white border-opacity-10 transition ease-linear duration-200 hover:bg-opacity-50"
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
      </div>
    </React.Fragment>
  )
}

export default UploadCoverPhoto
