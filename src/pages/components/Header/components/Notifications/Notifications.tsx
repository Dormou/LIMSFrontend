import { useState } from 'react'
import styles from './Notifications.module.scss'

import notificationIcon from '../../../../../source/images/icons/notification-icon.svg'
import { useGetNotificationsQuery } from '../../../../../connect/authApi/accountApi'
import { Dropdown } from '../../../Dropdown/Dropdown'

interface propsNotifications {
    userid: string
}

export const Notifications = (props: propsNotifications) => {
    const {isLoading, data} = useGetNotificationsQuery(props.userid)

    const [open, setOpen] = useState(false)

    return (
        
        <div className={styles.main}>
            <div className={styles.count}>{data?.notifications.length}</div>
            <div onClick={() => setOpen(!open)} className={styles.notifications}>
                <img src={notificationIcon} alt='notificationIcon'/>
            </div>
            {open && 
                <>
                    {!isLoading && data && 
                        <Dropdown
                            items={data.notifications.map(i => ({
                                title: i.title,
                                body: i.text
                            }))}
                        />               
                    }
                </>
            }
        </div>
    )
}