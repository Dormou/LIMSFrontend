export const getAccessToken = () => {
    const data = localStorage.getItem(`lims.user.token`)

    if (data) return data
    
    return null
};