import {Logo,LogoutBtn,Container} from "../index"
import {Link, useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"
export default function Header(){
    const authStatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate();
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]
    return(
      <header className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">

  <Container>
    <nav className="flex items-center">
      <div className="mr-4">
        <Link to="/">
          <Logo width="70px" />
        </Link>
      </div>
      <ul className="flex ml-auto space-x-4">
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className="px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 hover:scale-105"
              >
                <span className="font-semibold text-white tracking-wide uppercase shadow-md hover:shadow-lg">
                  {item.name}
                </span>
              </button>
            </li>
          ) : null
        )}
        {authStatus && <LogoutBtn />}
      </ul>
    </nav>
  </Container>
</header>

    )
}