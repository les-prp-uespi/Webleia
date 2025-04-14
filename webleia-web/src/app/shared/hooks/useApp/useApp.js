import { setUser } from "app/redux/reducers/globalSlice";
import { AuthUtils } from "app/shared/utils";
import { useDispatch, useSelector } from "react-redux";

const useApp = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.global);


  const updateUser = (newUser) => {
    dispatch(setUser(newUser))
    AuthUtils.setUser(newUser)
  }

  return {
    user,
    updateUser
  };
};

export default useApp;
