import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface INavbar {
  menu: { to: string; title: string }[]
  sidebar?: boolean
}

const Navbar: React.FC<INavbar> = ({ menu, sidebar }) => {
  const router = useRouter()
  const classes = cn(
    'px-3 text-sm cursor-pointer capitalize font-medium hover:text-secondary hover:underline hover:underline-offset-2',
    sidebar ? 'text-left' : 'ml-auto md:ml-0'
  )

  const navClasses = cn(
    sidebar
      ? 'flex flex-col space-y-4 mt-9'
      : 'flex flex-col space-y-3 md:inline md:flex-grow md:space-x-3 md:space-y-0'
  )

  return (
    <nav className={navClasses}>
      {menu.map((item) => (
        <Link href={item.to} key={item.title}>
          <button
            className={
              router.pathname === item.to
                ? `${classes} text-secondary`
                : `${classes} text-white`
            }
          >
            {item.title}
          </button>
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
