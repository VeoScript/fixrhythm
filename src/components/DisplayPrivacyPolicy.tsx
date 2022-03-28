/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Link from 'next/link'
import Moment from 'react-moment'
import { RiFacebookCircleFill, RiGithubFill, RiInstagramLine, RiTwitterFill } from 'react-icons/ri';

const DisplayPrivacyPolicy = () => {

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

  return (
    <div className="flex flex-col w-full h-full my-scrollbar">
      <div className="flex flex-col w-full pb-16 text-pantone-darkblack dark:text-pantone-white">
        <div className="flex flex-row items-center w-full px-5 py-4 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
          <h1 className="font-bold text-sm md:text-base text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-50">Privacy Policy</h1>
        </div>
        <div className="flex flex-col w-full p-5 space-y-5 font-light text-xs md:text-sm">
          <p className="flex w-full">
            <img src="./fixrhythm_logo.png" alt="fixrhythm_official" />
          </p>
          <p className="inline">
            This Privacy Policy was last modified on <span className="font-medium text-normal"><Moment date={ date } format="LL" /></span>.
          </p>
          <p className="inline">
            Fixrhythm by (VEOSCRIPT) operates&nbsp;
            <Link href="https://www.fixrhythm.tk" passHref={true}>
              <a className="hover:underline" target="_blank">https://www.fixrhythm.tk</a>
            </Link>.
            This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.
          </p>
          <p className="inline">
            We use your Personal Information only for providing and improving the Site. By using this Site, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>
        <div className="flex flex-row items-center w-full px-5 py-4 border-t border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
          <h1 className="font-bold text-sm md:text-base text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-50">Information Collection and Use</h1>
        </div>
        <div className="flex flex-col w-full p-5 space-y-5 font-light text-xs md:text-sm">
          <p className="inline">
            While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name ("Personal Information").
          </p>
        </div>
        <div className="flex flex-row items-center w-full px-5 py-4 border-t border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
          <h1 className="font-bold text-sm md:text-base text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-50">Developer Information</h1>
        </div>
        <div className="flex flex-col w-full p-5 space-y-2 font-light text-xs md:text-sm">
          <p className="inline">
            Fixrhythm was developed by&nbsp;
            <Link href="https://www.jeromevillaruel.ml" passHref={true}>
              <a className="hover:underline" title="Developer Official Website" target="_blank">VEOSCRIPT</a>
            </Link>.
          </p>
          <div className="flex flex-row items-center w-full space-x-1  text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-50">
            <Link href="https://www.facebook.com/veoscript" passHref={true}>
              <a target="_blank">
                <RiFacebookCircleFill className="w-6 h-6 transition ease-linear duration-200 transform hover:scale-95" />
              </a>
            </Link>
            <Link href="https://www.twitter.com/VeoScript43" passHref={true}>
              <a target="_blank">
                <RiTwitterFill className="w-6 h-6 transition ease-linear duration-200 transform hover:scale-95" />
              </a>
            </Link>
            <Link href="https://www.instagram.com/villaruel_jerome" passHref={true}>
              <a target="_blank">
                <RiInstagramLine className="w-6 h-6 transition ease-linear duration-200 transform hover:scale-95" />
              </a>
            </Link>
            <Link href="https://www.github.com/VeoScript" passHref={true}>
              <a target="_blank">
                <RiGithubFill className="w-6 h-6 transition ease-linear duration-200 transform hover:scale-95" />
              </a>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center w-full pt-5 space-x-3 font-light text-[10px] text-[#6f6f6f]">
            <span>&copy; 2021 FIXRHYTHM</span>
            <img className="w-6 h-6" src="/fixrhythm.png" alt="fixrhythm" />
            <span>by VEOSCRIPT.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayPrivacyPolicy
