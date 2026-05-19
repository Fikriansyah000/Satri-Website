import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
      <Link to="/" className="hover:text-primary transition-colors">
        Beranda
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span className="mx-2 material-symbols-outlined !text-[16px]">chevron_right</span>
          {item.href ? (
            <Link to={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumbs
