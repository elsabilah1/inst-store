/* eslint-disable no-unused-vars */
import AdminLayout from '@/components/layouts/admin/Layout'
import { NextPageWithLayout } from 'pages/page'
import { useEffect, useState } from 'react'
import MDSpinner from 'react-md-spinner'
const agentUID = process.env.NEXT_PUBLIC_AGENT_ID
const appID = process.env.NEXT_PUBLIC_COMETCHAT_APP_ID
const region = process.env.NEXT_PUBLIC_COMETCHAT_REGION
const AUTH_KEY = process.env.NEXT_PUBLIC_COMETCHAT_AUTH_KEY
const wid = process.env.NEXT_PUBLIC_COMETCHAT_WID

declare global {
  interface Window {
    CometChatWidget: any
  }
}

const ChatAdmin: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    window.CometChatWidget.init({
      appID: appID,
      appRegion: region,
      authKey: AUTH_KEY,
    }).then(
      () => {
        console.log('Initialization completed successfully')
        //You can now call login function.
        window.CometChatWidget.login({
          uid: agentUID,
        }).then(
          () => {
            window.CometChatWidget.launch({
              widgetID: wid,
              target: '#cometchat',
              roundedCorners: 'false',
              height: '100%',
              width: '100%',
              defaultID: '', //default UID (user) or GUID (group) to show,
              defaultType: 'user', //user or group
            })
            setLoading(false)
          },
          (error: any) => {
            console.log('User login failed with error:', error)
            //Check the reason for error and take appropriate action.
          }
        )
      },
      (error: any) => {
        console.log('Initialization failed with error:', error)
        //Check the reason for error and take appropriate action.
      }
    )
  }, [])

  if (loading) {
    return (
      <div className="grid h-full w-full place-items-center">
        <MDSpinner />
      </div>
    )
  }

  return <div id="cometchat" className="h-full" />
}

export default ChatAdmin

ChatAdmin.getLayout = (page) => {
  return (
    <AdminLayout pageTitle="Chats" hideTitle noPadding>
      {page}
    </AdminLayout>
  )
}
