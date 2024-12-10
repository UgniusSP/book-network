import {useAuth} from "../contexts/AuthContext";

export const AdminPage: React.FC = () => {
    const {username} = useAuth();
    return (
      <div>{username}</div>
    )
}

