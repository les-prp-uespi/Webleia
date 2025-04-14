import { redirect } from 'react-router-dom'
import { AuthUtils } from 'app/shared/utils';

const PublicMiddleware = async ({ request }) => {
    const url = request.url
    const user = AuthUtils.getUser()
    const path = url.split("/").splice(3).join("/")
    const isUserLogged = !!user
    const isUserAdmin = user?.perfil === "1"

    if (isUserLogged) {
        if (isUserAdmin) return redirect("/admin")
        return redirect("/")
    }

    if (path === "auth") {
        return redirect("/auth/login")
    }

    if (path)

        return null
}

export default PublicMiddleware