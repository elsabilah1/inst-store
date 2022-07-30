/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import MDSpinner from 'react-md-spinner'
const appID = process.env.NEXT_PUBLIC_COMETCHAT_APP_ID
const region = process.env.NEXT_PUBLIC_COMETCHAT_REGION
const AUTH_KEY = process.env.NEXT_PUBLIC_COMETCHAT_AUTH_KEY
const wid = process.env.NEXT_PUBLIC_COMETCHAT_WID

declare global {
  interface Window {
    CometChatWidget: any
  }
}

const ChatWidget: React.FC = () => {
  const { data: session }: any = useSession()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (session?.role === 0) {
      setLoad(true)
      window.CometChatWidget.init({
        appID: appID,
        appRegion: region,
        authKey: AUTH_KEY,
      }).then(async () => {
        console.log('Initialization completed successfully')
        //You can now call login function.
        let uid = session.id

        window.CometChatWidget.login({
          uid: uid,
        })
          .then(() => {
            window.CometChatWidget.launch({
              widgetID: wid,
              roundedCorners: 'true',
              docked: 'true',
              height: '300px',
              width: '400px',
              defaultID: process.env.NEXT_PUBLIC_AGENT_ID,
              defaultType: 'user', //user or group
            })
            setLoad(false)
          })
          .catch(() => {
            const user = new window.CometChatWidget.CometChat.User(uid)
            user.setName(session.user.name)
            user.setAvatar(session.user.image)

            window.CometChatWidget.createOrUpdateUser(user).then(() => {
              // Proceed with user login
              window.CometChatWidget.login({
                uid: uid,
              }).then(() => {
                // Proceed with launching your Chat Widget
                window.CometChatWidget.launch({
                  widgetID: wid,
                  roundedCorners: 'true',
                  docked: 'true',
                  height: '300px',
                  width: '400px',
                  defaultID: process.env.NEXT_PUBLIC_AGENT_ID,
                  defaultType: 'user', //user or group
                })
                setLoad(false)
              })
            })
          })
      })
    }

    // return () => {
    //   window.CometChatWidget.destroy()
    // }
  }, [session?.id])

  return (
    <>
      {load && (
        <div className="fixed bottom-0 right-0 m-10">
          <MDSpinner />
        </div>
      )}
    </>
  )
}

export default ChatWidget
