import { AuthUtils } from 'app/shared/utils'
import { redirect } from 'react-router-dom'

const authAdminMiddleware = async () => {
    const user = AuthUtils.getUser()
    const isUserLogged = !!user
    const isUserAdmin = user?.perfil + '' === "1"

    if (!isUserLogged) {
        return redirect("/auth")
    }

    if (!isUserAdmin) {
        return redirect("/")
    }

    return null
}

export default authAdminMiddleware