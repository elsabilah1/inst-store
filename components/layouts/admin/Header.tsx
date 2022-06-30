import { Button, Profile } from '@/components/utility'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-sm transition-all">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-3">
        <Button variant="primary">Register Supplier</Button>
        <Profile />
      </div>
    </header>
  )
}

export default Header
